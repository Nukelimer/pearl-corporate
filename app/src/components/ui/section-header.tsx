"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/app/lib/utils";
import { CheckCircle } from "lucide-react";
import StraightVerticalLine from "../sections/StraightVerticalLine";
import StraightHorizontalLine from "../sections/StraightHorizontalLine";

interface SectionHeaderProps {
  isLabelAvl?: boolean | string;
  isDescription?: boolean;
  isVericalLine?: boolean;
  isHorizonatalLine?: string;
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

export function SectionHeader({
  label,
  isLabelAvl,
  isDescription,
  title,
  description,
  titleStylesOveride,
  className,
  labelStyles,
  isVericalLine,
  isHorizonatalLine,
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
      {label &&
        (isLabelAvl == "none" ? (
          ""
        ) : isLabelAvl === false ? (
          <span
            className={cn(
              " text-sm flex item-center font-semibold  justify-center w-fit mx-auto mb-6  gap-x-2 uppercase tracking-wider px-3 py-2 ",

              dark ? "bg-accent/0 text-gray-600 " : "bg-accent/0 text-gray-600",
              labelStyles
            )}>
            {label}
          </span>
        ) : isLabelAvl === true ? (
          <span
            className={cn(
              " text-sm flex item-center   justify-center w-fit mx-auto mb-6  gap-x-2  capitalize tracking-wider px-3 py-2 rounded-full",

              dark ? "bg-accent/20 text-accent" : "bg-accent/10 text-accent",
              labelStyles
            )}>
            <CheckCircle size={14} className="my-auto" />
            {label}
          </span>
        ) : null)}

      {}
      <h2
        className={cn(
          "text-3xl px-16 md:px-0 md:text-4xl font-bold text-balance mb-6",
          dark ? "text-white" : "text-primary",
          titleStylesOveride
        )}>
        {title}
      </h2>

      {isHorizonatalLine && (
        <StraightHorizontalLine styles={isHorizonatalLine} />
      )}

      {isVericalLine && (
        <div className="text-white py-6">
          <StraightVerticalLine />
        </div>
      )}

      {description && (
        <div
          className={cn(
            "text-[1.1rem] frkfr md:text-base max-w-2xl leading-relaxed",
            align === "center" && "mx-auto",
            dark ? "text-gray-300" : "text-muted-foreground ",
             descriptionStyles
          )}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}

      {isDescription && <div className="bg-gray-200 mt-8 h-px"></div>}
    </div>
  );
}
