import { ShoppingBag } from "lucide-react";

export function MerchBanner() {
    return (
        <div className="group relative flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-primary p-8 text-center shadow-lg transition-transform hover:-translate-y-1">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
            <ShoppingBag className="absolute -left-10 -bottom-10 size-48 text-black/10 transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110" />
            
            <div className="relative z-10 flex flex-col items-center gap-3">
                <span className="font-display text-xs font-bold uppercase tracking-widest text-primary-foreground/80">
                    Official Merch
                </span>
                <h3 className="font-display text-3xl font-black uppercase leading-tight tracking-tight text-primary-foreground">
                    Shop The <br/> Playoff Drop
                </h3>
                <p className="text-sm font-medium text-primary-foreground/90">
                    Hoodies, tees, and caps for the real ones. Available now.
                </p>
                <button className="mt-4 rounded-sm bg-background px-8 py-3 font-display text-sm font-bold uppercase tracking-widest text-foreground transition-colors hover:bg-muted">
                    Shop Now
                </button>
            </div>
        </div>
    )
}