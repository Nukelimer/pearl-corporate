"use client";
import { AboutCard } from "../src/components/about/AboutCard";
import { Abt_SectionHeader } from "../src/components/about/Abt_SectionHeader";
import { Calendar1, Eye, Goal } from "lucide-react";
import { HistoryFlow } from "../src/components/about/History";
import { LetDiscuss } from "../src/components/reusable/LetDiscuss";
import Image from "next/image";
import { Quote } from "../src/components/experience/Quote";
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
      <div className="md:flex md:flex-col hidden">
        <div className="pt-20 h-20"></div>
        <AboutCard
          isLabelAvl={false}
          title="Story about our firm"
          label="About Pearlaw Corporate"
          labelStyles="text-white  capitalise pt-4 mt-6 mb-0 text-2xl! pt-12"
          descriptionStyles="text-black text-sm px-10 mb-18"
          titleStylesOveride=" uppercase font-medium text-sm! mt-0 pb-12"
          description="   "
          paragraphStyles="text-white text-sm  px-8 pt-6 pb-12"
          imgStyles="w-full  h-full absolute -z-10 object-cover"
          imgUrl="/about/advising.jpg"
          className="relative text-white "
        />

        <div className="md:bg-[#F1F2F6] md:flex   md:px-16 md:py-18 md:gap-6 ">
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
            description="Founded with a commitment to excellence and integrity, Pearlaw has been serving clients with distinction for over two decades. Our team of experienced attorneys combines deep legal expertise with a client-first approach, ensuring that every case receives the attention and dedication it deserves.
       
       
                          <br/>
                    
                          
                          <br/>
                          We believe in building lasting relationships based on trust, transparency, and results. Whether you’re facing a complex litigation matter or need strategic legal counsel, Pearlaw is your partner in achieving the best possible outcome."
            align="left"
            titleStylesOveride="px-0 text-3xl"
            descriptionStyles=" md:italic  "
            className="flex   flex-row md:flex-col gap-4 px-4 md:space-y-0!  md:my-0!  my-8 md:relative "
          />
        </div>
      </div>

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
        className="relative md:hidden"
      />

      <div className="flex flex-col gap-4 md:flex-row md:justify-center md:items-center md:mt-8">
        <Abt_SectionHeader
          isLabelAvl={false}
          icon={Goal}
          iconStyles=" mx-auto  w-12 h-12 text-accent"
          title=""
          label="Our Mission"
          labelStyles="text-white md:text-black! font-bold pt- mt-6"
          paragraph="To provide exceptional legal services with unwavering integrity, advocating fiercely for our  clients while maintaining the highest ethical standards. We strive to deliver practical solutions that protect our clients’ interests and advance their goals. "
          paragraphStyles="text-white text-sm md:text-black!  px-12 max-w-md mx-auto pt-6 pb-12"
          imgStyles="w-full brightness-25 greyscale absolute h-full  md:hidden "
          imgUrl="/about/house.jpg"
          className="relative  md:bg-white md:shadow-xl"
        />

        <Abt_SectionHeader
          isLabelAvl={false}
          icon={Eye}
          iconStyles=" mx-auto  w-12 h-12 text-accent"
          title=""
          label="Our Vision"
          labelStyles="text-white md:text-black! font-bold pt- mt-6"
          paragraph="To be recognized as the most trusted and innovative law firm, setting the standard for legal excellence and client service. We envision a future where justice is accessible, and every client receives personalized attention that leads to meaningful results. "
          paragraphStyles="text-white text-sm md:text-black! px-12 max-w-md mx-auto pt-6 pb-12"
          imgStyles="w-full brightness-25 greyscale absolute h-full md:hidden "
          imgUrl="/about/house.jpg"
          className="relative md:bg-white md:shadow-xl"
        />
      </div>

      <div className="">
        <Abt_SectionHeader
          isLabelAvl={false}
          iconStyles=" mx-auto  w-12 h-12 text-accent"
          title=""
          label="Pearl-Law History"
          labelStyles=" font-bold mt-6 mb-0"
          paragraph="We have stood the test of time and are constantly delivering stellar services to our clients in all areas. "
          paragraphStyles=" px-24 max-w-3xl mx-auto"
          imgStyles="w-full brightness-25 greyscale absolute h-full md:hidden "
          imgUrl="/about/house.jpg"
          className="mt-8 hidden md:flex flex-col "
        />
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
        title="Schedule a consultation with our experienced legal team today. Take a step to solve your legal matters with confidence."
        className=" bg-linear-to-l to-[#2B2B2B] from-0% from-[#1E223F] to-60% hidden md:flex"
        isLabelAvl={false}
        labelStyles="pt-12 text-white"
        titleStylesOveride="px-0 text-2xl font-montserrat! md:text-xl! px-10! font-bold text-white "
        button="Book Consultation"
        buttonStyles="bg-accent  w-[40%]  mt-6 mb-16 font-light cursor-pointer! translate-x-3/4"
        wrapperFixStyles="max-w-3xl mx-auto"
      />

      <LetDiscuss
        label="Ready to  GET STARTED??"
        title="Schedule a consultation with our experienced legal team today. Take a step to solve your legal matters with confidence."
        className="font-montserrat! bg-linear-to-l to-[#2B2B2B] from-0% from-[#1E223F] to-60% md:hidden"
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
