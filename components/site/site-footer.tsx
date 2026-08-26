import { leagues } from "@/lib/data";
import { SOCIALS } from "@/lib/socials";
import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  const linkedinUrl =
    SOCIALS.find((s) => s.name.toLowerCase() === "linkedin")?.url ??
    "https://www.linkedin.com/company/true-sports-official";

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2 pt-2">
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
              </Link>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Breaking news, live scores, and the hottest takes across the
              leagues you love. Your front-row seat to the game.
            </p>
            <div className="mt-4 flex items-center gap-2">
              {SOCIALS.map(({ name, url, icon: Icon }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-9 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                  aria-label={name}
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
                    <Link
                      href={`/${l.toLowerCase()}`}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display text-sm font-bold uppercase tracking-widest text-foreground">
                Company
              </h3>
              <ul className="mt-3 flex flex-col gap-2">
                <li>
                  <Link
                    href="/work-with-us"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Work With Us
                  </Link>
                </li>
                <li>
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Careers
                  </a>
                </li>
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