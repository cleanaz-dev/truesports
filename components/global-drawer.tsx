// components/global-drawer.tsx
"use client"

import { useDrawer } from "@/context/drawer-context"
import { submitDynamicForm } from "@/lib/actions/submit-dynamic-form"
import { useRef, useState } from "react"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"

export function GlobalDrawer() {
  const { isOpen, type, closeDrawer } = useDrawer()
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const isPartnership = type === "partnership"

  const title = isPartnership ? "Request Media Kit" : "Join The Roster"
  const description = isPartnership
    ? "Fill out your details and we'll send over our partnership opportunities."
    : "Tell us about yourself and how you want to contribute to True Sports."

  const handleSubmit = async (formData: FormData) => {
    setStatus("loading")
    formData.append("interest", isPartnership ? "Partnerships & Media Kit" : "Job Application")

    const result = await submitDynamicForm(formData)

    if (result.success) {
      setStatus("success")
      setTimeout(() => {
        closeDrawer()
        setStatus("idle")
        formRef.current?.reset()
      }, 2000)
    } else {
      setStatus("error")
    }
  }

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) closeDrawer()
      }}
      swipeDirection="down"
    >
      <DrawerContent className="mx-auto w-full max-w-2xl rounded-t-3xl border border-white/10 bg-zinc-950 p-6 sm:p-10">
        <DrawerHeader className="p-0 text-left">
          <DrawerTitle className="font-display text-3xl font-black uppercase text-white">
            {title}
          </DrawerTitle>
          <DrawerDescription className="mt-2 text-zinc-400">
            {description}
          </DrawerDescription>
        </DrawerHeader>

        {status === "success" ? (
          <div className="mt-8 rounded-lg border border-green-500/20 bg-green-500/10 p-6 text-center">
            <p className="font-bold text-green-400">
              Message sent successfully! We'll be in touch soon.
            </p>
          </div>
        ) : (
          <form
            ref={formRef}
            action={handleSubmit}
            className="mt-8 flex flex-col gap-4"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                name="name"
                required
                placeholder="Your Name"
                className="rounded-md border border-white/10 bg-zinc-900 px-4 py-3 text-white placeholder:text-zinc-500 focus:border-primary focus:outline-none"
              />
              <input
                name="email"
                type="email"
                required
                placeholder="Email Address"
                className="rounded-md border border-white/10 bg-zinc-900 px-4 py-3 text-white placeholder:text-zinc-500 focus:border-primary focus:outline-none"
              />
            </div>

            {isPartnership && (
              <input
                name="company"
                required
                placeholder="Company / Agency Name"
                className="rounded-md border border-white/10 bg-zinc-900 px-4 py-3 text-white placeholder:text-zinc-500 focus:border-primary focus:outline-none"
              />
            )}

            <textarea
              name="message"
              required
              rows={4}
              placeholder={
                isPartnership
                  ? "Tell us about your brand..."
                  : "Link to your portfolio / Tell us about your skills..."
              }
              className="resize-none rounded-md border border-white/10 bg-zinc-900 px-4 py-3 text-white placeholder:text-zinc-500 focus:border-primary focus:outline-none"
            />

            {status === "error" && (
              <p className="text-sm text-red-500">
                Something went wrong. Please try again.
              </p>
            )}

            <DrawerFooter className="mt-2 p-0">
              <button
                type="submit"
                disabled={status === "loading"}
                className="flex w-full justify-center rounded-sm bg-white px-6 py-4 font-display text-sm font-bold uppercase tracking-widest text-black transition-colors hover:bg-zinc-200 disabled:opacity-50"
              >
                {status === "loading" ? "Sending..." : "Submit"}
              </button>
              <DrawerClose render={<Button variant="outline" />}>
                Cancel
              </DrawerClose>
            </DrawerFooter>
          </form>
        )}
      </DrawerContent>
    </Drawer>
  )
}