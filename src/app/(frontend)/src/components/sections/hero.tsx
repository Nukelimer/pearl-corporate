"use client";

import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { ArrowRight, Play } from "lucide-react";
import Link from "next/link";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);

 useEffect(() => {
   const loadGsap = async () => {
     const gsap = (await import("gsap")).default;

     const ctx = gsap.context(() => {
       const tl = gsap.timeline();

       tl.fromTo(
         ".hero-badge",
         { opacity: 0, y: 20 },
         { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
       )
         .fromTo(
           ".hero-title",
           { opacity: 0, y: 30 },
           { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
           "-=0.3"
         )
         .fromTo(
           ".hero-description",
           { opacity: 0, y: 20 },
           { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
           "-=0.4"
         )
         .fromTo(
           ".hero-buttons",
           { opacity: 0, y: 20 },
           { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
           "-=0.3"
         );
     }, ref);

     return () => ctx.revert();
   };

   loadGsap();
 }, []);

  return (
    <section
      ref={ref}
      className="relative md:min-h-screen pt-32 md:pt-12  flex items-center justify-center bg-linear-to-b from-secondary to-background mb-6 md:mb-0">
      <img
        src="/homepage/hero .jpg"
        alt="hero img"
        className="absolute brightness-32 top-0 h-[500px] object-fill md:size-full md:object-cover object-center"
      />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="hero-badge inline-block text-sm font-semibold text-white uppercase tracking-wider px-4 py-2  mb-6 md:text-2xl ">
            Welcome to
          </span>

          <h1 className="font-montserrat hero-title text-white text-4xl md:text-5xl lg:text-6xl font-bold  mb-6 text-balance">
            <span className=" text-center my-1 flex justify-center">
              {" "}
              PEARLAW
            </span>

            <span className="">CORPORATE</span>
          </h1>

          <p className=" hero-description text-base md:text- text-white mb-8 max-w-xl mx-auto leading-relaxed">
            We provide expert legal solutions for businesses and individuals.
            Exerience. Trust. Results.
          </p>

          <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center">

            <Link href={"/contact-us"}>
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 w-fit mx-auto text-white gap-2 cursor-pointer">
              Book now
              <ArrowRight className="w-4 h-4" />
            </Button>
            
            
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
