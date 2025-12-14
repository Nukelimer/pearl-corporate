"use client"

import { useEffect, useRef } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { SectionHeader } from "../ui/section-header"
import { Send } from "lucide-react"

export function Newsletter() {
  const ref = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const loadGsap = async () => {
      const gsap = (await import("gsap")).default
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      if (ref.current) {
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 90%",
            },
          },
        )
      }
    }
    loadGsap()
  }, [])

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Subscribe to Newsletter"
          description="Stay updated with the latest legal insights and news from PearLaw Corporate."
          className="mb-8"
          dark
        />

        <form ref={ref} className="max-w-md mx-auto flex gap-2 flex-col">
          <Input
            type="email"
            placeholder="Enter your email"
            className="bg-white/10 border-white/20 text-white py-8 placeholder:text-white/60"
          />
          <Button size="lg" className="bg-accent hover:bg-accent/90 py-8 mt-2 text-white">
          Subscribe
          </Button>
        </form>
      </div>
    </section>
  )
}
