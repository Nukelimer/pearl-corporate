"use client";

import { SectionHeader } from "../ui/section-header";
import { TestimonialCard } from "../ui/testimonial-card";

const testimonials = [
  {
    name: "Timi Okunlola",
    role: "CEO, TechStart Inc.",
    image: "/african-businessman-portrait.png",
    content:
      "PearLaw Corporate provided exceptional guidance during our company's expansion. Their expertise in corporate law was invaluable.",
    rating: 5,
  },
  // {
  //   name: "Amanda Foster",
  //   role: "Founder, GreenTech Solutions",
  //   image: "/professional-businesswoman-portrait.png",
  //   content:
  //     "The team's attention to detail and deep understanding of tech law helped us navigate complex regulatory challenges with ease.",
  //   rating: 5,
  // },
];

export function Testimonials() {
  return (
    <section className="py-20 md:py-28 relative ">
      <img
        src="/homepage/carousel_bg.jpg"
        alt="image"
        className="outline outline-amber-200 outline-offset-[5px] blur-md 
           drop-shadow-none ring-0 border-0 absolute h-full w-full"
      />
      <div className="container mx-auto px-4 ">
        <SectionHeader
          labelStyles="text-accent"
          label="Testimonial"
          isLabelAvl={false}
          title="Words From Clients"
          titleStylesOveride="text-white"
          isHorizonatalLine="h-12 w-px bg-accent mx-auto my-16"
          // description="Hear what our clients have to say about working with PearLaw Corporate."
          className="mb-12"
        />

        <div className="max-w-4xl mx-auto relative flex flex-col item-center justify-center h-full ">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              name={testimonial.name}
              role={testimonial.role}
              image={testimonial.image}
              content={testimonial.content}
              rating={testimonial.rating}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
