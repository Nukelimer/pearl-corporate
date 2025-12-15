"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/app/lib/utils";
import { CheckCircle } from "lucide-react";
import StraightVerticalLine from "../sections/StraightVerticalLine";
import StraightHorizontalLine from "../sections/StraightHorizontalLine";
import { AboutCard } from "../about/AboutCard";

interface SectionHeaderProps {
  isLabelAvl?: boolean | string;
  isDescription?: boolean;
  isVericalLine?: boolean | string;
  labelStyles?: string;
  label?: string;
  title: string;
  titleStylesOveride?: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
  dark?: boolean;
  descriptionStyles?: string;
}

export function Quote({
  description,
  className,
  isVericalLine,
  descriptionStyles,
  align = "center",
  dark = false,
}: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGsap = async () => {
      const gsap = (await import("gsap")).default;
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (ref.current) {
        gsap.fromTo(
          ref.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
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
    <div
      ref={ref}
      className={cn(
        "space-y-3",
        align === "center" && "text-center",
        className
      )}>
      {isVericalLine && (
        <div className={cn("text-white py-6", isVericalLine)}>
          {/* <StraightVerticalLine /> */}
        </div>
      )}

      {true && (
        <div>
          <h4 className="text-black/40 uppercase font-semibold ">about Pearlaw</h4>
          <h4 className="font-bold text-xl pt-2">Our Gorgeous History</h4>
         
        </div>
      )}
      {description && (
        <p
          className={cn(
            "text-[1.1rem] md:text-base max-w-2xl leading-relaxed",
            align === "center" && "mx-auto",
            dark ? "text-gray-300" : "text-muted-foreground",
            descriptionStyles
          )}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
      {/* 
      {isDescription && <div className="bg-gray-200 mt-8 h-px"></div>} */}
    </div>
  );
}
