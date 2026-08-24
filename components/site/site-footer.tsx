import { leagues } from "@/lib/data";
import Image from "next/image";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-2">
              <a href="/" className="flex items-center gap-2 pt-2">
                <Image
                  src="/images/meta-logo-1.png"
                  alt="True Sports Logo"
                  width={36}
                  height={36}
                  className="rounded-full w-10"
                  style={{ height: "auto" }}
                />
                <span className="font-display text-lg font-bold uppercase tracking-tight text-foreground">
                  True Sports
                </span>
              </a>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Breaking news, live scores, and the hottest takes across the
              leagues you love. Your front-row seat to the game.
            </p>
            <div className="mt-4 flex items-center gap-2">
              {[FaInstagram, FaTwitter, FaYoutube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="inline-flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                  aria-label="Social link"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <h3 className="font-display text-sm font-bold uppercase tracking-widest text-foreground">
                Leagues
              </h3>
              <ul className="mt-3 flex flex-col gap-2">
                {leagues.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {/* <div>
              <h3 className="font-display text-sm font-bold uppercase tracking-widest text-foreground">
                Sections
              </h3>
              <ul className="mt-3 flex flex-col gap-2">
                {["Scores", "Blogs", "Highlights", "Betting"].map((s) => (
                  <li key={s}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div> */}
            <div>
              <h3 className="font-display text-sm font-bold uppercase tracking-widest text-foreground">
                Company
              </h3>
              <ul className="mt-3 flex flex-col gap-2">
                {["About", "Work With Us"].map((c) => (
                  <li key={c}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {c}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} True Sports. All rights reserved. Scores
          shown are illustrative.
        </div>
      </div>
    </footer>
  );
}
