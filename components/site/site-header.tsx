"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { leagues } from "@/lib/data"
import { Button } from "@/components/ui/button"

const navItems = ["Home", ...leagues, "Work With Us"]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        <a href="/" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-sm bg-primary font-display text-lg font-bold leading-none text-primary-foreground">
            TS
          </span>
          <span className="font-display text-xl font-bold uppercase tracking-tight text-foreground">
            True Sports
          </span>
        </a>

        <nav className="ml-6 hidden items-center gap-1 md:flex">
          {navItems.map((item, i) => (
            <a
              key={item}
              href="#"
              className={`rounded-md px-3 py-2 font-display text-sm font-medium uppercase tracking-wide transition-colors hover:bg-secondary ${
                item === "Work With Us"
                  ? "text-blue-500 hover:text-blue-600"
                  : i === 0
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button className="hidden font-display font-semibold uppercase tracking-wide sm:inline-flex">
            Subscribe
          </Button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-4 py-2 md:hidden">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className={`block rounded-md px-3 py-2.5 font-display text-sm font-medium uppercase tracking-wide transition-colors hover:bg-secondary ${
                item === "Work With Us"
                  ? "text-blue-500 hover:text-blue-600"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setOpen(false)}
            >
              {item}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}