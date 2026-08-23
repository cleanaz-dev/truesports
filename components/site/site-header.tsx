"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { leagues } from "@/lib/data"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image"
import { SpotlightSheet } from "../spotlight/spotlight-sheet"
import { getSpotlight } from "@/lib/actions/get-spotlight"

const navItems = ["Home", ...leagues, "Work With Us"]
const mobileNavItems = [...navItems, "Merch"]

function hrefForItem(item: string): string {
  if (item === "Home") return "/"
  if (item === "Work With Us") return "/work-with-us"
  return `/${item.toLowerCase()}`
}

// Items that keep their own fixed color scheme and never take the
// "active route" white/foreground treatment.
const EXCLUDED_FROM_ACTIVE_STYLING = ["Merch", "Work With Us"]

type SiteHeaderProps = {
  spotlight: Awaited<ReturnType<typeof getSpotlight>>
}

export function SiteHeader({ spotlight }: SiteHeaderProps) {
  const [open, setOpen] = useState(false)
  const [openSpotlight, setOpenSpotlight] = useState(false)
  const pathname = usePathname()

  function navLinkClasses(item: string, variant: "desktop" | "mobile") {
    const isActive = pathname === hrefForItem(item)
    const base =
      variant === "desktop"
        ? "rounded-md px-3 py-2 font-display text-sm font-medium uppercase tracking-wide transition-colors hover:bg-secondary"
        : "block rounded-md px-3 py-2.5 font-display text-sm font-medium uppercase tracking-wide transition-colors hover:bg-secondary"

    if (item === "Work With Us") {
      return `${base} text-blue-500 hover:text-blue-600`
    }

    if (item === "Merch") {
      return `${base} text-muted-foreground hover:text-amber-500 duration-300`
    }

    if (EXCLUDED_FROM_ACTIVE_STYLING.includes(item)) {
      return `${base} text-muted-foreground hover:text-foreground`
    }

    return `${base} ${
      isActive ? "text-white" : "text-muted-foreground hover:text-foreground"
    }`
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <button
                className="inline-flex items-center justify-center rounded-md p-2 text-foreground md:hidden"
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </button>
            }
          />

          <SheetContent
            side="top"
            className="border-b border-border bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 md:hidden"
          >
            <SheetHeader>
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <a
                href="/"
                className="flex items-center gap-2 px-4 pt-2"
                onClick={() => setOpen(false)}
              >
                <Image
                  src="/images/meta-logo-1.png"
                  alt="True Sports Logo"
                  width={36}
                  height={36}
                  className="rounded-full"
                />
                <span className="font-display text-lg font-bold uppercase tracking-tight text-foreground">
                  True Sports
                </span>
              </a>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4 pb-4 pt-2">
              {mobileNavItems.map((item) => (
                <a
                  key={item}
                  href={hrefForItem(item)}
                  className={navLinkClasses(item, "mobile")}
                  onClick={() => setOpen(false)}
                >
                  {item}
                </a>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <a href="/" className="flex items-center gap-2">
          <Image
            src="/images/meta-logo-1.png"
            alt="True Sports Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="font-display text-xl font-bold uppercase tracking-tight text-foreground">
            True Sports
          </span>
        </a>

        <nav className="ml-6 hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={hrefForItem(item)}
              className={navLinkClasses(item, "desktop")}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-6">
          {spotlight && (
            <Button
              className="hidden font-display font-semibold uppercase tracking-wide sm:inline-flex"
              onClick={() => setOpenSpotlight(true)}
            >
              🔥 Game Spotlight
            </Button>
          )}
          <a
            href="/merch"
            className="hidden font-display text-sm font-medium uppercase tracking-wide text-muted-foreground transition-colors hover:text-amber-500 sm:inline-flex items-center duration-300"
          >
            Merch
          </a>
          {/* <Button className="hidden font-display font-semibold uppercase tracking-wide sm:inline-flex">
            Subscribe
          </Button> */}
        </div>
      </div>

      <SpotlightSheet
        data={spotlight}
        open={openSpotlight}
        onOpenChange={setOpenSpotlight}
      />
    </header>
  )
}