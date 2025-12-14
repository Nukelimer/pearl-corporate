"use client";
import { AboutCard } from "../src/components/about/AboutCard";
import { Abt_SectionHeader } from "../src/components/about/Abt_SectionHeader";
import { Calendar1, Eye, Goal } from "lucide-react";
import { HistoryFlow } from "../src/components/about/History";
import { LetDiscuss } from "../src/components/reusable/LetDiscuss";
function page() {
  const historyData = [
    {
      milestone: "Pear founded",
      milestoneInfo:
        "Established with a vision to provide exceptional legal services to our community.",

      year: 2025,
      icon: Calendar1,
    },
    {
      milestone: "Expansion and Growth",
      milestoneInfo:
        "Expanded to a team of 15 attorneys and opened our second office location.",

      year: 2025,
      icon: Calendar1,
    },
    {
      milestone: "Recognition of Excellence",
      milestoneInfo:
        "Received multiple industry awards and recognition for outstanding legal representation.",

      year: 2025,
      icon: Calendar1,
    },
    {
      milestone: "Technology Innovation",
      milestoneInfo:
        "Pioneered digital client services and modern case management systems.",

      year: 2025,
      icon: Calendar1,
    },
    {
      milestone: "Continued Leadership",
      milestoneInfo:
        "Now serving over 5,000 clients with a team of 40+ legal professionals.",

      year: 2025,
      icon: Calendar1,
    },
  ];
  return (
    <section>
      <AboutCard
        isLabelAvl={false}
        title=""
        label="About Pearlaw"
        labelStyles="text-black/60 pt-4 mt-6"
        descriptionStyles="text-black text-sm px-10 mb-18"
        description="Founded with a commitment to excellence and integrity, Pearlaw has been serving clients with distinction for over two decades. Our team of experienced attorneys combines deep legal expertise with a client-first approach, ensuring that every case receives the attention and dedication it deserves.
       
       
                          <br/>
                    
                          
                          <br/>
                          We believe in building lasting relationships based on trust, transparency, and results. Whether you’re facing a complex litigation matter or need strategic legal counsel, Pearlaw is your partner in achieving the best possible outcome.
       
                          "
        paragraphStyles="text-white text-sm  px-8 pt-6 pb-12"
        imgStyles="w-full mt-20 h-full object-cover"
        imgUrl="/about/advising.jpg"
        className="relative "
      />

      <div className="flex flex-col gap-4">
        <Abt_SectionHeader
          isLabelAvl={false}
          icon={Goal}
          iconStyles=" mx-auto  w-12 h-12 text-accent"
          title=""
          label="Our Mission"
          labelStyles="text-white pt- mt-6"
          paragraph="To provide exceptional legal services with unwavering integrity, advocating fiercely for our  clients while maintaining the highest ethical standards. We strive to deliver practical solutions that protect our clients’ interests and advance their goals. "
          paragraphStyles="text-white text-sm  px-12 max-w-md mx-auto pt-6 pb-12"
          imgStyles="w-full brightness-25 greyscale absolute h-full"
          imgUrl="/about/house.jpg"
          className="relative "
        />

        <Abt_SectionHeader
          isLabelAvl={false}
          icon={Eye}
          iconStyles=" mx-auto  w-12 h-12 text-accent"
          title=""
          label="Our Vision"
          labelStyles="text-white pt- mt-6"
          paragraph="To be recognized as the most trusted and innovative law firm, setting the standard for legal excellence and client service. We envision a future where justice is accessible, and every client receives personalized attention that leads to meaningful results. "
          paragraphStyles="text-white text-sm  px-12 max-w-md mx-auto pt-6 pb-12"
          imgStyles="w-full brightness-25 greyscale absolute h-full"
          imgUrl="/about/house.jpg"
          className="relative "
        />
      </div>

      <div className="">
        {historyData.map(({ icon, milestone, milestoneInfo, year }) => {
          return (
            <HistoryFlow
              key={milestoneInfo + crypto.randomUUID()}
              icon={icon}
              milestone={milestone}
              milestoneInfo={milestoneInfo}
              year={year}
            />
          );
        })}
      </div>

      <LetDiscuss
        label="Ready to  GET STARTED??"
        className="bg-linear-to-l to-[#2B2B2B] from-0% from-[#1E223F] to-60% "
        title="Schedule a consultation with our experienced legal team today. Take a step to solve your legal matters with confidence."
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
