// components/HeroSection.tsx
import React from "react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[85vh] flex items-center justify-center text-center overflow-hidden">
      {/* YouTube Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <iframe
          className="absolute top-1/2 left-1/2 
               md:w-[120%] md:h-[120%] 
               w-[215%] h-[200%] 
               -translate-x-1/2 -translate-y-1/2 
               pointer-events-none"
          src="https://www.youtube.com/embed/oDPErHSLcPo?autoplay=1&mute=1&controls=0&loop=1&playlist=oDPErHSLcPo&modestbranding=1"
          title="YouTube video background"
          allow="autoplay; fullscreen"
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center px-4 text-white">
        <h1 className="text-2xl md:text-2xl font-bold mb-4 uppercase">
          Elevate Your Brand
        </h1>

        <p className="max-w-3xl text-lg md:text-5xl font-extrabold  mb-6 uppercase leading-11 tracking-tight">
          Discover how True Sports can skyrocket your brand&apos;s reach and
          influence in the sports world.
        </p>

        <h2 className="text-2xl font-light mb-8">Unleash True Sports Power</h2>

        <div className="flex space-x-6">
          <Button
            variant="default"
            size="lg"
            className="bg-blue-600 rounded-3xl"
          >
            ABOUT TRUE SPORTS
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="bg-transparent border-2 text-white rounded-3xl"
          >
            ADVERTISEMENT OPPORTUNITIES
          </Button>
        </div>
      </div>
    </section>
  );
}
