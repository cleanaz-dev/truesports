"use client"

import { useDrawer } from "@/context/drawer-context";
import { Briefcase } from "lucide-react";

export function PromoBanner() {
      const { openDrawer } = useDrawer()
    return (
        <div className="group relative flex w-full flex-col justify-center overflow-hidden rounded-2xl bg-zinc-950 p-8 sm:p-10">
            {/* Background Texture/Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-zinc-950 to-zinc-950" />
            <Briefcase className="absolute -right-10 -top-10 size-64 text-white/5 transition-transform duration-700 group-hover:-rotate-12 group-hover:scale-110" />
            
            <div className="relative z-10 flex flex-col gap-3 md:w-3/4">
                <span className="font-display text-xs font-bold uppercase tracking-widest text-primary">
                    Join The Roster
                </span>
                <h3 className="font-display text-3xl font-black uppercase leading-none tracking-tight text-white sm:text-4xl">
                    Want to work in sports?
                </h3>
                <p className="max-w-md text-sm leading-relaxed text-zinc-400">
                    We're looking for passionate writers, video editors, and sports junkies to help build the next generation of sports media.
                </p>
                <div className="mt-4">
                    <button
                       onClick={() => openDrawer("promo")} 
                    
                    className="rounded-sm bg-primary px-6 py-2.5 font-display text-sm font-bold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90">
                        Get In Touch
                    </button>
                </div>
            </div>
        </div>
    )
}