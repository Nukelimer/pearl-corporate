import Link from "next/link";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Image from "next/image";

const quickLinks = [
  { name: "About Us", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Careers", href: "#careers" },
  { name: "Blog", href: "#blog" },
  { name: "Privacy Policy", href: "#privacy-policy" },
  { name: "Terms  of Service", href: "#tos" },
];

export const practiceAreas = [
  {
    url: "/corporate-securities",
    title: "Corporate & Securities",
  },
  {
    url: "/tech-law",
    title: "Tech Law",
  },
  {
    url: "/estate-law",
    title: "Estate Law",
  },
  {
    url: "/startups-msme-law",
    title: "Startups & MSME Law",
  },
  {
    url: "/company-governance",
    title: "Company Governance",
  },
  {
    url: "/regulatory-compliance",
    title: "Regulatory Compliance",
  },
];


const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  // { icon: Tiktok, href: "#", label: "TikTok" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

export function Footer() {
  return (
    <>
      <footer className="bg-[#1E223F] text-white py-12 md:hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex flex-col items-start gap-2 mb-4">
                <div className="rounded-lg flex items-center justify-center ">
                  <Image
                    src="/homepage/logo.svg"
                    alt="img"
                    width={50}
                    height={50}
                    className="invert-100 w-12  h-12"
                  />
                </div>
                <div className="flex flex-col gap-5 mt-4 text-sm">
                  <div className="flex gap-2">
                    <FaWhatsapp size={24} className="text-accent" />
                    <a
                      href="https://wa.me/2348136141666"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-inherit hover:underline">
                      +234 813 614 1666
                    </a>
                  </div>
                  <a
                    href="mailto: contact@pearlaw.com"
                    className="flex items-center gap-2 justify-center">
                    <Mail className="w-6 h-6 text-accent" />
                    contact@pearlaw.com
                  </a>
                  <div className="flex gap-2">
                    <Phone className="text-accent" />
                    <a
                      href="tel:+2348064305645"
                      className="text-inherit hover:underline">
                      +234 806 430 5645
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-white text-sm transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mt-12 mb-4">Stay Updated</h4>
              <p className="text-white/50 text-md max-w-sm">
                Subscribe to our newsletter for legal insights, industry
                updates, and firm news.
              </p>
            </div>
          </div>

          <div className="flex h-12">
            <Input
              placeholder="Email address"
              className="h-full rounded-l rounded-r-none border-r-0 border-white/40  text-white/70"
            />
            <Button className="h-full rounded-r rounded-l-none bg-accent px-12 text-white hover:bg-[#b04830]">
              Subscribe
            </Button>
          </div>

          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} PearLaw Corporate. All rights
              reserved.
            </p>
            <div className="flex justify-center mt-6 gap-3">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors"
                  aria-label={social.label}>
                  <social.icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <footer className="bg-[#1E223F] text-white py-22 md:flex hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex flex-col items-start gap-2 mb-4">
                <div className="rounded-lg flex items-center justify-center  gap-4">
                  <Image
                    width={50}
                    height={50}
                    priority
                    src="/homepage/logo.svg"
                    alt="img"
                    className="invert-100 w-12  h-12"
                  />{" "}
                  <h2 className="font-bold">Pearl Corporate</h2>
                </div>

                <div className="">
                  <p className="text-xs py-2">
                    Protecting your right with clarity, <br /> confidence, and
                    experience.
                  </p>
                </div>
                <div className="flex flex-row gap-5 mt-4 text-sm">
                  <div className="flex gap-2">
                    <FaWhatsapp
                      size={24}
                      className="text-accent px-2 h-7 w-7 bg-white/20 rounded-full"
                    />
                    <a
                      href="https://wa.me/2348136141666"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-inherit hover:underline"></a>
                  </div>
                  <a
                    href="mailto: contact@pearlaw.com"
                    className="flex items-center gap-2 justify-center">
                    <Mail className=" px-2 h-7 w-7 bg-white/20 rounded-full text-accent" />
                  </a>
                  <div className="flex gap-2">
                    <Phone className="text-accent px-2 h-7 w-7 bg-white/20 rounded-full" />
                    <a
                      href="tel:+2348064305645"
                      className="text-inherit hover:underline"></a>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-5 mt-4 text-sm">
              <h4 className="font-bold">Contact Info</h4>
              <div className="flex gap-2">
                <FaWhatsapp size={24} className="text-accent" />
                <a
                  href="https://wa.me/2348136141666"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-inherit hover:underline">
                  +234 813 614 1666
                </a>
              </div>
              <a href="mailto: contact@pearlaw.com" className="flex gap-2">
                <Mail className="w-6 h-6 text-accent" />
                contact@pearlaw.com
              </a>
              <div className="flex gap-2">
                <Phone className="text-accent" />
                <a
                  href="tel:+2348064305645"
                  className="text-inherit hover:underline">
                  +234 806 430 5645
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {practiceAreas.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.url}
                      className="text-white/70 hover:text-white text-sm transition-colors">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Practice Areas</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-white text-sm transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden">
              <h4 className="font-semibold mt-12 mb-4">Stay Updated</h4>
              <p className="text-white/50 text-md max-w-sm">
                Subscribe to our newsletter for legal insights, industry
                updates, and firm news.
              </p>
            </div>
          </div>

          <div className="w-full bg-white/10 h-px"></div>

          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-white/60 text-sm">
              {new Date().getFullYear()} PearLaw Corporate. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
