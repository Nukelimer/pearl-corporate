"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { SectionHeader } from "../ui/section-header";
import { TeamCard } from "../ui/team-card";
import StraightVerticalLine from "./StraightVerticalLine";
import Image from "next/image";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
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
      <div className=" md:max-w-full mx-auto px-4 md:relative ">
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
          titleStylesOveride="md:pt-22 md:pb-0  font-montserrat md:font-medium md:text-white md:text-white! md:text-xl"
        />

        {showURL && (
          <Link href={"/dream-team"}>
            <Button
              className="uppercase text-gray-400 text-center flex items-center justify-center w-full mb-7 md:text-accent md:w-fit md:mx-auto cursor-pointer"
              variant="ghost">
              View all people <ArrowRight color="#ff4433" />
            </Button>
          </Link>
        )}

        <StraightVerticalLine className="md:h-7 md:py-0 md:my-0  md:w-0.5" />

        <div className="mt-6 md:mt-0 md:translate-y-25">
          <Carousel
            responsive={responsive}
            className="cursor-pointer"
            keyBoardControl
            removeArrowOnDeviceType={["tablet", "mobile"]}
            swipeable
            draggable={true}
            itemClass="carousel-item-padding-40-px first:ml-0 mx-4 w-full last:mr-48 w-full">
            {team.map((member, index) => (
              <TeamCard
                key={member.name + crypto.randomUUID()}
                name={member.name}
                role={member.role}
                image={member.image}
                index={index}
                className="md:m-0! w-full md:p-0! rounded-sm  overflow-visible  first:ml-0 last:mr-24 "
              />
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
