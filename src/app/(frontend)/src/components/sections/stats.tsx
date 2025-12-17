"use client";

import { useEffect, useRef } from "react";
import { AnimatedCounter } from "../ui/animated-counter";
import { SectionHeader } from "../ui/section-header";

const stats = [
  { value: 500, suffix: "+", label: "Clients Served" },
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 98, suffix: "%", label: "Success Rate" },
];

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGsap = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (ref.current) {
        gsap.fromTo(
          ".stat-card",
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.15,
            ease: "back.out(1.2)",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 80%",
            },
          }
        );
      }
    };
    loadGsap();
  }, []);

  return (
    <section className=" md:py-0 border relative">
      <img
        src="/homepage/law_court.jpg"
        alt="law court"
        className="absolute size-full brightness-20 md:brightness-50 -z-10"
      />

      <div className="container mx-auto px-4 py-20  md:pt-7 md:mt-7 md:pb-96 md:mb-10 md:rounded-b-4xl border md:max-w-[95%]">
        <SectionHeader
          label="WHAT WE ARE EXPERT AT"
          isLabelAvl={false}
          labelStyles="text-accent text-xl md:text-sm"
          title="Why Clients Choose Us?"
          titleStylesOveride="font-montserrat md:text-3xl! font-medium md:my-0 md:max-w-full  "
          description="<div class='md:flex justify-between md:w-full md:gap-8 md:text-start'>

<div >
        Our firm is built on a foundation of trust, dedication, and exceptional
        service. For years, we have guided clients through complex legal matters
        with clarity and confidence. Every case we handle is approached with
        care, precision, and a deep commitment to achieving the best possible
        outcome.
      </div>

          <br/>
            <br/> 
             <br/>
<div className=''>

With extensive experience across diverse legal fields, we provide clients with strategic advice and reliable representation. Our focus is on delivering practical solutions, protecting our clients’ interests, and ensuring they are supported every step of the way.
</div>
</div>"
          className="mb-12 md:w-full "
          descriptionStyles="md:max-w-full md:mx-12 "
          isVericalLine={true}
          dark
        />

        <div ref={ref} className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="stat-card   px-8 py-4  text-center ">
              <div className="text-6xl md:text-7xl font-bold text-white mb-2">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-accent text-xl pt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
