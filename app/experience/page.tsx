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
    <section className="container  pt-24">
      <Exp_SectionHeader
        label={"Experience PLC"}
        isLabelAvl={false}
        title=""
        description="Pearlaw Corporate delivers strategic legal excellence tailored to your business ambitions, empowering companies to navigate complexity with confidence."
        descriptionStyles="font-semibold text-black text-2xl mb-4"
      />
      <div className="border-b border-black/10  my-10"></div>

      <Quote
        label="Why Us"
        isVericalLine="bg-red-400 max-w-[3px] h-stretch py-0 mb-0 min-w-[3px]"
        title=""
        description="In a remote region beyond the towering word-mountains, far removed from the realms of Vokalia and Consonantia, there resided the forgotten texts. Secluded within Bookmarksgrove, situated along the coast of the Semantics and bordered by an expansive linguistic sea, they lived in quiet isolation. A gentle river called Duden coursed through their dwelling place, carrying an enduring tranquility. Upon waking from a night of troubled dreams, Gregor Samsa found himself altered in a manner he could scarcely comprehend."
        align="left"
        titleStylesOveride="px-0 text-3xl"
        className="flex  gap-4 px-4 my-8 "
      />

      <div className="">
        <img
          src="/experience/handshake.jpg"
          alt="handshake"
          className="flex w-full aspect-video"
        />
      </div>

      <Exp_SectionHeader
        title={""}
        label="How We Work"
        isLabelAvl={false}
        description="Specialised Areas"
        descriptionStyles="text-4xl font-semibold -mt-4"
        labelStyles=" mt-12"
      />

      <SpecialisedAreas practiceAreas={practiceAreas} />

      <Exp_SectionHeader
        isLabelAvl={false}
        title=""
        label="WHERE WE WORK"
        labelStyles="text-white pt-10"
        description="PEARLAW"
        descriptionStyles="text-accent text-4xl font-semibold py-4"
        paragraph="Operating virtually across jurisdictions, we bring legal excellence to your location. Our flexible model allows us to serve clients wherever business takes them, combining the agility of modern technology with the depth of traditional legal expertise."
        paragraphStyles="text-white text-sm  px-8 pt-6 pb-12"
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
        descriptionStyles="text-accent text-4xl font-semibold py-4"
        paragraph="Our client-centric approach emphasizes proactive communication, transparent pricing, and result-driven strategies. We combine traditional legal excellence with modern efficiency"
        paragraphStyles="text-white text-sm  px-8 pt-6 pb-12"
        imgStyles="w-full brightness-20 greyscale absolute h-full"
        imgUrl="/experience/customer.jpg"
        className="relative "
      />

      <LetDiscuss
        label="LET DISCUSS YOUR LEGAL STRATEGY?"
        className="bg-linear-to-l to-[#2B2B2B] from-0% from-[#1E223F] to-60% "
        title="Let’s discuss how Pearlaw Corporate can drive your business forward."
        isLabelAvl={false}
        labelStyles="pt-12 text-white"
        titleStylesOveride="px-0 text-2xl   text-white "
        button="Book Consultattion"
        buttonStyles="bg-accent  w-[90%]  mt-6 mb-16 font-light"
      />
    </section>
  );
}

export default page;
