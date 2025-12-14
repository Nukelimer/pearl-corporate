// app/components/TestimonialsCarousel.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { SectionHeader } from "../ui/section-header";
import { TestimonialCard } from "../ui/testimonial-card";

export type Testimonial = {
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
};

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  autoPlayDelay?: number; // ms
}

const BACKGROUND_IMAGE = "/homepage/carousel_bg.jpg";

export default function TestimonialsCarousel({
  testimonials,
  autoPlayDelay = 6000,
}: TestimonialsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const progressRefs = useRef<(HTMLSpanElement | null)[]>(
    Array(testimonials.length).fill(null)
  );

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const animateProgress = (index: number) => {
    if (tweenRef.current) tweenRef.current.kill();

    const span = progressRefs.current[index];
    if (!span) return;

    const durationSec = autoPlayDelay / 1000;
    const activeWidth = window.innerWidth < 1200 ? "10vw" : "4vw";

    const div = span.parentElement;
    if (div) gsap.set(div, { width: activeWidth, height: "8px" });

    tweenRef.current = gsap.to(span, {
      width: "100%",
      backgroundColor: "#f59e0b",
      duration: durationSec,
      ease: "none",
      onComplete: () => {
        if (div) gsap.set(div, { width: "8px", height: "8px" });
        gsap.to(span, { backgroundColor: "#94a3b8", duration: 0.3 });
      },
    });
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    // Reset all progress bars
    progressRefs.current.forEach((span) => {
      if (span) gsap.set(span, { width: "0%", backgroundColor: "#94a3b8" });
      if (span?.parentElement)
        gsap.set(span.parentElement, { width: "8px", height: "8px" });
    });

    animateProgress(currentIndex);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, autoPlayDelay);
  }, [currentIndex, testimonials.length, autoPlayDelay]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (tweenRef.current) tweenRef.current.kill();
    };
  }, []);

  return (
    <section className="relative flex flex-col justify-center overflow-hidden pb-24 h-[100vh] ">
      <div className="">
        <div className="h-24 bottom-0 absolute bg-white  w-full left-0 blur-md "></div>
        <div className="absolute  top-0 inset-0  -z-10">
          <Image
            src={BACKGROUND_IMAGE}
            alt="Background"
            fill
            priority
            className="object-cover blur-md rounded-2xl  h-screen"
          />
          {/* <div className="absolute inset-0 shadow-[0_0_120px_60px_rgba(251,146,60,0.5)] pointer-events-none" />
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" /> */}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10  container  my-auto mx-auto px-6 ">
        <SectionHeader
          label="Testimonials"
          labelStyles="text-amber-400 font-semibold tracking-wider uppercase"
          title="Words from our clients"
          titleStylesOveride="text-white text-3xl md:text-4xl pt-4 font-bold text-center leading-tight"
          isHorizonatalLine="h-14 w-px bg-amber-400 mx-auto my-12"
        />

        {/* Testimonial Carousel */}
        <div className="relative max-w-5xl mx-auto my-7">
          <div
            className="flex transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(${-100 * currentIndex}%)` }}>
            {testimonials.map((testimonial, i) => (
              <div key={i} className="min-w-full">
                <div className="flex justify-center">
                  <TestimonialCard
                    {...testimonial}
                    index={i}
                    className="max-w-2xl  rounded-3xl p-10 l"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Seek Indicators (Progress Dots) */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-20">
        <div className="flex items-center gap-4 rounded-3xl bg-white/10 backdrop-blur-lg px-8 py-3 border border-white/20">
          {testimonials.map((_, i) => {
            const isActive = i === currentIndex;

            return (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className="relative"
                aria-label={`Testimonial ${i + 1}`}>
                <div
                  className={`relative rounded-full overflow-hidden transition-all duration-500 ${
                    isActive ? "w-16 md:w-28 h-2" : "w-2 h-2"
                  }`}>
                  <div className="absolute inset-0 rounded-full bg-gray-300  group-hover:bg-amber-400 transition-colors" />

                  {/* Progress bar (only on active) */}
                  <div
                    ref={(el) => {
                      progressRefs.current[i] = el as HTMLDivElement | null;
                    }}
                    className="absolute top-0 left-0 h-full bg-amber-400 rounded-full origin-left"
                    style={{ width: isActive ? "0%" : "0%" }} // GSAP will animate this
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
