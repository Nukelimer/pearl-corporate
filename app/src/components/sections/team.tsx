"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { SectionHeader } from "../ui/section-header";
import { TeamCard } from "../ui/team-card";
import StraightVerticalLine from "./StraightVerticalLine";
import Image from "next/image";

type TeamMember = {
  name: string;
  role: string;
  image: string;
};

export function Team({
  team,
  showURL,
}: {
  team: TeamMember[];
  showURL: boolean;
}) {
  return (
    <section id="team" className="py-20 md:py-0 ">
      <div className="container md:max-w-full mx-auto px-4 md:relative ">
        <Image
          src="/homepage/law_court.jpg"
          alt="bg"
          fill
          priority
          className="object-cover -z-10 hidden md:flex object-top absolute top-0"
        />
        <SectionHeader
          label="Our Experts"
          title="Our Legal Team"
          titleStylesOveride="md:pt-12 font-montserrat md:font-medium md:text-white "
        />

        {showURL && (
          <Button
            className="uppercase text-gray-400 text-center flex items-center justify-center w-full mb-7 md:text-accent"
            variant="ghost">
            View all people <ArrowRight color="#ff4433" />
          </Button>
        )}

        <StraightVerticalLine className="md:h-7 md:py-0 md:my-0  md:w-0.5" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl md:max-w-full">
          {team.map((member, index) => (
            <TeamCard
              key={member.name}
              name={member.name}
              role={member.role}
              image={member.image}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
