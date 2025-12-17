"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { cn } from "@/src/app/(frontend)/lib/utils";
import quote from "../../../../../../public/homepage/image.png";
interface TestimonialCardProps {
  name: string;
  role: string;
  image: string;
  content: string;
  rating?: number;
  className?: string;
  index?: number;
}

export function TestimonialCard({
  name,
  role,
  image,
  content,
  rating = 5,
  className,
  index = 0,
}: TestimonialCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGsap = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (ref.current) {
        gsap.fromTo(
          ref.current,
          { opacity: 0, x: index % 2 === 0 ? -30 : 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 90%",
            },
          }
        );
      }
    };
    loadGsap();
  }, [index]);

  return (
    <div ref={ref} className={cn(" m-2  my-auto rounded-xl ", className)}>
      <div className="flex items-center gap-3 mb-4">
        <div className="relative w-12 h-12 overflow-hidden mx-auto">
          <Image
            src={quote || "/placeholder.svg"}
            alt={name}
            width={100}
            height={100}
            className="object-cover"
          />
        </div>
      </div>

      <p className="text-md text-white/80 leading-relaxed text-center mb-8">
        {content}
      </p>

      <div className="flex mx-auto justify-center items-center gap-4">
        <Image
          src="/homepage/headshot.jpg"
          alt="headshot"
          width={100}
          height={100}
          className="size-20 object-cover rounded-full"
        />
        <div>
          <h4 className="font-semibold text-white">{name}</h4>
          <p className="text-sm text-accent">{role}</p>
        </div>
      </div>
    </div>
  );
}
