"use client";

import { useEffect, useRef } from "react";
// import { Button } from "@/components/ui/button"

import { SectionHeader } from "../ui/section-header";
import ContactForm from "./ContactForm";
import Image from "next/image";

export function Contact() {
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const loadGsap = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (ref.current) {
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 85%",
            },
          }
        );
      }
    };
    loadGsap();
  }, []);

  return (
    <section
      id="contact"
      className="py-20 md:py-28  bg-[ #F7F7F7E5]  md:bg-white  md:relative md:flex justify-center">
      <div className="container mx-auto px-4 md:px-0 md:p-0 md:absolute  bg-white/80  md:-top-104 rounded-md p-8 md:max-w-3xl  z-10">
        <div className="md:relative overflow-clip md:rounded-2xl md: pb-8 px-8 md:px-0">
          <div className="absolute inset-0 -z-10 hidden md:block">
            {/* Image */}
            <Image
              src="/homepage/bg.png"
              alt="bg"
              fill
              priority
              className="object-cover object-top"
            />

            {/* Whitish overlay */}
            <div className="absolute inset-0 bg-white/70" />
          </div>

          <SectionHeader
            label="Get in Touch"
            title="Let's Start the Conversation"
            description="Whether you need legal advice, consultation, or representation, we’re here to
help you every step of the way."
            className="mb-12 "
            titleStylesOveride="font-montserrat font-semibold md:text-2xl! md: py-5"
          />

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
