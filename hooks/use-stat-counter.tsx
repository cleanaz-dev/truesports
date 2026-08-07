"use client"

import { useEffect, useRef } from "react"
import { useInView, useMotionValue, useSpring } from "framer-motion"

export function StatCounter({ 
  value, 
  decimals = 0, 
  suffix = "" 
}: { 
  value: number
  decimals?: number
  suffix?: string 
}) {
  const ref = useRef<HTMLSpanElement>(null)
  
  // Triggers the animation only when the element comes into view
  const inView = useInView(ref, { once: true, margin: "-50px" })
  
  const motionValue = useMotionValue(0)
  // Controls the speed and smoothness of the count up (duration in milliseconds)
  const springValue = useSpring(motionValue, { duration: 3000, bounce: 0 })

  useEffect(() => {
    if (inView) {
      motionValue.set(value)
    }
  }, [inView, motionValue, value])

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }).format(latest) + suffix
      }
    })
  }, [springValue, decimals, suffix])

  return <span ref={ref}>0{suffix}</span>
}