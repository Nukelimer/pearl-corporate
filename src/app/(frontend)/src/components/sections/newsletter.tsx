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
    <section className="py-20 md:py-28 md:pt-6 font-montserrat">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="Subscribe to Newsletter"
          description="Stay updated with the latest legal insights and news from PearLaw Corporate."
          className="mb-8"
          descriptionStyles="md:hidden"
          titleStylesOveride=" font-montserrat font-medium md:text-xl!"
          dark
        />

        <form
          ref={ref}
          className="max-w-md mx-auto flex gap-2 flex-col md:flex-row md:gap-0 md:h-12">
          <Input
            type="email"
            placeholder="Your email adddress"
            className="bg-white/10 border-white/20 text-white py-8 placeholder:text-white/60 md:py-4 md:bg-white/40 md:rounded-r-none md:border-none md:rounded-l-xs! md:h-full"
          />
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 py-8 mt-2 text-white md:mt-0 md:rounded-r-xs! md:rounded-l-none! md:py-1 md:h-full">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}
