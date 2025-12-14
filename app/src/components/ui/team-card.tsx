"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/app/lib/utils";

interface TeamCardProps {
  name: string;
  role: string;
  image: string;
  className?: string;
  index?: number;
}

export function TeamCard({
  name,
  role,
  image,
  className,
  index = 0,
}: TeamCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGsap = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (ref.current) {
        gsap.fromTo(
          ref.current,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: index * 0.15,
            ease: "back.out(1.2)",
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
    <div
      ref={ref}
      className={cn(
        "text-center bg-[#F9F9F9] pb-14 m-16 rounded-md group mt-4",
        className
      )}>
      <div className="relative w-full flex flex-col items-center mx-auto mb-4 rounded-md group-hover:border-accent transition-colors duration-300 ">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          width={100}
          height={100}
          className="object-cover size-full max-h-[800px] rounded-t-md w-full"
        />
      </div>
      <h3 className="text-2xl font-semibold text-primary">{name}</h3>
      <p className="text-sm text-accent uppercase mt-2">{role}</p>
    </div>
  );
}
