"use client";
import { DreamTeamCard } from "../src/components/dream-team/DT_Card";
import LawyersBio from "../src/components/dream-team/LawyersBio";
import { Team } from "../src/components/sections/team";
import { SpecialisedAreas } from "../src/components/experience/SpecialisedArea";
import {
        BadgeCheck,
  BriefcaseBusiness,
  Eye,
  FileCheck,
  Home,
  Rocket,
  Scale,
  Shield,
} from "lucide-react";
import { DT_SectionHeader } from "../src/components/dream-team/DT_SectionHeader";
import { LetDiscuss } from "../src/components/reusable/LetDiscuss";

function page() {
  const lawyersData = [
    {
      name: "Pearl Eghimentor",
      role: "Team Lead",
      credentials: "LLB, BL, Member Nigerian Bar Association",
      education: "University of Lagos, Nigerian Law School",
      specialities: "Corporate Law, Contract Negotiation, Litigation",
      about:
        "With over 15 years of experience in corporate law and litigation, Pearl leads our team with unwavering dedication to client success. Her strategic approach and attention to detail have earned her recognition as one of the top legal minds in the region.",
      imgUrl: "/dream-team/avatar.jpg",
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
  ];

  const practiceAreas = [
    {
      icon: BriefcaseBusiness,
      title: "Corporate & Commercial",
      description:
        "End-to-end corporate structuring, M&A transactions, commercial contracts and jointventures tailored to your business objectives.",
      learnMoreUrl: "#",
    },
    {
      icon: Scale,
      title: "Tech Law",
      description:
        "Navigate the digital landscape with expertise in data privacy, IP protection, software licensing, and technology transactions.",
      learnMoreUrl: "#",
    },
    {
      icon: Rocket,
      title: "STARTUPS & MSME LAW",
      description:
        "Comprehensive legal support for startups and MSME’s including incorporation, funding rounds, term sheets, and growth strategies.",
      learnMoreUrl: "#",
    },
    {
      icon: FileCheck,
      title: "COMPANY GOVERNANCE",
      description:
        "Ensure compliance with corporate governance standards, board processes, statutory fillings and regulatory requirements.",
      learnMoreUrl: "#",
    },
    {
      icon: Shield,
      title: "Regulatory Compliance",
      description:
        "Stay ahead of regulatory changes with our proactive compliance advisory across multiple sectors and jurisdictions.",
      learnMoreUrl: "#",
    },
    {
      icon: Home,
      title: "Real Estate Law",
      description:
        "Complete real estate solutions covering property transactions, due diligence, leasing, and title verification.",
      learnMoreUrl: "#",
    },
  ];

  return (
    <section className="pt-32">
      <DreamTeamCard
        label="meet the team"
        isLabelAvl={false}
        title=""
        description="Dedicated to excellence and client sucess, our experienced team brings decades of legal expertise to every case we handle."
        descriptionStyles="text-black text-sm px-8 mb-16"
      />

      <div className="">
        {lawyersData.map(
          ({
            about,
            credentials,
            education,
            name,
            role,
            specialities,
            imgUrl,
          }) => {
            return (
              <LawyersBio
                key="d"
                imgUrl={imgUrl}
                about={about}
                credentials={credentials}
                education={education}
                name={name}
                role={role}
                specialities={specialities}
              />
            );
          }
        )}
      </div>

      <Team team={team} showURL={false} />

      <SpecialisedAreas
        practiceAreas={practiceAreas}
        title="We deliver focused, practical legal solutions across key areas that matter most to Nigerian businesses."
        label="Our Practice Areas"
        stylesOveride="text-md font-semibold"
      />

      <div className=" bg-[#DADADA33] pt-8">
        <DT_SectionHeader
          isLabelAvl={false}
          label="Why our Expertise Matters"
          labelStyles=""
          title="In today’s fast-paced business environment, having the right legal partner is critical to your success. Here’s how our expertise makes a difference:"
          titleStylesOveride="text-md px-12"
        />
      </div>
      <div className="flex flex-col gap-8">
        <DT_SectionHeader
          isLabelAvl={false}
          icon={BadgeCheck}
          iconStyles=" mx-auto  w-12 h-12 bg-white text-accent rounded-full  p-3"
          title=""
          label="Strategic Business Growth"
          labelStyles="text-white pt- mt-6"
          paragraph="Our expertise empowers your business with the legal clarity and protection needed to pursue aggressive growth strategies, enter new markets, and seize opportunities with confidence. "
          paragraphStyles="text-white text-sm  px-12 max-w-md mx-auto pt-6 pb-12"
          imgStyles="w-full brightness-25 greyscale absolute h-full"
          imgUrl="/about/house.jpg"
          className="relative "
        />

        <DT_SectionHeader
          isLabelAvl={false}
          icon={BadgeCheck}
          iconStyles=" mx-auto  w-12 h-12 bg-white text-accent rounded-full  p-3"
          title=""
          label="Risk Mitigation & Compliance"
          labelStyles="text-white pt- mt-6"
          paragraph="We help you navigate Nigeria’s regulatory environment, identifying potential legal risks before they become problems and ensuring your operations remain compliant and protected. "
          paragraphStyles="text-white text-sm  px-12 max-w-md mx-auto pt-6 pb-12"
          imgStyles="w-full brightness-25 greyscale absolute h-full"
          imgUrl="/about/house.jpg"
          className="relative "
        />

        <DT_SectionHeader
          isLabelAvl={false}
          icon={BadgeCheck}
          iconStyles=" mx-auto  w-12 h-12 bg-white text-accent rounded-full  p-3"
          title=""
          label="Tailored Solutions for Nigerian Context"
          labelStyles="text-white pt- mt-6"
          paragraph="Our deep understanding of local business practices, cultural nuances, and regulatory frameworks ensures legal strategies that are not just compliant, but practically effective in the Nigerian market. "
          paragraphStyles="text-white text-sm  px-12 max-w-md mx-auto pt-6 pb-12"
          imgStyles="w-full brightness-25 greyscale absolute h-full"
          imgUrl="/about/house.jpg"
          className="relative "
        />
      </div>

      <div className="">
        <LetDiscuss
          className="bg-linear-to-l to-[#2B2B2B] from-0% from-[#1E223F] to-60%"
          title="Whether you’re looking for ongoing legal support through our retainership plans or need a guidance on a specific matter, we’re here to help."
          label="Ready to get started? "
          isLabelAvl={false}
          button="Book consultation"
          buttonStyles="w-[90%] bg-accent mb-4"
          sec_button="Retainership Plan"
                                  sec_buttonStyles="w-[90%]  bg-transparent  border-2 mb-12"
                                  labelStyles="text-white/30"

                                  titleStylesOveride="text-white text-xl px-4"
        />
      </div>
    </section>
  );
}

export default page;
