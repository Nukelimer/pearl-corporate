"use client"

import { useEffect, useRef, useState } from "react"

interface AnimatedCounterProps {
  end: number
  suffix?: string
  duration?: number
  className?: string
}

export function AnimatedCounter({ end, suffix = "", duration = 2, className }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const loadGsap = async () => {
      const gsap = (await import("gsap")).default
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      if (ref.current && !hasAnimated.current) {
        ScrollTrigger.create({
          trigger: ref.current,
          start: "top 85%",
          onEnter: () => {
            if (!hasAnimated.current) {
              hasAnimated.current = true
              const obj = { value: 0 }
              gsap.to(obj, {
                value: end,
                duration: duration,
                ease: "power2.out",
                onUpdate: () => setCount(Math.round(obj.value)),
              })
            }
          },
        })
      }
    }
    loadGsap()
  }, [end, duration])

  return (
    <span ref={ref} className={className}>
      {count}
      {suffix}
    </span>
  )
}
