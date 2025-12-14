"use client"

import { useEffect, useRef } from "react"
import { Button } from "../ui/button"
import { Phone, Mail, MapPin, CalendarDays, Clock4 } from "lucide-react"
import { Newsletter } from "./newsletter"

export function CTA() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadGsap = async () => {
      const gsap = (await import("gsap")).default
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      if (ref.current) {
        gsap.fromTo(
          ref.current,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 85%",
            },
          },
        )
      }
    }
    loadGsap()
  }, [])

  return (
    <section className="pb-20 md:py-28 relative flex flex-col ">
      <img
        src="/homepage/carousel_bg.jpg"
        alt="image"
        className="absolute h-full  w-full brightness-60 w -40"
      />
      <div className="containe r z-10 mx-auto ">
        <div ref={ref} className=" p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl px-8 max-w-sm mx-auto md:text-3xl font-mono mb-4">
            Are you looking for someone to help?
          </h2>
          <p className="text-accent mb-8 max-w-xl mx-auto">
            Let us help you! Call Now <br />: (234)813 614 1666
          </p>

          <div className="fle x flex-col sm:flex-row gap-4 justify-center mb-8 hidden">
            <Button size="lg" variant="secondary" className="gap-2">
              <Phone className="w-4 h-4" />
              Call Us Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white/10 gap-2">
              <Mail className="w-4 h-4" />
              Send a Message
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/80">
            <span className="fl ex items-center gap-2 hidden">
              <Phone className="w-4 h-4" />
              +234 816 6667 890
            </span>
            <a
              href="mailto: contact@pearlaw.com"
              className="flex items-center gap-1 justify-center">
              <Mail className="w-6 h-6 text-accent" />
              contact@pearlaw.com
            </a>
            <span className="flex items-center gap-2">
              <Clock4 className="w-4 h-4" />
            Mon - Fri: 9:00AM - 6:00PM
            </span>
          </div>
        </div>
      </div>
            <Newsletter />
    </section>
  );
}
