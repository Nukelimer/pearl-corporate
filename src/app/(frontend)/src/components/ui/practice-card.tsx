"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/src/app/(frontend)/lib/utils";
import { ArrowRight, type LucideIcon } from "lucide-react";
import Link from "next/link";

interface PracticeCardProps {
  icon: LucideIcon;
  title: string;
  learnMoreUrl?: string;
  description: string;
  className?: string;
  index?: number;
}

export function PracticeCard({
  icon: Icon,
  title,
  description,
  className,
  learnMoreUrl,
  index = 0,
}: PracticeCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  console.log(learnMoreUrl);

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
            duration: 0.6,
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
    <div
      ref={ref}
      className={cn(
        " p-6 rounded-xl shad ow-sm flex flex-col  justify-center items-center  hover:shad ow-md transition-shad ow duration-300 group",
        className
      )}>
      <div className="w-12 h-12  rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
        <Icon className="w-10 h-10 text-accent" />
      </div>
      <h3 className="text-lg font-semibold text-primary uppercase mb-2">
        {title}
      </h3>
      <p className="text-sm text-center text-muted-foreground leading-relaxed">
        {description}
      </p>
      {learnMoreUrl && (
        <Link
          href={learnMoreUrl}
          className="text-accent flex items-center gap-2 text-xs pt-4">
          Learn More <ArrowRight size={14} />{" "}
        </Link>
      )}
    </div>
  );
}
