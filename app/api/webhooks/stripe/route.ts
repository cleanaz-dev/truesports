import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import {
  createOrder,
  type CustomCatOrder,
} from "@/lib/customcat";

/**
 * Stripe webhook handler — fires when a customer completes checkout.
 * This routes the order to CustomCat for fulfillment.
 *
 * Setup:
 * 1. Add STRIPE_WEBHOOK_SECRET to .env.local
 * 2. Add CUSTOMCAT_API_KEY to .env.local
 * 3. In Stripe Dashboard → Developers → Webhooks → add endpoint:
 *    https://yourdomain.com/api/stripe/webhook
 * 4. Listen for: checkout.session.completed
 *
 * Test locally with:
 *   stripe listen --forward-to localhost:3000/api/stripe/webhook
 */

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil" as Stripe.LatestApiVersion,
});

/**
 * Map your Stripe price IDs to CustomCat product info.
 * You'll need to fill in catalog_sku values from the /catalog API endpoint.
 *
 * The key is your Stripe price ID (price_xxx).
 * The value tells the handler which CustomCat product + design to use.
 */
const STRIPE_TO_CUSTOMCAT_MAP: Record<
  string,
  {
    styleNumber: string;    // e.g. "G500"
    designUrl: string;      // publicly downloadable .png or .jpg
    designUrlBack?: string; // optional, +$5 USD
  }
> = {
  // Example — replace with your actual Stripe price IDs
  // "price_abc123": {
  //   styleNumber: "G500",
  //   designUrl: "https://your-cdn.com/designs/front-logo.png",
  // },
};

/**
 * Map CustomCat style numbers to catalog_sku values per color/size variant.
 * Fill these in by querying the /catalog endpoint or CustomCat dashboard.
 *
 * Key format: `${styleNumber}-${color}-${size}`
 */
const CATALOG_SKU_MAP: Record<string, string> = {
  // Example:
  // "G500-Black-M": "48146",
  // "G500-Black-L": "48147",
  // "G500-White-M": "48150",
};

function getCatalogSku(
  styleNumber: string,
  color: string,
  size: string,
): string | null {
  const key = `${styleNumber}-${color}-${size}`;
  return CATALOG_SKU_MAP[key] ?? null;
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 },
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    console.error("[Stripe Webhook] Signature verification failed:", err);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 },
    );
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true, ignored: event.type });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  // Extract shipping details from the Stripe session
  const shipping = session.collected_information?.shipping_details;
  const customerEmail = session.customer_details?.email;

  if (!shipping?.address || !customerEmail) {
    console.error("[Stripe Webhook] Missing shipping address or email", {
      sessionId: session.id,
    });
    return NextResponse.json(
      { error: "Missing shipping details" },
      { status: 400 },
    );
  }

  // Fetch line items from the session
  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
    limit: 100,
  });

  // Build CustomCat order items from Stripe line items
  const orderItems: CustomCatOrder["items"] = [];

 for (const item of lineItems.data) {
  if (!item.price) {
    console.warn(`[Stripe Webhook] Line item has no price:`, item.id);
    continue;
  }
  const mapping = STRIPE_TO_CUSTOMCAT_MAP[item.price.id];

    if (!mapping) {
      console.warn(
        `[Stripe Webhook] No CustomCat mapping for price ID: ${item.price.id}`,
      );
      continue;
    }

    // Extract color and size from line item metadata or product attributes
    // Adjust this based on how you set up your Stripe products
    const color = (item.metadata?.color ?? "Black") as string;
    const size = (item.metadata?.size ?? "M") as string;

    const catalogSku = getCatalogSku(mapping.styleNumber, color, size);

    if (!catalogSku) {
      console.error(
        `[Stripe Webhook] No catalog_sku for ${mapping.styleNumber}-${color}-${size}`,
      );
      continue;
    }

    orderItems.push({
      catalog_sku: catalogSku,
      design_url: mapping.designUrl,
      design_url_back: mapping.designUrlBack,
      quantity: item.quantity ?? 1,
    });
  }

  if (orderItems.length === 0) {
    console.error("[Stripe Webhook] No valid CustomCat items in order", {
      sessionId: session.id,
    });
    return NextResponse.json(
      { error: "No fulfillable items" },
      { status: 400 },
    );
  }

  // Build and submit the CustomCat order
  const customcatOrder: CustomCatOrder = {
    shipping_first_name: shipping.name?.split(" ")[0] ?? session.customer_details?.name?.split(" ")[0] ?? "",
    shipping_last_name: shipping.name?.split(" ").slice(1).join(" ") ?? session.customer_details?.name?.split(" ").slice(1).join(" ") ?? "",
    shipping_address1: shipping.address.line1 ?? "",
    shipping_address2: shipping.address.line2 ?? "",
    shipping_city: shipping.address.city ?? "",
    shipping_state: shipping.address.state ?? "",
    shipping_zip: shipping.address.postal_code ?? "",
    shipping_country: shipping.address.country ?? "US",
    shipping_email: customerEmail,
    shipping_phone: session.customer_details?.phone ?? "",
    shipping_method: "Economy",
    items: orderItems,
    // Start in sandbox mode — change to "0" or remove when ready to go live
    sandbox: process.env.NODE_ENV === "production" ? "0" : "1",
  };

  try {
    const result = await createOrder(customcatOrder);
    console.log("[Stripe Webhook] CustomCat order created:", result);

    // TODO: Save the CustomCat order_id to your database
    // linked to the Stripe session.id for tracking

    return NextResponse.json({
      success: true,
      customcatOrderId: result.order_id,
      stripeSessionId: session.id,
    });
  } catch (err) {
    console.error("[Stripe Webhook] Failed to create CustomCat order:", err);

    // TODO: Save failed order to your database for retry
    // You don't want to lose a paid order if CustomCat is temporarily down

    return NextResponse.json(
      { error: "Failed to submit order to CustomCat", stripeSessionId: session.id },
      { status: 500 },
    );
  }
}