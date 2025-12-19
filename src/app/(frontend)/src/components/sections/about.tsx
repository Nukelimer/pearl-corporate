"use client"

import { useEffect, useRef } from "react"
import { SectionHeader } from "../ui/section-header"
import { Button } from "../ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
export function About() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const loadGsap = async () => {
      const gsap = (await import("gsap")).default
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      gsap.registerPlugin(ScrollTrigger)

      if (ref.current) {
      

        gsap.fromTo(
          ".about-content",
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 80%",
            },
          },
        )
      }
    }
    loadGsap()
  }, [])

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 md:py-14 md:pb-0 bg-background">
      <div className="container mx-auto px-4">
        <div className="about-content space-y-6">
          <SectionHeader
            label="Trusted Legal Partner"
            title="Your Partner in Corporate Business Sucess"
            description="Navigate complex corporate landscapes with confidence. Our boutique law firm delivers strategic legal solutions tailored to your business needs, combining seasoned expertise with innovative thinking."
            labelStyles="md:px-6 md:text-xs"
            align="center"
            isLabelAvl={true}
            titleStylesOveride="font-montserrat font-medium md:text-2xl! md:font-semibold px-0"
            className="md:max-w-lg mx-auto "
            descriptionStyles="md:text-sm"
          />

          <div className=" flex gap-4 justify-center md:relative flex-col sm:flex-row ">
            <div className="hidden md:flex h-px bg-black/10 w-full absolute"></div>

            <Link href={"/contact-us"} className="cursor-pointer">
              <Button
                size={"lg"}
                className="bg-linear-to-r from-accent from-60% to-orange-900 py-6! md:mt-6! ">
                Book Consultation <ArrowRight />
              </Button>
            </Link>

            <Link href={"/about"} className="
            cursor-pointer">
              <Button className="bg-linear-to-r text-black from-neutral-300 from-60% md:mt-6! to-white/95 py-6! cursor-pointer ">
                Explore Services
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
