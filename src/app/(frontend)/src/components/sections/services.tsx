"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { SectionHeader } from "../ui/section-header";


export function Services() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGsap = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (ref.current) {
        gsap.fromTo(
          ".service-content",
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 80%",
            },
          }
        );

        // gsap.fromTo(
        //   ".service-image",
        //   { opacity: 0, x: 40 },
        //   {
        //     opacity: 1,
        //     x: 0,
        //     duration: 0.8,
        //     ease: "power3.out",
        //     scrollTrigger: {
        //       trigger: ref.current,
        //       start: "top 80%",
        //     },
        //   }
        // );
      }
    };
    loadGsap();
  }, []);

  return (
    <section ref={ref} className="py-20 md:py-28 bg-neutral-200 hid den ">
      <div className="container mx-auto px-4">
        <div className="items-center">
          <div className="service-content space-y-6 ">
            <SectionHeader
              label="Why Us"
              isHorizonatalLine="bg-red-400 w-12 h-1 mb-8 md:absolute md:left-26 md:top-12"
              title="We render the best service"
              description="In a remote region beyond the towering word-mountains, far removed from the realms of Vokalia and Consonantia, there resided the forgotten texts. Secluded within Bookmarksgrove, situated along the coast of the Semantics and bordered by an expansive linguistic sea, they lived in quiet isolation. A gentle river called Duden coursed through their dwelling place, carrying an enduring tranquility. Upon waking from a night of troubled dreams, Gregor Samsa found himself altered in a manner he could scarcely comprehend."
              align="left"
              titleStylesOveride="px-0 text-3xl md:text-2xl!  font-montserrat md:font-semibold md: "
              className="md:flex font-montserrat md:relative md:gap-5 md:justify-center"
              descriptionStyles=""
            />
          </div>
        </div>
      </div>
    </section>
  );
}
