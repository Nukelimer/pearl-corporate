"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/app/lib/utils";
import { ArrowRight, CheckCircle, Facebook, Instagram } from "lucide-react";
import { Button } from "../ui/button";
import { FaTiktok } from "react-icons/fa";

interface SectionHeaderProps {
  isLabelAvl?: boolean | string;
  isDescription?: boolean;
  isVericalLine?: boolean;
  isHorizonatalLine?: string;
  labelStyles?: string;
  label?: string;
  title: string;
  titleStylesOveride?: string;
  className?: string;
  align?: "left" | "center";
  dark?: boolean;
  wrapperFixStyles?: string;
  v2?: boolean;
  button?: string;
  buttonStyles?: string;
  sec_button?: string;
  sec_buttonStyles?: string;
}

export function LetDiscuss({
  label,
  isLabelAvl,
  title,
  titleStylesOveride,
  className,
  labelStyles,
  sec_button,
  sec_buttonStyles,
  button,
  buttonStyles,
  wrapperFixStyles,
  v2,

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

  return wrapperFixStyles ? (
    <div
      ref={ref}
      className={cn(
        "space-y-3 bg",
        align === "center" && "text-center",
        className
      )}>
      <div className={cn(wrapperFixStyles)}>
        {label &&
          (isLabelAvl == "none" ? (
            ""
          ) : isLabelAvl === false ? (
            <span
              className={cn(
                " text-sm flex item-center font-semibold  justify-center w-fit mx-auto mb-6  gap-x-2 uppercase tracking-wider px-3 py-2 ",

                dark
                  ? "bg-accent/0 text-gray-600 "
                  : "bg-accent/0 text-gray-600",
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

        {title && (
          <h2
            className={cn(
              "text-3xl px-16 md:px-0 md:text-4xl lg:text-5xl font-bold font-serif text-balance mb-6",
              dark ? "text-white" : "text-primary",
              titleStylesOveride
            )}>
            {title}
          </h2>
        )}

        <div className="">
          {button && (
            <Button className={buttonStyles} size={"lg"}>
              {button} <ArrowRight />
            </Button>
          )}
          {sec_button && (
            <Button className={sec_buttonStyles} size={"lg"}>
              {sec_button} <ArrowRight />
            </Button>
          )}
        </div>

        {v2 && <LetDiscussV2 />}
      </div>
    </div>
  ) : (
    <div
      ref={ref}
      className={cn(
        "space-y-3 bg",
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

      {title && (
        <h2
          className={cn(
            "text-3xl px-16 md:px-0 md:text-4xl lg:text-5xl font-bold font-serif text-balance mb-6",
            dark ? "text-white" : "text-primary",
            titleStylesOveride
          )}>
          {title}
        </h2>
      )}

      <div className="group-hover:cursor-pointer">
        {button && (
          <Button className={cn(buttonStyles, "cursor-pointer")} size={"lg"}>
            {button} <ArrowRight />
          </Button>
        )}
        {sec_button && (
          <Button className={cn(sec_buttonStyles, "cursor-pointer")} size={"lg"}>
            {sec_button} <ArrowRight />
          </Button>
        )}
      </div>

      {v2 && <LetDiscussV2 />}
    </div>
  );
}

function LetDiscussV2() {
  return (
    <div className="flex flex-col items-center gap-4 max-w-md mx-auto pb-6">
      <div className="flex gap-4">
        <Button
          size="lg"
          className="bg-transparent border text-accent cursor-pointer ">
          <Facebook /> Facebook
        </Button>
        <Button
          size="lg"
          className="bg-transparent border text-accent cursor-pointer">
          <Instagram /> Instagram
        </Button>
      </div>
      <Button
        size="lg"
        className="bg-transparent border text-accent cursor-pointer">
        <FaTiktok /> TikTok
      </Button>
    </div>
  );
}
