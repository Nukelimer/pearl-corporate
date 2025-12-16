import React from "react";
import { H_R_Header } from "../src/components/reusable/H_R_Header";
import Pricing from "../src/components/pricing/PricingCards";
import { Button } from "../src/components/ui/button";
import { Calendar1 } from "lucide-react";

export default function () {
  
const pricingPlans = [
  {
    id: "gem",
    duration: "3 Months",
    name: "GEM Plan",
    price: "#400,000",
    description: "Perfect for early-stage startups and small businesses",
    popular: false,
    features: [
      "Up to 10 hours of legal consultation monthly",
      "Contract review and drafting",
      "Basic compliance advisory",
      "Email support (48hr response)",
      "Quarterly compliance check",
    ],
  },
  {
    id: "ivory",
    duration: "6 Months",
    name: "IVORY Plan",
    price: "#750,000",
    description: "Ideal for growing businesses with regular legal needs.",
    popular: true,
    features: [
      "Up to 25 hours of legal consultation monthly",
      "Unlimited contract review and drafting",
      "Full compliance management",
      "Priority email & phone support (24hr response)",
      "Monthly compliance audits",
      "Data protection advisory",
      "Employment law support",
    ],
  },
  {
    id: "jade",
    duration: "12 Months",
    name: "JADE Plan",
    price: "#1,400,000",
    description: "Comprehensive legal support for established businesses",
    features: [
      "Unlimited legal consultation",
      "Dedicated legal counsel",
      "Full-service compliance management",
      "24/7 priority support",
      "Weekly compliance reviews",
      "M&A and transaction support",
      "Litigation management",
      "Board advisory services",
    ],
  },
];
  return (
    <div className="font-montserrat! md:relative">
      <H_R_Header
        title="Choose a plan that fits your business needs. Get ongoing legal support with predictable costs and priority access to our expertise."
        isLabelAvl={false}
        label="Retainership Plans"
        className="mt-18 relative"
        labelStyles="text-accent pt-16"
        imgUrl="/expertise/scale.jpg"
        imgStyles="w-full h-full aspect- video object-cover absolute brightness-30 md:brightness-70 object-bottom md:object-center md:min-h-full"
        titleStylesOveride="mb-0 pb-22 text-xl text-white font-normal px-3 md:text-xl! md:font-medium"
      />
      <div className="mt-24 md:border border-neutral-800    relative overflow-hidden">
        <img
          alt="expertise"
          src={"/expertise/bg.png"}
          className="hidden md:flex w-full absolute -z-10  object-cover brightness-40 h-full"
        />
        <div className="md:border block  md:my-12  md:p-4  ">
          <Pricing />

          <div className=" px-4 flex flex-col  py-6 md:pt-24 md:text-white md:max-w-xl md:mx-auto mb-16 gap-6">
            <p className="text-center">
              Not sure which plan is right for you? Book a free consultation and
              we’ll help you choose the best option for your businesses
            </p>

            <Button
              variant={"ghost"}
              size={"lg"}
              className="border w-[80%] md:bg-gray-300/30 mx-auto border-black  ">
              <Calendar1 /> Book Free Consultation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
