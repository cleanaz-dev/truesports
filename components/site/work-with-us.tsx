import { Megaphone, Mic, PenTool, TrendingUp, Mail, ArrowRight } from "lucide-react"

export const metadata = {
  title: "Work With Us | True Sports",
  description: "Partner with True Sports. Sponsorships, podcast integrations, and branding services.",
}

export default function WorkWithUsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pb-20">
      {/* Hero Section */}
      <section className="border-b border-border bg-card/50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl font-extrabold uppercase tracking-tight sm:text-6xl">
              Partner with <span className="text-primary">True Sports</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              We are a rapidly growing sports media network and creative studio. 
              From highly-engaged Instagram content and upcoming podcasts to our live web platform, 
              we connect forward-thinking brands with passionate sports fans.
            </p>
          </div>
        </div>
      </section>

      {/* Stats / Social Proof (Placeholder numbers, change to yours!) */}
      <section className="border-b border-border bg-background">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <dl className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="flex flex-col gap-2">
              <dt className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Highly Engaged</dt>
              <dd className="font-display text-3xl font-bold">Instagram Community</dd>
            </div>
            <div className="flex flex-col gap-2">
              <dt className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Coming Soon</dt>
              <dd className="font-display text-3xl font-bold">True Sports Podcast</dd>
            </div>
            <div className="flex flex-col gap-2">
              <dt className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">In-House</dt>
              <dd className="font-display text-3xl font-bold">Creative & Branding</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Services / What We Offer */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-12">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide">Partnership Opportunities</h2>
          <p className="mt-2 text-muted-foreground">Choose how you want to connect with our audience.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Card 1: Social & Web */}
          <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-8 transition-colors hover:border-primary/50">
            <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Megaphone className="size-6" />
            </div>
            <h3 className="font-display text-xl font-bold uppercase">Digital & Social</h3>
            <p className="text-sm leading-relaxed text-muted-foreground flex-grow">
              Get your brand in front of our audience. We offer sponsored Instagram posts, 
              story takeovers, and premium ad placements right here on the True Sports scoreboard and news feeds.
            </p>
          </div>

          {/* Card 2: Podcast */}
          <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-8 transition-colors hover:border-primary/50">
            <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Mic className="size-6" />
            </div>
            <h3 className="font-display text-xl font-bold uppercase">Podcast Integration</h3>
            <p className="text-sm leading-relaxed text-muted-foreground flex-grow">
              Join us on the mic. We are launching the True Sports podcast and looking for 
              title sponsors, mid-roll ad reads, and product placements to seamlessly integrate into our sports debates.
            </p>
          </div>

          {/* Card 3: Branding (Their original focus) */}
          <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-8 transition-colors hover:border-primary/50">
            <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <PenTool className="size-6" />
            </div>
            <h3 className="font-display text-xl font-bold uppercase">Creative Studio</h3>
            <p className="text-sm leading-relaxed text-muted-foreground flex-grow">
              True Sports was born as a branding agency. If you are a sports brand, athlete, or business 
              looking for elite logo design, identity rendering, or merchandise creation, our in-house studio is ready to build.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          
          {/* Left Side: Text */}
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

          {/* Right Side: Form */}
          <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
            <form className="flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Name</label>
                  <input type="text" id="name" className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="John Doe" required />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="company" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Company / Brand</label>
                  <input type="text" id="company" className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Acme Sports" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Email Address</label>
                <input type="email" id="email" className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="john@example.com" required />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="interest" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">I am interested in...</label>
                <select id="interest" className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                  <option>Digital Sponsorships (Web/IG)</option>
                  <option>Podcast Sponsorships</option>
                  <option>Branding & Creative Services</option>
                  <option>General Collaboration</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Message</label>
                <textarea id="message" rows={4} className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Tell us about your goals..." required></textarea>
              </div>

              <button type="submit" className="mt-2 flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-bold tracking-wide text-primary-foreground transition-all hover:bg-primary/90">
                Submit Inquiry
                <ArrowRight className="size-4" />
              </button>
            </form>
          </div>

        </div>
      </section>
    </main>
  )
}