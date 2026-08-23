

import { Camera, Heart, MessageCircle } from "lucide-react"
import { socialPosts } from "@/lib/data"
import { FaSquareInstagram } from "react-icons/fa6"
import { FaInstagram } from "react-icons/fa";

export function SocialFeed() {
  return (
    <section className="border-t border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-5 flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2.5">
            <FaInstagram  className="size-6 text-primary" />
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-foreground">
              Instagram
            </h2>
          </div>
          <a
            href="#"
            className="font-display text-xs font-semibold uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
          >
            @truesportslive
          </a>
        </div>

        <div className="overflow-hidden">
          <div className="animate-marquee flex w-max gap-4">
            {[...socialPosts, ...socialPosts].map((post, index) => (
              <a
                key={`${post.id}-${index}`}
                href="#"
                className="group flex w-64 flex-shrink-0 flex-col overflow-hidden rounded-xl border border-border bg-card sm:w-72"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.caption}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center gap-5 bg-background/60 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                    <span className="inline-flex items-center gap-1.5 font-display font-bold text-foreground">
                      <Heart className="size-5 fill-current" />
                      {post.likes}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-display font-bold text-foreground">
                      <MessageCircle className="size-5" />
                      {post.timeAgo}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 p-3.5">
                  <span className="font-display text-xs font-bold uppercase tracking-wide text-primary">
                    {post.handle}
                  </span>
                  <p className="line-clamp-2 text-sm leading-relaxed text-foreground/90">{post.caption}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}