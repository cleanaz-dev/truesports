"use client";

/* -------------------------------------------------------------------------- */
/*                               MERCH PAGE COMPONENTS                        */
/* -------------------------------------------------------------------------- */

import { ArrowRight, ShoppingBag, Tag } from "lucide-react";
import Image from "next/image";

// Mock Data for Merch
const merchItems = [
  {
    id: "m-1",
    name: "The Pressbox Heavyweight Hoodie",
    price: "$85.00",
    image: "/merch/hoodie.jpg", // Replace with your actual image paths
    badge: "Best Seller",
  },
  {
    id: "m-2",
    name: "Courtside Vintage Wash Tee",
    price: "$45.00",
    image: "/merch/vintage-wash-tee.jpg",
    badge: "New Drop",
  },
  {
    id: "m-3",
    name: "Gameday Snapback Hat",
    price: "$35.00",
    image: "/merch/snapback-hat.jpg",
  },
  {
    id: "m-4",
    name: "Director's Bomber Jacket",
    price: "$120.00",
    image: "/merch/bomber-jacket.jpg",
    badge: "Limited Edition",
  },
  {
    id: "m-5",
    name: "Essential Logo Socks (3-Pack)",
    price: "$25.00",
    image: "/merch/socks.jpg",
  },
  {
    id: "m-6",
    name: "Off-Duty Premium Joggers",
    price: "$75.00",
    image: "/merch/joggers.jpg",
    badge: "Almost Gone",
  },
];

export function MerchMainPage() {
  return (
    <main className="min-h-screen pb-20">
      {/* Promo Announcement Bar */}
      <div className="w-full bg-primary py-2 text-center">
        <span className="font-display text-[10px] font-bold uppercase tracking-widest text-primary-foreground sm:text-xs">
          Free Shipping on all domestic orders over $100
        </span>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        {/* Merch Page Header */}
        <header className="mb-12 flex flex-col items-center justify-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ShoppingBag className="size-8" />
          </div>
          <h1 className="font-display text-5xl font-black uppercase tracking-tighter text-foreground sm:text-7xl">
            The Official Shop
          </h1>
          <p className="max-w-xl text-muted-foreground sm:text-lg">
            Premium streetwear built for the culture. Rep the brand that runs
            the game.
          </p>
        </header>

        {/* Filters/Sorting (Visual only for now) */}
        <div className="mb-8 flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-4">
            <span className="font-display text-sm font-bold uppercase tracking-wide">
              All Gear
            </span>
            <span className="text-muted-foreground">/</span>
            <span className="font-display text-sm font-bold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground cursor-pointer">
              Tees
            </span>
            <span className="text-muted-foreground">/</span>
            <span className="font-display text-sm font-bold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground cursor-pointer">
              Hoodies
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
            <Tag className="size-4" />
            <span>{merchItems.length} Products</span>
          </div>
        </div>

      {/* Product Grid */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {merchItems.map((item) => (
            <div key={item.id} className="group relative flex flex-col gap-4">
              
              {/* 
                THE FIX: 
                1. Removed 'p-6' so the container handles the edge strictly.
                2. 'overflow-hidden' and 'rounded-3xl' stay on the parent. 
              */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-muted/50 transition-colors group-hover:bg-muted">
                
                {/* Badge */}
                {item.badge && (
                  <div className="absolute left-4 top-4 z-20 rounded bg-foreground px-2.5 py-1 font-display text-[10px] font-bold uppercase tracking-widest text-background shadow-sm">
                    {item.badge}
                  </div>
                )}

                {/* 
                  THE IMAGE FIX: 
                  - Changed to 'object-cover' so it fills the parent and gets its corners clipped perfectly.
                  - Removed 'p-6' and 'rounded-3xl' from the image tag itself.
                  
                  (Note: If you are using transparent PNGs of hoodies and WANT the padding, 
                  change this back to 'object-contain' and wrap this <Image> in a 
                  <div className="absolute inset-6"> ... </div>)
                */}
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Black Overlay (added z-10 to stay above image but below buttons/badges) */}
                <div className="pointer-events-none absolute inset-0 z-10 bg-black/40 transition-colors duration-300 group-hover:bg-black/20" />

                {/* Quick Add Overlay */}
                <div className="absolute bottom-4 left-4 right-4 z-20 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary/90 py-3.5 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground backdrop-blur-md transition-all hover:bg-primary hover:scale-[1.02]">
                    Coming Soon...
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="flex flex-col gap-1 px-1">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-lg font-bold leading-tight text-foreground transition-colors group-hover:text-primary">
                    {item.name}
                  </h3>
                  <span className="font-display text-lg font-black text-foreground">
                    {item.price}
                  </span>
                </div>
                <span className="text-sm font-medium text-muted-foreground">Unisex</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
