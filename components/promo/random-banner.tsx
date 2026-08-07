"use client"

import { useState, useEffect } from "react"

interface RandomBannerProps {
  banners: React.ReactNode[]
}

export function RandomBanner({ banners }: RandomBannerProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  useEffect(() => {
    // Pick a random index when the component mounts on the client
    const randomIndex = Math.floor(Math.random() * banners.length)
    setSelectedIndex(randomIndex)
  }, [banners.length])

  // While it's picking a banner (or if it hasn't loaded yet), show a subtle skeleton pulse
  // to avoid layout shift jumping.
  if (selectedIndex === null) {
    return <div className="min-h-[300px] w-full animate-pulse rounded-2xl bg-card" />
  }

  return <>{banners[selectedIndex]}</>
}