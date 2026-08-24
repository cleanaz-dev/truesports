// components/site/work-with-us-overlay.tsx
"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useState, useEffect } from "react"
import { Reveal } from "./reveal"

const stats = [
  { value: "11.89M", label: "Total Reach" },
  { value: "741.2K", label: "Followers" },
  { value: "10.68M", label: "Video Views" },
  { value: "319K", label: "Engagements" },
]

export function WorkWithUsHeroOverlay() {
  const [isVisible, setIsVisible] = useState(true)

  // Prevent scrolling when the cinematic overlay is open
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isVisible])

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
          {/* Pitch Black Cinematic Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            onClick={() => setIsVisible(false)} // Click outside to close
          />

          {/* Expanded Cinematic Container */}
          <motion.aside
            initial={{ opacity: 0, scale: 0.97, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.97, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 text-white shadow-2xl lg:flex-row"
            aria-label="Partner with True Sports"
          >
            <button
              type="button"
              onClick={() => setIsVisible(false)}
              className="absolute right-6 top-6 z-50 rounded-full bg-black/50 p-2 text-white/60 backdrop-blur-md transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Dismiss partnership message"
            >
              <X className="size-5" />
            </button>

            {/* Left Column: Bold Copy */}
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:w-[55%] lg:p-16">
              <Reveal delay={0.1} y={20}>
                <Image
                  src="/images/ts-brands/ts-logo-mini-2.png"
                  alt="True Sports"
                  width={150}
                  height={48}
                  priority
                  className="h-10 w-auto object-contain"
                />
              </Reveal>

              <div className="mt-12">
                <Reveal delay={0.2} y={20}>
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                    Partnership opportunities
                  </p>
                </Reveal>
                
                <Reveal delay={0.3} y={20}>
                  <h2 className="font-display text-5xl font-black uppercase leading-[0.85] tracking-tighter sm:text-6xl lg:text-7xl">
                    Put your brand <br className="hidden sm:block" /> in the game.
                  </h2>
                </Reveal>

                <Reveal delay={0.4} y={20}>
                  <p className="mt-6 max-w-lg text-lg leading-relaxed text-zinc-400">
                    Connect with passionate sports fans through digital campaigns,
                    podcast integrations, and creative brand experiences.
                  </p>
                </Reveal>
              </div>

              <Reveal delay={0.5} y={20} className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  href="/work-with-us"
                  className="group flex w-full items-center justify-center rounded-sm bg-primary px-8 py-4 font-display text-sm font-bold uppercase tracking-widest text-primary-foreground transition-all hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 sm:w-auto"
                >
                  Work With Us
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </Link>
                
                <button 
                  onClick={() => setIsVisible(false)}
                  className="w-full text-center text-xs font-semibold uppercase tracking-wider text-zinc-500 transition-colors hover:text-white sm:w-auto sm:px-4"
                >
                  Continue to Site
                </button>
              </Reveal>
            </div>

            {/* Right Column: Architectural Stats Grid */}
            <div className="grid grid-cols-2 gap-px bg-zinc-800 lg:w-[45%]">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center justify-center bg-zinc-950 p-8 text-center sm:p-12"
                >
                  <Reveal delay={0.5 + i * 0.1} y={15}>
                    <dd className="font-display text-4xl font-black tracking-tighter text-white sm:text-5xl lg:text-6xl">
                      {stat.value}
                    </dd>
                    <dt className="mt-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                      {stat.label}
                    </dt>
                  </Reveal>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}