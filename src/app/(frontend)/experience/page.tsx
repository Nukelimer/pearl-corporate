"use client";

import Image from "next/image";
import { Exp_SectionHeader } from "../src/components/experience/Exp_SectionHeader";
import { Quote } from "../src/components/experience/Quote";
import { SpecialisedAreas } from "../src/components/experience/SpecialisedArea";
import { LetDiscuss } from "../src/components/reusable/LetDiscuss";
import { CalendarCheck2, Lightbulb, Search } from "lucide-react";

const practiceAreas = [
  {
    icon: CalendarCheck2,
    title: "book a conversation",
    description:
      "Schedule an initial consultation where we listen carefully to understand your business context and legal needs.",
    learnMoreUrl: "#",
  },
  {
    icon: Search,
    title: "we understand your needs",
    description:
      "Through detailed analysis and dialogue, we identify the core challenges and opportunities that require legal attention..",
    learnMoreUrl: "#",
  },
  {
    icon: Lightbulb,
    title: "We craft tailored solutions",
    description:
      "Leveraging our expertise, we design and implement legal strategies that align with your business objectives.",
    learnMoreUrl: "#",
  },
];
function page() {
  return (
    <section className="containe r  pt-24 md:pt-10 ">
      <Exp_SectionHeader
        label={"Experience PLC"}
        isLabelAvl={false}
        title=""
        description="Pearlaw Corporate delivers strategic legal excellence tailored to your business ambitions, empowering companies to navigate complexity with confidence."
        descriptionStyles="font-semibold text-black text-2xl mb-4 md:pb-18 md:text-white"
        className="bg-[#s9695954D] px-4 md:overflow-hidden md:h-fit md:px-0 md:relative  md:flex md:flex-col "
        imgUrl="/experience/client.png"
        imgStyles="md:w-full md:h-fit -z-10 md:absolute object-top-left object-cover md:flex hidden brightness-40 "
        labelStyles="md:text-accent md:pt-18"
      />
      <div className="border-b border-black/10 md:hidden my-10"></div>
      <div className="md:bg-gray-100 md:flex  md:px-16 md:py-18 md:gap-6 ">
        <div className="md:flex hidden">
          <Image
            width={500}
            height={500}
            src="/experience/handshake.jpg"
            alt="handshake"
            className="flex w-full aspect-video object-cover "
          />
        </div>
        <Quote
          label="Why Us"
          isVericalLine="bg-red-400 max-w-[3px] md:max-w-[50px] md:max-h-[3px] h-stretch py-0 mb-0 min-w-[3px] md:h-2 md:w-full "
          title=""
          description="At Pearlaw Corporate, we bridge the legal gaps that stand between your business and its full potential. Our boutique approach combines deep legal expertise with strategic business acumen, ensuring every solution we craft aligns with your commercial objectives. We don’t just solve legal problems, we partner with you to unlock opportunities, mitigate risks, and drive sustainable growth."
          align="left"
          titleStylesOveride="px-0 text-3xl"
          descriptionStyles=" md:italic  "
          className="flex   flex-row md:flex-col gap-4 px-4 md:space-y-0!  md:my-0!  my-8 md:relative "
        />
      </div>

      <div className="md:hidden">
        <Image
          width={500}
          height={500}
          src="/experience/handshake.jpg"
          alt="handshake"
          className="flex w-full aspect-video"
        />
      </div>

      <Exp_SectionHeader
        title={""}
        isLabelAvl={false}
        label="How We Work"
        description="Specialised Areas"
        descriptionStyles="text-4xl font-semibold -mt-4"
        labelStyles=" mt-12"
        className="hidden"
      />

      <SpecialisedAreas
        practiceAreas={practiceAreas}
        label="How We Work"
        title="Specialised Areas"
        stylesOveride="font-montserrat! text-2xl! "
      />

      <Exp_SectionHeader
        isLabelAvl={false}
        title=""
        label="WHERE WE WORK"
        labelStyles="text-white pt-10"
        description="PEARLAW"
        descriptionStyles="text-accent text-4xl font-semibold py-4 md:text-6xl md:font-bold"
        paragraph="Operating virtually across jurisdictions, we bring legal excellence to your location. Our flexible model allows us to serve clients wherever business takes them, combining the agility of modern technology with the depth of traditional legal expertise."
        paragraphStyles="text-white text-sm  px-8 pt-6 pb-12 md:max-w-3xl md:text-xl md:text-light  md:mx-auto"
        imgStyles="w-full brightness-20 greyscale absolute h-full"
        imgUrl="/experience/man.jpg"
        className="relative"
      />

      <Exp_SectionHeader
        isLabelAvl={false}
        title=""
        label="HOW DO WE WORK"
        labelStyles="text-white pt-10 mt-6"
        description="PEARLAW"
        descriptionStyles="text-accent text-4xl font-semibold py-4 md:text-6xl md:font-bold"
        paragraph="Our client-centric approach emphasizes proactive communication, transparent pricing, and result-driven strategies. We combine traditional legal excellence with modern efficiency"
        paragraphStyles="text-white text-sm  px-8 pt-6 pb-12 md:max-w-3xl md:text-xl  md:mx-auto"
        imgStyles="w-full brightness-20 greyscale absolute h-full"
        imgUrl="/experience/customer.jpg"
        className="relative mb-6"
      />

      <LetDiscuss
        label="LET DISCUSS YOUR LEGAL STRATEGY?"
        className=" bg-linear-to-l to-[#2B2B2B] from-0% from-[#1E223F] to-60% hidden md:flex"
        title="Let’s discuss how Pearlaw Corporate can drive your business forward."
        isLabelAvl={false}
        labelStyles="pt-12 text-white"
        titleStylesOveride="px-0 text-2xl font-montserrat! md:text-xl! px-10! font-bold text-white "
        button="Book Consultation"
        buttonStyles="bg-accent  w-[90%]  mt-6 mb-16 font-light cursor-pointer!"
        wrapperFixStyles="max-w-3xl mx-auto"
      />

      <LetDiscuss
        label="LET DISCUSS YOUR LEGAL STRATEGY?"
        className="font-montserrat! bg-linear-to-l to-[#2B2B2B] from-0% from-[#1E223F] to-60% md:hidden"
        title="Let’s discuss how Pearlaw Corporate can drive your business forward."
        isLabelAvl={false}
        labelStyles="pt-12 text-white"
        titleStylesOveride="px-0 text-2xl  font-montserrat!  text-white "
        button="Book Consultattion"
        buttonStyles="bg-accent  w-[90%]  mt-6 mb-16 font-light"
      />
    </section>
  );
}

export default page;
