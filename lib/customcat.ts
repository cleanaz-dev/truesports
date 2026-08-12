import { z } from "zod";

/**
 * CustomCat API Client for Next.js + Stripe integration
 *
 * Docs: https://help.customcat.com/getting-started-with-customcat-api
 * API reference: https://customcat-beta.mylocker.net/api/v1/
 *
 * Setup:
 * 1. Create an account at app.customcat.com
 * 2. Connect Store → Create API Order → enter store name & URL
 * 3. Settings > Store > API → copy your read-write API key
 * 4. Add CUSTOMCAT_API_KEY to your .env.local
 */

// ---------------------------------------------------------------------------
// Environment
// ---------------------------------------------------------------------------

const API_BASE = "https://customcat-beta.mylocker.net/api/v1";
const API_KEY = process.env.CUSTOMCAT_API_KEY;

if (!API_KEY && process.env.NODE_ENV === "production") {
  console.warn("[CustomCat] CUSTOMCAT_API_KEY is not set");
}

// ---------------------------------------------------------------------------
// Zod Schemas
// ---------------------------------------------------------------------------

export const customcatAddressSchema = z.object({
  shipping_first_name: z.string().min(1),
  shipping_last_name: z.string().min(1),
  shipping_address1: z.string().min(1),
  shipping_address2: z.string().optional().default(""),
  shipping_city: z.string().min(1),
  shipping_state: z.string().min(1), // 2-letter province/state code, e.g. "ON"
  shipping_zip: z.string().min(1),
  shipping_country: z.string().min(2), // "CA", "US", etc.
  shipping_email: z.string().email(),
  shipping_phone: z.string().optional().default(""),
});

export const customcatOrderItemSchema = z.object({
  catalog_sku: z.string().min(1), // e.g. "48146" — from /catalog endpoint
  design_url: z.string().url(), // publicly downloadable .png or .jpg
  design_url_back: z.string().url().optional(), // +$5 USD for second print location
  quantity: z.number().int().min(1).default(1),
});

export const customcatOrderSchema = customcatAddressSchema.extend({
  items: z.array(customcatOrderItemSchema).min(1),
  shipping_method: z
    .enum(["Economy", "Expedited"])
    .default("Economy"),
  sandbox: z.union([z.literal("0"), z.literal("1")]).optional(), // "1" = test mode
  api_key: z.string().optional(), // falls back to env var if omitted
  // Optional: for prepaid shipping labels (requires CustomCat approval)
  shipping_label: z
    .object({
      carrier: z.literal("USPS"),
      label_url: z.string().url(),
      tracking_number: z.string().optional(),
    })
    .optional(),
});

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type CustomCatAddress = z.infer<typeof customcatAddressSchema>;
export type CustomCatOrderItem = z.infer<typeof customcatOrderItemSchema>;
export type CustomCatOrder = z.infer<typeof customcatOrderSchema>;

// ---------------------------------------------------------------------------
// Product Catalog (from your CustomCat pricing CSV)
// catalog_sku values must be filled in from the /catalog API endpoint.
// The style # and brand are here so you can match them when you query the API.
// ---------------------------------------------------------------------------

export interface CustomCatProduct {
  styleNumber: string;
  productName: string;
  brand: string;
  category: string;
  shippingClass: string;
  proCostUSD: number;
  liteCostUSD: number;
  // Size upcharges (USD, same on both plans)
  sizeUpcharges: Record<string, number>;
  // Fill these in after querying the /catalog endpoint
  // Each variant is a unique color + size combo with its own catalog_sku
  catalogSkus?: Record<string, string>; // key: `${color}-${size}` → catalog_sku
}

const SIZE_UPCHARGES = {
  "2XL": 2.0,
  "3XL": 3.0,
  "4XL": 4.0,
  "5XL": 5.0,
  "6XL": 6.0,
} as const;

const SECOND_PRINT_LOCATION = 5.0; // USD

// Top t-shirts from your pricing CSV — cheapest first
export const TSHIRT_CATALOG: CustomCatProduct[] = [
  {
    styleNumber: "G500",
    productName: "Unisex 5.3 oz T-Shirt",
    brand: "Gildan",
    category: "T-Shirts",
    shippingClass: "Lightweight",
    proCostUSD: 6.9,
    liteCostUSD: 9.58,
    sizeUpcharges: SIZE_UPCHARGES,
  },
  {
    styleNumber: "G500L",
    productName: "Ladies' 5.3 oz T-Shirt",
    brand: "Gildan",
    category: "T-Shirts",
    shippingClass: "Lightweight",
    proCostUSD: 8.24,
    liteCostUSD: 10.99,
    sizeUpcharges: SIZE_UPCHARGES,
  },
  {
    styleNumber: "3001C",
    productName: "Unisex Jersey Short-Sleeve T-Shirt",
    brand: "Bella + Canvas",
    category: "T-Shirts",
    shippingClass: "Lightweight",
    proCostUSD: 8.67,
    liteCostUSD: 11.47,
    sizeUpcharges: SIZE_UPCHARGES,
  },
  {
    styleNumber: "B6400",
    productName: "Ladies' Relaxed Jersey Tee",
    brand: "Bella + Canvas",
    category: "T-Shirts",
    shippingClass: "Lightweight",
    proCostUSD: 9.5,
    liteCostUSD: 12.44,
    sizeUpcharges: SIZE_UPCHARGES,
  },
  {
    styleNumber: "6004",
    productName: "Ladies' Favorite T-Shirt",
    brand: "Bella + Canvas",
    category: "T-Shirts",
    shippingClass: "Lightweight",
    proCostUSD: 9.5,
    liteCostUSD: 12.44,
    sizeUpcharges: SIZE_UPCHARGES,
  },
  {
    styleNumber: "G500B",
    productName: "Youth 5.3 oz T-Shirt",
    brand: "Gildan",
    category: "T-Shirts",
    shippingClass: "Lightweight",
    proCostUSD: 10.42,
    liteCostUSD: 13.02,
    sizeUpcharges: SIZE_UPCHARGES,
  },
  {
    styleNumber: "3322",
    productName: "Infant Jersey T-Shirt",
    brand: "Rabbit Skins",
    category: "T-Shirts",
    shippingClass: "Lightweight",
    proCostUSD: 11.03,
    liteCostUSD: 13.79,
    sizeUpcharges: SIZE_UPCHARGES,
  },
  {
    styleNumber: "YST350",
    productName: "Youth Moisture-Wicking Tee",
    brand: "Sport-Tek",
    category: "T-Shirts",
    shippingClass: "Lightweight",
    proCostUSD: 11.33,
    liteCostUSD: 14.16,
    sizeUpcharges: SIZE_UPCHARGES,
  },
  {
    styleNumber: "C1717",
    productName: "Heavyweight Garment-Dyed T-Shirt",
    brand: "Comfort Colors",
    category: "T-Shirts",
    shippingClass: "Lightweight",
    proCostUSD: 11.51,
    liteCostUSD: 14.39,
    sizeUpcharges: SIZE_UPCHARGES,
  },
  {
    styleNumber: "ST350",
    productName: "Sport-Tek Mens Competitor Tee",
    brand: "Sport-Tek",
    category: "T-Shirts",
    shippingClass: "Lightweight",
    proCostUSD: 11.65,
    liteCostUSD: 14.56,
    sizeUpcharges: SIZE_UPCHARGES,
  },
];

// Full catalog from your CSV — all product categories
export const FULL_CATALOG: CustomCatProduct[] = [
  // T-Shirts
  ...TSHIRT_CATALOG,
  // Tank Tops
  { styleNumber: "G520", productName: "Unisex 5.3 oz Cotton Tank Top", brand: "Gildan", category: "Tank Tops", shippingClass: "Lightweight", proCostUSD: 11.33, liteCostUSD: 14.16, sizeUpcharges: SIZE_UPCHARGES },
  { styleNumber: "3480", productName: "Unisex Jersey Tank", brand: "Bella + Canvas", category: "Tank Tops", shippingClass: "Lightweight", proCostUSD: 12.59, liteCostUSD: 15.74, sizeUpcharges: SIZE_UPCHARGES },
  { styleNumber: "B8800", productName: "Ladies' Flowy Racerback Tank", brand: "Bella + Canvas", category: "Tank Tops", shippingClass: "Lightweight", proCostUSD: 12.89, liteCostUSD: 16.12, sizeUpcharges: SIZE_UPCHARGES },
  // Long Sleeve
  { styleNumber: "3501", productName: "Mens Long Sleeve", brand: "Bella + Canvas", category: "Long Sleeve", shippingClass: "Lightweight", proCostUSD: 13.4, liteCostUSD: 16.75, sizeUpcharges: SIZE_UPCHARGES },
  { styleNumber: "G540", productName: "Unisex 5.3 oz Long Sleeve T-Shirt", brand: "Gildan", category: "Long Sleeve", shippingClass: "Lightweight", proCostUSD: 12.59, liteCostUSD: 15.74, sizeUpcharges: SIZE_UPCHARGES },
  // Hoodies & Sweatshirts
  { styleNumber: "G180", productName: "Crewneck Pullover Sweatshirt", brand: "Gildan", category: "Hoodies & Sweatshirts", shippingClass: "Heavyweight", proCostUSD: 13.31, liteCostUSD: 17.74, sizeUpcharges: SIZE_UPCHARGES },
  { styleNumber: "G185", productName: "Pullover Hoodie", brand: "Gildan", category: "Hoodies & Sweatshirts", shippingClass: "Heavyweight", proCostUSD: 16.49, liteCostUSD: 21.99, sizeUpcharges: SIZE_UPCHARGES },
  { styleNumber: "LS14001", productName: "Unisex Premium Hoodie", brand: "Lane Seven", category: "Hoodies & Sweatshirts", shippingClass: "Heavyweight", proCostUSD: 19.05, liteCostUSD: 23.81, sizeUpcharges: SIZE_UPCHARGES },
  { styleNumber: "S700", productName: "Mens Powerblend Hoodie", brand: "Champion", category: "Hoodies & Sweatshirts", shippingClass: "Heavyweight", proCostUSD: 24.78, liteCostUSD: 30.98, sizeUpcharges: SIZE_UPCHARGES },
  { styleNumber: "G186", productName: "Zip Up Hooded Sweatshirt", brand: "Gildan", category: "Hoodies & Sweatshirts", shippingClass: "Heavyweight", proCostUSD: 22.43, liteCostUSD: 28.04, sizeUpcharges: SIZE_UPCHARGES },
  // Mugs
  { styleNumber: "XP8434", productName: "11oz. White Mug", brand: "ORCA Coatings", category: "Mugs", shippingClass: "Lightweight Drinkware", proCostUSD: 3.75, liteCostUSD: 6.82, sizeUpcharges: {} },
  { styleNumber: "BM15OZ", productName: "15oz. Black Mug", brand: "ORCA Coatings", category: "Mugs", shippingClass: "Heavyweight Drinkware", proCostUSD: 5.75, liteCostUSD: 8.99, sizeUpcharges: {} },
  { styleNumber: "21504", productName: "15oz. White Mug", brand: "ORCA Coatings", category: "Mugs", shippingClass: "Heavyweight Drinkware", proCostUSD: 4.75, liteCostUSD: 7.42, sizeUpcharges: {} },
  // Hats
  { styleNumber: "CP80", productName: "Twill Cap", brand: "Port & Company", category: "Baseball Hats", shippingClass: "Lightweight", proCostUSD: 9.06, liteCostUSD: 11.33, sizeUpcharges: {} },
  { styleNumber: "104C", productName: "Trucker Snapback Hat", brand: "Pacific Headwear", category: "Trucker Hats", shippingClass: "Lightweight", proCostUSD: 10.58, liteCostUSD: 13.22, sizeUpcharges: {} },
  // Tote Bags
  { styleNumber: "BG1500", productName: "Core Cotton Tote", brand: "Port Authority", category: "Tote Bags", shippingClass: "Lightweight", proCostUSD: 9.5, liteCostUSD: 11.88, sizeUpcharges: {} },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Get a product by its style number (e.g. "G500") */
export function getProductByStyle(styleNumber: string): CustomCatProduct | undefined {
  return FULL_CATALOG.find((p) => p.styleNumber === styleNumber);
}

/** Calculate the base cost for a product, accounting for size upcharges */
export function calculateProductCost(
  styleNumber: string,
  size: string,
  plan: "pro" | "lite" = "pro",
  hasBackPrint = false,
): number {
  const product = getProductByStyle(styleNumber);
  if (!product) throw new Error(`Unknown product style: ${styleNumber}`);

  const base = plan === "pro" ? product.proCostUSD : product.liteCostUSD;
  const sizeUpcharge = product.sizeUpcharges[size] ?? 0;
  const backPrintCost = hasBackPrint ? SECOND_PRINT_LOCATION : 0;

  return base + sizeUpcharge + backPrintCost;
}

/** Get all available shipping classes (useful for estimating shipping) */
export const SHIPPING_CLASSES = [
  "Super Lightweight",
  "Lightweight",
  "Lightweight Drinkware",
  "Heavyweight",
  "Heavyweight Drinkware",
  "Poster - Single Ship",
  "Single Ship - Pillow",
  "Canvas - Single Ship",
  "Airframes - Single Ship",
] as const;

// ---------------------------------------------------------------------------
// API Client
// ---------------------------------------------------------------------------

async function customcatFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${API_BASE}${endpoint}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(
      `[CustomCat] ${options.method ?? "GET"} ${endpoint} failed (${res.status}): ${body}`,
    );
  }

  return res.json() as Promise<T>;
}

/** Fetch the full product catalog from CustomCat (includes catalog_skus per variant) */
export async function getCatalog() {
  return customcatFetch<{ products: unknown[] }>("/catalog");
}

/** Fetch details for a specific catalog_sku */
export async function getCatalogSku(catalogSku: string) {
  return customcatFetch<unknown>(`/catalog_sku/${catalogSku}`);
}

/** Submit a new order to CustomCat for fulfillment */
export async function createOrder(order: CustomCatOrder) {
  const validated = customcatOrderSchema.parse(order);
  const body = {
    ...validated,
    api_key: validated.api_key ?? API_KEY,
  };

  return customcatFetch<{
    order_id?: string;
    status?: string;
    error?: string;
  }>("/order", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

/** Submit an order in sandbox mode (no actual production/shipping) */
export async function createTestOrder(order: CustomCatOrder) {
  return createOrder({ ...order, sandbox: "1" });
}

/** Check the status of an existing order */
export async function getOrderStatus(orderId: string) {
  return customcatFetch<{
    status?: string;
    tracking_number?: string;
    items?: unknown[];
  }>(`/order/status/${orderId}`);
}

// ---------------------------------------------------------------------------
// Webhook payload types (for receiving updates FROM CustomCat)
// ---------------------------------------------------------------------------

export const customcatWebhookPayloadSchema = z.object({
  event: z.string(), // e.g. "order.shipped"
  order_id: z.string(),
  status: z.string().optional(),
  tracking_number: z.string().optional(),
  timestamp: z.string().optional(),
});

export type CustomCatWebhookPayload = z.infer<typeof customcatWebhookPayloadSchema>;