import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getPlaceholderImage(league: string | null | undefined): string {
  const map: Record<string, string> = {
    nba: "/images/placeholders/nba.png",
    nfl: "/images/placeholders/nfl.png",
    mlb: "/images/placeholders/mlb.png",
    nhl: "/images/placeholders/nhl.png",
    soccer: "/images/placeholders/soccer.png",
  }

  const key = (league || "").toLowerCase().trim()
  return map[key] || "/placeholder.svg"
}

export function getRelativeTime(date: string | Date) {
  if (!date) return "Just now"
  const d = typeof date === "string" ? new Date(date) : date
  const now = new Date()
  const diffInHours = Math.abs(now.getTime() - d.getTime()) / 3600000

  if (diffInHours < 1) {
    const mins = Math.floor(diffInHours * 60)
    return `${mins || 1}m ago`
  }
  if (diffInHours < 24) {
    return `${Math.floor(diffInHours)}h ago`
  }
  return `${Math.floor(diffInHours / 24)}d ago`
}