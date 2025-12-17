"use client";
import { H_R_Header } from "../src/components/reusable/H_R_Header";
import { SpecialisedAreas } from "../src/components/experience/SpecialisedArea";
import {
  BadgeCheck,
  BriefcaseBusiness,
  FileCheck,
  Home,
  Rocket,
  Scale,
  Shield,
} from "lucide-react";
import { LetDiscuss } from "../src/components/reusable/LetDiscuss";
import { DT_SectionHeader } from "../src/components/dream-team/DT_SectionHeader";
import Image from "next/image";
import StraightVerticalLine from "../src/components/sections/StraightVerticalLine";

export default function page() {
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
    <section>
      <H_R_Header
        title="Pearlaw provides focused legal solutions tailored to Nigerian businesses, combining deep industry knowledge with practical, results-driven counsel."
        isLabelAvl={false}
        label="Our Expertise"
        className="mt-18 relative"
        labelStyles="text-accent pt-16 md:text-xl"
        imgUrl="/expertise/scale.jpg"
        imgStyles="w-full h-full aspect- video object-cover absolute brightness-30 object-bottom"
        titleStylesOveride="mb-0 pb-22 text-xl text-white font-normal px-3 font-montserrat md:text-2xl! font-medium "
      />

      <div className="">
        <SpecialisedAreas
          practiceAreas={practiceAreas}
          title="We deliver focused, practical legal solutions across key areas that matter most to Nigerian businesses."
          label="Our Practice Areas"
          stylesOveride="text-md font-semibold"
        />

        <div className="relative overflow-clip md:bg-transparent py-16">
          {/* <Image
            width={500}
            height={500}
            alt="expertise"
            src={"/expertise/bg.png"}
            className="hidden md:flex w-full absolute -z-10  object-cover brightness-80 h-[700px] "
            /> */}
          <img
            alt="expertise"
            src={"/expertise/bg.png"}
            className="hidden md:flex w-full absolute -z-10  object-cover brightness-40 hh-[700px] "
          />
          <div className=" bg-[#DADADA33] md:bg-transparent pt-8 md:justify-center md:text-2xl! md:text-white!">
            <DT_SectionHeader
              isLabelAvl={false}
              label="Why our Expertise Matters"
              labelStyles="text-accent l"
              title="In today’s fast-paced business environment, having the right legal partner is critical to your success. Here’s how our expertise makes a difference:"
              titleStylesOveride="text-md px-12 md:hidden"
              description="How our experience makes a difference"
              descriptionStyles=" hidden md:flex justify-center text-3xl! mb-7 mx-auto "
            />
          </div>
          <StraightVerticalLine className="h-7 w-0.5 bg-accent" />
          <div className="flex flex-col gap-8  md:flex-row  md:border md:w-[90%] md:mx-auto rounded-bl-4xl rounded-tr-4xl">
            <DT_SectionHeader
              isLabelAvl={false}
              icon={BadgeCheck}
              iconStyles=" mx-auto  w-12 h-12 bg-white text-accent rounded-full  p-3 md:bg-accent md:text-white"
              title=""
              label="Strategic Business Growth"
              labelStyles="text-white pt- mt-6"
              paragraph="Our expertise empowers your business with the legal clarity and protection needed to pursue aggressive growth strategies, enter new markets, and seize opportunities with confidence. "
              paragraphStyles="text-white text-sm  px-12 max-w-md mx-auto pt-6 pb-12"
              imgStyles="w-full brightness-25 greyscale absolute h-full md:hidden"
              imgUrl="/about/house.jpg"
              className="relative text-white"
            />

            <DT_SectionHeader
              isLabelAvl={false}
              icon={BadgeCheck}
              iconStyles=" mx-auto  w-12 h-12 bg-white text-accent rounded-full  p-3 md:bg-accent md:text-white"
              title=""
              label="Risk Mitigation & Compliance"
              labelStyles="text-white pt- mt-6"
              paragraph="We help you navigate Nigeria’s regulatory environment, identifying potential legal risks before they become problems and ensuring your operations remain compliant and protected. "
              paragraphStyles="text-white text-sm  px-12 max-w-md mx-auto pt-6 pb-12"
              imgStyles="w-full brightness-25 greyscale absolute h-full md:hidden"
              imgUrl="/about/house.jpg"
              className="relative "
            />

            <DT_SectionHeader
              isLabelAvl={false}
              icon={BadgeCheck}
              iconStyles=" mx-auto  w-12 h-12 bg-white text-accent rounded-full  p-3 md:bg-accent md:text-white"
              title=""
              label="Tailored Solutions for Nigerian Context"
              labelStyles="text-white pt- mt-6"
              paragraph="Our deep understanding of local business practices, cultural nuances, and regulatory frameworks ensures legal strategies that are not just compliant, but practically effective in the Nigerian market. "
              paragraphStyles="text-white text-sm  px-12 max-w-md mx-auto pt-6 pb-12"
              imgStyles="w-full brightness-25 greyscale absolute h-full md:hidden"
              imgUrl="/about/house.jpg"
              className="relative "
            />
          </div>
        </div>

        <div className="mt-8">
          <LetDiscuss
            className="bg-linear-to-l to-[#2B2B2B] from-0% from-[#1E223F] to-60% md:hidden  font-montserrat!"
            title="Whether you’re looking for ongoing legal support through our retainership plans or need a guidance on a specific matter, we’re here to help."
            label="Ready to get started? "
            isLabelAvl={false}
            button="Book consultation"
            buttonStyles="w-[90%] bg-accent mb-4 cursor-pointer hover:bg-accent"
            sec_button="Retainership Plan"
            sec_buttonStyles="w-[90%]  bg-transparent  border-2 mb-12 cursor-pointer hover:bg-accent"
            labelStyles="text-white/30"
            titleStylesOveride="text-white text-xl px-4"
          />

          <LetDiscuss
            className=" font-montserrat! bg-linear-to-l to-[#2B2B2B] from-0% from-[#1E223F] to-60% md:flex flex-col hidden "
            title="Whether you’re looking for ongoing legal support through our retainership plans or need a guidance on a specific matter, we’re here to help."
            label="Ready to get started?  "
            isLabelAvl={false}
            button="Book consult"
            buttonStyles="w-[90%] bg-accent mb-4 cursor-pointer hover:bg-accent"
            sec_button="Contact us"
            sec_buttonStyles="w-[90%]  bg-transparent!  border-2 mb-12 md:mb-4 md:border-accent cursor-pointer hover:bg-accent"
            labelStyles="text-white/70 mt-12! "
            wrapperFixStyles="md:max-w-xl md:mx-auto"
            sec_btnUrl="/contact-us"
            btnUrl="/contact-us"
            titleStylesOveride=" text-2xl!  text-white px-4 font-montserrat!"
          />
        </div>
      </div>
    </section>
  );
}
