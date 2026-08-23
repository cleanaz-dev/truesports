import { Megaphone, Mic, PenTool, Mail, ArrowRight } from "lucide-react"
import { StatCounter } from "@/hooks/use-stat-counter"
import { MissionStatement } from "@/components/site/mission-statement"

// Shadcn UI Imports
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const metadata = {
  title: "Work With Us | True Sports",
  description: "Partner with True Sports. Sponsorships, podcast integrations, and branding services.",
}

export default function WorkWithUsPage() {
  return (
    <main className="min-h-screen bg-background pb-20 text-foreground">
      
      {/* 1. Hero Section with Background Image */}
      <section className="relative border-b border-border bg-black">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2805&auto=format&fit=crop')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute inset-0 bg-background/30 backdrop-blur-[2px]" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="font-display text-5xl font-extrabold uppercase tracking-tight drop-shadow-lg sm:text-7xl">
              Partner with <br />
              <span className="text-primary">True Sports</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/90 drop-shadow-md">
              We are a rapidly growing sports media network and creative studio. 
              From highly-engaged Instagram content and upcoming podcasts to our live web platform, 
              we connect forward-thinking brands with passionate sports fans.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Quick Stats / Pillars */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <dl className="grid grid-cols-1 divide-y divide-border gap-8 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="flex flex-col gap-2 pt-4 sm:pl-0 sm:pt-0">
              <dt className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Highly Engaged</dt>
              <dd className="font-display text-2xl font-bold">Instagram Community</dd>
            </div>
            <div className="flex flex-col gap-2 pt-4 sm:pl-8 sm:pt-0">
              <dt className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Coming Soon</dt>
              <dd className="font-display text-2xl font-bold">True Sports Podcast</dd>
            </div>
            <div className="flex flex-col gap-2 pt-4 sm:pl-8 sm:pt-0">
              <dt className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">In-House</dt>
              <dd className="font-display text-2xl font-bold">Creative & Branding</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* 3. Stats & Growth Counters */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                True Sports Partnership Opportunities
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
                A Network Built for Growth
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Driven by data and audience engagement, True Sports leads emerging sports media brands in video views, follower growth, and virality. We partner with athletes, influencers, and creators to amplify reach and impact.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8 shadow-xl">
              <h3 className="mb-8 border-b border-border pb-4 font-display text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Social Media Performance
              </h3>
              <div className="grid grid-cols-2 gap-8 gap-y-10">
                <div className="flex flex-col gap-2">
                  <dd className="font-display text-4xl font-extrabold text-foreground sm:text-5xl">
                    <StatCounter value={11.89} decimals={2} suffix="M" />
                  </dd>
                  <dt className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Total Reach</dt>
                </div>
                <div className="flex flex-col gap-2">
                  <dd className="font-display text-4xl font-extrabold text-foreground sm:text-5xl">
                    <StatCounter value={741.2} decimals={1} suffix="K" />
                  </dd>
                  <dt className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Followers</dt>
                </div>
                <div className="flex flex-col gap-2">
                  <dd className="font-display text-4xl font-extrabold text-foreground sm:text-5xl">
                    <StatCounter value={10.68} decimals={2} suffix="M" />
                  </dd>
                  <dt className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Video Views</dt>
                </div>
                <div className="flex flex-col gap-2">
                  <dd className="font-display text-4xl font-extrabold text-foreground sm:text-5xl">
                    <StatCounter value={319} decimals={0} suffix="K" />
                  </dd>
                  <dt className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Engagement</dt>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. The Parallax Mission Statement Scroll Reveal */}
      <MissionStatement />

      {/* 5. Services / What We Offer */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-12">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide">Partnership Opportunities</h2>
          <p className="mt-2 text-muted-foreground">Choose how you want to connect with our audience.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-8 transition-colors hover:border-primary/50">
            <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Megaphone className="size-6" />
            </div>
            <h3 className="font-display text-xl font-bold uppercase">Digital & Social</h3>
            <p className="flex-grow text-sm leading-relaxed text-muted-foreground">
              Get your brand in front of our audience. We offer sponsored Instagram posts, 
              story takeovers, and premium ad placements right here on the True Sports scoreboard and news feeds.
            </p>
          </div>

          <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-8 transition-colors hover:border-primary/50">
            <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Mic className="size-6" />
            </div>
            <h3 className="font-display text-xl font-bold uppercase">Podcast Integration</h3>
            <p className="flex-grow text-sm leading-relaxed text-muted-foreground">
              Join us on the mic. We are launching the True Sports podcast and looking for 
              title sponsors, mid-roll ad reads, and product placements to seamlessly integrate into our sports debates.
            </p>
          </div>

          <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-8 transition-colors hover:border-primary/50">
            <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <PenTool className="size-6" />
            </div>
            <h3 className="font-display text-xl font-bold uppercase">Creative Studio</h3>
            <p className="flex-grow text-sm leading-relaxed text-muted-foreground">
              True Sports was born as a branding agency. If you are a sports brand, athlete, or business 
              looking for elite logo design, identity rendering, or merchandise creation, our in-house studio is ready to build.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Contact Form Section (Updated to Shadcn UI) */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          
          <div className="flex flex-col justify-center">
            <h2 className="font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
              Let's Build <br/> Something Great.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Fill out the form to request our Media Kit, inquire about branding services, or pitch a collaboration. We usually respond within 24 hours.
            </p>
            
            <div className="mt-8 flex items-center gap-4 text-sm font-medium text-muted-foreground">
              <Mail className="size-5" />
              partnerships@truesports.com
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
            <form className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Name</Label>
                  <Input type="text" id="name" placeholder="John Doe" required />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="company" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Company / Brand</Label>
                  <Input type="text" id="company" placeholder="Acme Sports" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Email Address</Label>
                <Input type="email" id="email" placeholder="john@example.com" required />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="interest" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">I am interested in...</Label>
                <Select required>
                  <SelectTrigger id="interest">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="digital">Digital Sponsorships (Web/IG)</SelectItem>
                    <SelectItem value="podcast">Podcast Sponsorships</SelectItem>
                    <SelectItem value="branding">Branding & Creative Services</SelectItem>
                    <SelectItem value="general">General Collaboration</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="message" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Message</Label>
                <Textarea 
                  id="message" 
                  rows={4} 
                  placeholder="Tell us about your goals..." 
                  className="resize-none"
                  required 
                />
              </div>

              <Button type="submit" size="lg" className="mt-2 w-full font-bold tracking-wide sm:w-auto">
                Submit Inquiry
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </form>
          </div>

        </div>
      </section>
    </main>
  )
}