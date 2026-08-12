import {  NextResponse } from "next/server";
import { customcatWebhookPayloadSchema } from "@/lib/customcat";

/**
 * CustomCat webhook handler — receives updates from CustomCat
 * when order status changes (e.g. shipped, error, etc).
 *
 * Setup:
 * 1. In your CustomCat dashboard, register this URL as a webhook:
 *    https://yourdomain.com/api/customcat/webhook
 * 2. CustomCat will POST to this endpoint when events occur.
 */

export async function POST(req: Request) {
  const rawBody = await req.text();

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const result = customcatWebhookPayloadSchema.safeParse(payload);

  if (!result.success) {
    console.error("[CustomCat Webhook] Invalid payload:", result.error.format());
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { event, order_id, status, tracking_number } = result.data;

  console.log(`[CustomCat Webhook] Event: ${event} | Order: ${order_id}`);

  switch (event) {
    case "order.shipped":
      // TODO: Update your database — mark order as shipped
      // TODO: Send shipping confirmation email to customer with tracking_number
      console.log(`Order ${order_id} shipped. Tracking: ${tracking_number}`);
      break;

    case "order.error":
      // TODO: Alert yourself — order failed in production
      // TODO: Email customer with an update or retry the order
      console.error(`Order ${order_id} had an error. Status: ${status}`);
      break;

    default:
      console.log(`Unhandled CustomCat event: ${event}`);
  }

  // Always return 200 so CustomCat doesn't retry
  return NextResponse.json({ received: true });
}