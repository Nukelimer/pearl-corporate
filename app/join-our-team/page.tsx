import React from "react";
import { H_R_Header } from "../src/components/reusable/H_R_Header";
import Join_Team from "../src/components/join-team/Join_Team";
import JoinFAQ from "../src/components/join-team/JoinFAQ";
import { LetDiscuss } from "../src/components/reusable/LetDiscuss";

export default function page() {
  return (
    <section>
      <H_R_Header
        title="Join our team of dedicated legal professionals. We’re seeking talented young minds to shape the future of corporate law."
        isLabelAvl={false}
        label="Careers at pearlaw corporate"
        className="mt-18 relative"
        labelStyles="text-accent pt-16"
        imgUrl="/join-our-team/career.jpg"
        imgStyles="w-full h-full aspect- video object-cover absolute blur-2xl brightness-30 object-bottom"
        titleStylesOveride="mb-0 pb-22 text-xl text-white font-normal px-3"
      />

      <Join_Team />
      <JoinFAQ />

      <LetDiscuss
        label="stay connected with us"
        className="bg-linear-to-l to-[#2B2B2B] from-0% from-[#1E223F] to-60% "
        title="Follow us on social media for the latest updates on job openings and firm news"
        isLabelAvl={false}
        labelStyles="pt-12 text-white"
        titleStylesOveride="px-0 text-2xl   text-white "
        buttonStyles="bg-accent  w-[90%]  mt-6 mb-16 font-light"
        v2
      />
    </section>
  );
}
