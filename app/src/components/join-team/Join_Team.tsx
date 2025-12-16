import React from "react";
import ApplyForm from "./ApplyForm";

export default function Join_Team() {
  return (
    <div className="mt-18 md:max-w-4xl md:w-full md:mx-auto">
      <div className=" md:ma.x-w-md md:text-center md:mx-auto w-full">
        <div className="md:bg-[#FFFFFF] md:py-14 md:px-18 ">
          <h3 className="  capitalize mb-6  text-center font-semibold md:text-5xl text-accent">
            join our team
          </h3>
          <p className="px-6 pb-6">
            At pearlaw Corporate, we believe in nurturing fresh talent and
            providing opportunities for growth in the dynamic field of corporate
            law.
            <br className="my-4" />
            <br className="my-4" />
            We are continuously looking for interns and fresh graduates who are
            passionate about legal excellence and eager to learn from
            experienced professionals.
            <br />
            <br />
            While we may not have immediate openings, we maintain a pool of
            qualified candidates. Submit your application below, and we will
            reach out when suitable opportunities arise.
          </p>
          <div className="flex flex-col my-6 md:hidden">
            <h4 className="text-center mb-2">Apply now!</h4>
            <p className=" max-w-sm text-sm  px-8  text-center mx-auto">
              Fill out the form below to submit your application.
            </p>
          </div>
        </div>

        <ApplyForm />
      </div>
    </div>
  );
}
