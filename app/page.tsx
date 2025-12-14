// import { Header } from "@/components/sections/header"
// import { Hero } from "@/components/sections/hero"
// import { About } from "@/components/sections/about"
// import { PracticeAreas } from "@/components/sections/practice-areas"
// import { Stats } from "@/components/sections/stats"
// import { Contact } from "@/components/sections/contact"
// import { Team } from "@/components/sections/team"
// import { Services } from "@/components/sections/services"
// import { Testimonials } from "@/components/sections/testimonials"
// import { CTA } from "@/components/sections/cta"
// import { Newsletter } from "@/components/sections/newsletter"
// import { Footer } from "@/components/sections/footer"

import { About } from "./src/components/sections/about";
import TestimonialsCarousel from "./src/components/sections/Carousel";
import HeroTestimonials from "./src/components/sections/Carousel";
import { Contact } from "./src/components/sections/contact";
import { CTA } from "./src/components/sections/cta";
import { Footer } from "./src/components/sections/footer";
import { Header } from "./src/components/sections/header";
import { Hero } from "./src/components/sections/hero";
import { Newsletter } from "./src/components/sections/newsletter";
import { PracticeAreas } from "./src/components/sections/practice-areas";
import { Services } from "./src/components/sections/services";
import { Stats } from "./src/components/sections/stats";
import { Team } from "./src/components/sections/team";

export default function Home() {
  const myTestimonials = [
    {
      name: "Timi Okunlola",
      role: "CEO, TechStart Inc.",
      image: "/african-businessman-portrait.png",
      content:
        "Pearlaw’s expertise in tech law helped us navigate complex regulatory requirements as we scaled. Their practical advice was invaluable. The firm handled my case with exceptional professionalism and clarity. I felt supported at every stage..",
      rating: 5,
    },
    {
      name: "Sarah Chen",
      role: "Founder, Nova Digital",
      image: "/professional-asian-woman.png",
      content: "They turned complex legal challenges into simple solutions.",
      rating: 5,
    },
  ];

  const team = [
    {
      name: "Adbayo Johnson",
      role: "Senior Partner",
      image: "/professional-african-lawyer-man-in-suit-portrait.jpg",
    },
    {
      name: "Sarah Williams",
      role: "Corporate Attorney",
      image: "/professional-woman-lawyer-in-business-attire-portr.jpg",
    },
  ]
  return (
    <main className="min-h-screen overflow-clip">
    
      <Hero />
      <About />
      <PracticeAreas />
      <Stats />
      <Contact />
      <Team team={team} showURL/>
      <Services />
      <TestimonialsCarousel
        testimonials={myTestimonials}
        autoPlayDelay={7000}
      />
    
      <CTA />

   
    </main>
  );
}
