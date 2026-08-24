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
        <>
          {/* Pitch Black Cinematic Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl"
            onClick={() => setIsVisible(false)} // Click outside to close
          />

          {/* MOBILE VIEW WRAPPER (< 1024px) */}
          <motion.div
            key="mobile-view"
            className="pointer-events-none fixed inset-0 z-[101] flex items-center justify-center p-4 lg:hidden"
            exit={{ opacity: 0 }}
          >
            <MobileLayout setIsVisible={setIsVisible} />
          </motion.div>

          {/* DESKTOP VIEW WRAPPER (>= 1024px) */}
          <motion.div
            key="desktop-view"
            className="pointer-events-none fixed inset-0 z-[101] hidden items-center justify-center p-8 lg:flex"
            exit={{ opacity: 0 }}
          >
            <DesktopLayout setIsVisible={setIsVisible} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ==========================================
// 📱 MOBILE LAYOUT (Timed Sequence)
// ==========================================
function MobileLayout({ setIsVisible }: { setIsVisible: (v: boolean) => void }) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    // Sequence timing: 
    // Wait 3.2s -> Show second stat group
    // Wait 6.4s -> Show final buttons
    const timer1 = setTimeout(() => setStep(1), 3200)
    const timer2 = setTimeout(() => setStep(2), 6400)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  return (
    <motion.aside
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-auto relative flex w-full max-w-sm flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 text-white shadow-2xl"
    >
      <div className="relative flex flex-col p-6 sm:p-8">
        <button
          type="button"
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-4 z-50 rounded-full bg-black/50 p-2 text-white/60 backdrop-blur-md transition hover:bg-white/10 hover:text-white"
        >
          <X className="size-5" />
        </button>

        <Reveal delay={0.1} y={10}>
          <Image
            src="/images/ts-brands/ts-logo-mini-2.png"
            alt="True Sports"
            width={120}
            height={40}
            priority
            className="h-8 w-auto object-contain"
          />
        </Reveal>

        <div className="mt-8">
          <Reveal delay={0.2} y={10}>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
              Partnership opportunities
            </p>
          </Reveal>

          <Reveal delay={0.3} y={10}>
            <h2 className="font-display text-4xl font-black uppercase leading-[0.9] tracking-tighter sm:text-5xl">
              Put your brand <br /> in the game.
            </h2>
          </Reveal>

          <Reveal delay={0.4} y={10}>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">
              Connect with passionate sports fans through digital campaigns,
              podcast integrations, and creative brand experiences.
            </p>
          </Reveal>
        </div>

        {/* Dynamic Sequence Area (Fixed Height prevents layout jumps) */}
        <div className="relative mt-8 h-[116px] w-full">
          <AnimatePresence mode="wait">
            
            {/* STEP 0: Reach & Followers */}
            {step === 0 && (
              <motion.div
                key="step-0"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex items-center justify-between gap-3"
              >
                <MobileStatItem stat={stats[0]} />
                <MobileStatItem stat={stats[1]} />
              </motion.div>
            )}

            {/* STEP 1: Views & Engagements */}
            {step === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex items-center justify-between gap-3"
              >
                <MobileStatItem stat={stats[2]} />
                <MobileStatItem stat={stats[3]} />
              </motion.div>
            )}

            {/* STEP 2: Buttons */}
            {step === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex flex-col justify-center gap-3"
              >
                <Link
                  href="/work-with-us"
                  className="flex w-full items-center justify-center rounded-sm bg-primary px-6 py-4 font-display text-sm font-bold uppercase tracking-widest text-primary-foreground transition-all hover:bg-primary/90"
                >
                  Work With Us
                  <ArrowRight className="ml-2 size-4" />
                </Link>
                <button
                  onClick={() => setIsVisible(false)}
                  className="w-full py-2 text-center text-xs font-semibold uppercase tracking-wider text-zinc-500 transition-colors hover:text-white"
                >
                  Continue to Site
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  )
}

// Small helper component to keep the mobile stat boxes clean
function MobileStatItem({ stat }: { stat: { value: string; label: string } }) {
  return (
    <div className="flex w-full flex-col items-center justify-center rounded-xl border border-zinc-800/60 bg-zinc-900/40 py-4 text-center">
      <dd className="font-display text-2xl font-black tracking-tighter text-white sm:text-3xl">
        {stat.value}
      </dd>
      <dt className="mt-1 text-[9px] font-bold uppercase tracking-widest text-zinc-500">
        {stat.label}
      </dt>
    </div>
  )
}


// ==========================================
// 🖥️ DESKTOP LAYOUT (Unchanged)
// ==========================================
function DesktopLayout({ setIsVisible }: { setIsVisible: (v: boolean) => void }) {
  return (
    <motion.aside
      initial={{ opacity: 0, scale: 0.97, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.97, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-auto relative flex w-full max-w-6xl flex-row overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 text-white shadow-2xl"
    >
      <button
        type="button"
        onClick={() => setIsVisible(false)}
        className="absolute right-6 top-6 z-50 rounded-full bg-black/50 p-2 text-white/60 backdrop-blur-md transition hover:bg-white/10 hover:text-white"
      >
        <X className="size-5" />
      </button>

      {/* Left Column */}
      <div className="flex w-[55%] flex-col justify-center p-12 xl:p-16">
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
            <h2 className="font-display text-6xl font-black uppercase leading-[0.85] tracking-tighter xl:text-7xl">
              Put your brand <br /> in the game.
            </h2>
          </Reveal>

          <Reveal delay={0.4} y={20}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-zinc-400">
              Connect with passionate sports fans through digital campaigns,
              podcast integrations, and creative brand experiences.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.5} y={20} className="mt-12 flex items-center gap-6">
          <Link
            href="/work-with-us"
            className="group flex items-center justify-center rounded-sm bg-primary px-8 py-4 font-display text-sm font-bold uppercase tracking-widest text-primary-foreground transition-all hover:bg-primary/90"
          >
            Work With Us
            <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <button
            onClick={() => setIsVisible(false)}
            className="px-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 transition-colors hover:text-white"
          >
            Continue to Site
          </button>
        </Reveal>
      </div>

      {/* Right Column */}
      <div className="grid w-[45%] grid-cols-2 gap-px bg-zinc-800">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center bg-zinc-950 p-12 text-center"
          >
            <Reveal delay={0.5 + i * 0.1} y={15}>
              <dd className="font-display text-5xl font-black tracking-tighter text-white xl:text-6xl">
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
  )
}