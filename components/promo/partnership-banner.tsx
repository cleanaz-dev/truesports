import { Handshake, BarChart3, ArrowRight } from "lucide-react"

export function PartnershipBanner() {
  return (
    <div className="group relative flex w-full flex-col justify-center overflow-hidden rounded-2xl bg-zinc-950 p-8 sm:p-10 shadow-lg border border-white/5">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-tr from-zinc-950 via-zinc-900 to-primary/10" />
      
      {/* Background Icon */}
      <Handshake className="absolute -bottom-12 -right-12 size-72 text-white/[0.03] transition-transform duration-700 group-hover:-rotate-12 group-hover:scale-110" />
      
      <div className="relative z-10 flex flex-col gap-5 md:w-4/5 lg:w-3/4">
        {/* Eyebrow */}
        <div className="flex items-center gap-2 text-primary">
          <BarChart3 className="size-4" />
          <span className="font-display text-xs font-bold uppercase tracking-widest text-primary">
            True Sports Partnerships
          </span>
        </div>
        
        {/* Headline */}
        <h3 className="font-display text-3xl font-black uppercase leading-none tracking-tight text-white sm:text-4xl">
          An Unmatched Visual Standard
        </h3>
        
        {/* Copy */}
        <p className="max-w-xl text-sm leading-relaxed text-zinc-400">
          Born from a premium branding agency, we connect forward-thinking brands with passionate sports fans. Get in front of our highly engaged community.
        </p>

        {/* Stats Grid */}
        <div className="flex items-center gap-8 py-2">
          <div className="flex flex-col">
            <span className="font-display text-2xl font-black text-white">9.47M</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Total Reach</span>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="flex flex-col">
            <span className="font-display text-2xl font-black text-white">590K</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Followers</span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-2">
          <button className="group/btn flex items-center gap-2 rounded-sm bg-white px-6 py-2.5 font-display text-sm font-bold uppercase tracking-widest text-black transition-colors hover:bg-zinc-200">
            Request Media Kit
            <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  )
}