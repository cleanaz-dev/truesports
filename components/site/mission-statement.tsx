"use client"

import { motion } from "framer-motion"

export function MissionStatement() {
  return (
    <section className="relative py-32 sm:py-48 bg-black overflow-hidden">
      {/* 
        The 'bg-fixed' class creates that buttery smooth parallax scroll effect.
      */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed opacity-30" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558365849-6ebd8b0454b2?q=80&w=2560&auto=format&fit=crop')" }} 
      />
      
      {/* Gradients to seamlessly blend this section with the rest of the page */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-black/60 to-background" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 flex flex-col gap-32">
        
        {/* Step 1: The Core Mission (Centered) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="font-display text-sm font-bold uppercase tracking-widest text-primary mb-6">
            Our Mission
          </h2>
          <p className="text-2xl sm:text-4xl font-semibold leading-snug tracking-tight text-white drop-shadow-md">
            True Sports connects and empowers sports fans in North America and Europe with real-time highlights, exclusive commentary, and engaging content that captures the <span className="text-primary">raw emotion of authentic fandom.</span>
          </p>
          <p className="mt-6 text-lg sm:text-xl text-white/70">
            We disrupt generic coverage with a fresh, resonant perspective that goes beyond commentary.
          </p>
        </motion.div>

        {/* Step 2: Multi-Platform (Aligned Left) */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl mr-auto text-left"
        >
          <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-white mb-4">
            Multi-Platform Accessibility
          </h3>
          <p className="text-lg leading-relaxed text-white/80">
            Available on TikTok, Instagram, YouTube, and more, we deliver an always-on fan experience, redefining sports media through genuine authenticity.
          </p>
        </motion.div>

        {/* Step 3: True Sports Cares (Aligned Right) */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl ml-auto text-right"
        >
          <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-white mb-4">
            Commitment to the Future
          </h3>
          <p className="text-lg leading-relaxed text-white/80">
            Through <strong className="text-primary">True Sports Cares</strong>, we support grassroots youth development with essential resources like equipment, training, mentorship, and camps—uniting communities, celebrating passion, and investing in tomorrow's champions.
          </p>
        </motion.div>

        {/* NEW Step 4: Creative Standard (Aligned Left) */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl mr-auto text-left"
        >
          <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-white mb-4">
            An Unmatched Visual Standard
          </h3>
          <p className="text-lg leading-relaxed text-white/80">
            Born from a premium branding agency, we bring a level of creative excellence rarely seen in sports media. From elite identity design to high-end content rendering, our in-house studio ensures every story is told with striking visual impact.
          </p>
        </motion.div>

        {/* NEW Step 5: Shaping the Culture (Centered to finish out the section) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="mx-auto max-w-3xl text-center mt-12"
        >
          <h3 className="font-display text-3xl font-bold uppercase tracking-tight text-white mb-4">
            Shaping the Culture
          </h3>
          <p className="text-xl leading-relaxed text-white/80">
            Whether you are an emerging athlete, a global brand, or a die-hard fan, True Sports is your platform. <span className="text-primary font-semibold">We aren't just reporting on the culture of sports—we are building it.</span>
          </p>
        </motion.div>

      </div>
    </section>
  )
}