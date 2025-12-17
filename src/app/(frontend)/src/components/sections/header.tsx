"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/src/app/(frontend)/lib/utils";
import { usePathname } from "next/navigation";
const navLinks = [
  { name: "Experience plc", href: "/experience" },
  { name: "About", href: "/about" },
  { name: "Meet the Team", href: "/dream-team" },
  { name: "Expertise", href: "/expertise" },
  { name: "Plans", href: "/plans" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact-us" },
];
// { name: "Join Us", href: "/join-our-team" }
//  { name: "Retainership", href: "/plans" },

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setScrolled(window.scrollY > 50);
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  const pathname = usePathname();

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ",
        "bg-white/95 backdrop-blur-sm shadow-sm"
      )}>
      <div className="container xl:justify-between mx-auto px-4 my-2">
        <div className="flex items-center justify-between h-16 ">
          <Link href="/" className="flex items-center gap-2">
            <div className="  flex items-center justify-center p-2 gap-5">
              <img
                src="/homepage/logo.svg"
                alt="logo"
                className="size-8 md:size-14"
              />

              <h1 className="capitalize font-medium text-sm md:text-black lg:flex hidden">
                Pearlaw Corporate
              </h1>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-nowrap ">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-xs font-medium font-montserrat transition-colors px-3 py-1",
                    isActive
                      ? "font-bold text-accent text-sm "
                      : "text-muted-foreground hover:text-primary hover:border-b-2 hover:border-b-black border-b border-transparent"
                  )}>
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <Button
            size="sm"
            className="bg-accent hidden md:flex text-light! hover:bg-accent/90 text-white font-light text-xs">
            Get In Touch
          </Button>

          <div className=" flex md:hidden items-center gap-4 text-xs">
            <Button className="bg-[#C84E26] " size={"sm"}>
              Get in touch
            </Button>
            <button
              className="md:hidden p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu">
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-border py-4">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}>
                  {link.name}
                </Link>
              ))}
              <div className="px-4 pt-4 flex flex-col gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-2 bg-transparent">
                  <Phone className="w-4 h-4" />
                  <span>Contact</span>
                </Button>
                <Button
                  size="sm"
                  className="w-full bg-accent hover:bg-accent/90 text-white">
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
