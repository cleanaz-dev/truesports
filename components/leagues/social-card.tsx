import { Heart, MessageCircle } from "lucide-react"
import type { SocialPost } from "@/lib/data"

export function SocialCard({ post }: { post: SocialPost }) {
  return (
    <a
      href="#"
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
    >
      {/* Image container with hover overlay */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={post.image || "/placeholder.svg"}
          alt={post.caption}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Glassmorphism Hover Overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-5 bg-background/60 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
          <span className="inline-flex items-center gap-1.5 font-display font-bold text-foreground">
            <Heart className="size-5 fill-current text-primary" />
            {post.likes}
          </span>
          <span className="inline-flex items-center gap-1.5 font-display font-bold text-foreground">
            <MessageCircle className="size-5 text-foreground" />
            {post.timeAgo}
          </span>
        </div>
      </div>
      
      {/* Caption Content */}
      <div className="flex flex-col gap-1.5 p-4">
        <span className="font-display text-xs font-bold uppercase tracking-wide text-primary">
          {post.handle}
        </span>
        <p className="line-clamp-2 text-sm leading-relaxed text-foreground/90">
          {post.caption}
        </p>
      </div>
    </a>
  )
}