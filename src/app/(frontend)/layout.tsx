import type React from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Toaster } from "./src/components/ui/toaster";
import { Footer } from "./src/components/sections/footer";
import { Header } from "./src/components/sections/header";
import { montserrat } from "./fonts/fonts";
import { blogThemeScript } from "./src/components/blog/blog-theme";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "PearLaw Corporate | Your Partner in Corporate Business Solutions",
  description:
    "Expert legal services for corporate and commercial law, tech law, sports & media law, and more.",
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: blogThemeScript sets class and style on <html>
    // before React hydrates, on /blog routes only.
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: blogThemeScript }} />
      </head>
      <body
        className={`${inter.variable} ${montserrat.variable}  font-sans antialiased`}>
        <Header />
        <Toaster />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
