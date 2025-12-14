"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check, Calendar } from "lucide-react";

import clsx from "clsx";
import { Button } from "../ui/button";

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
interface PricingProps {

  id: string;
  duration: string;
  name: string;
  price: string;
  description: string;
  features: string[]
  popular?: boolean | undefined


}
export default function Pricing() {
  return (
    <section className="py-20 bg-white text-black">
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        <h2 className="text-xl ">Preferred Plan</h2>

        {/* Mobile: Accordion */}
        <Accordion
          type="single"
          collapsible
          defaultValue="gem"
          className="space-y-4 md:hidden">
          {pricingPlans.map((plan) => (
            <AccordionItem
              key={plan.id}
              value={plan.id}
              className=" rounded-xl  overflow-hidden">
              <AccordionTrigger className="px-5 py-4 text-left border ">
                {plan.duration} ({plan.name})
              </AccordionTrigger>

              <AccordionContent className="border-none p-0">
                <div className="overflow-hidden">
                  <PricingCardContent plan={plan} />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
          <div className="opacity-0"></div>
        </Accordion>

        {/* Desktop: All cards open */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={clsx(
                "border rounded-2xl p-6 space-y-6",
                plan.popular && "border-black"
              )}>
              <PricingCardContent plan={plan} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------
 * Shared card content
 * --------------------------------- */
function PricingCardContent({ plan }: { plan: PricingProps }) {
  return (
    <div className="relative flex flex-col item-center mx-auto border rounded-md mt-12 p-6 pb-8">
      {plan.popular && (
        <div className=" w-full flex justify-center item-center absolute -top-4">
          <span className=" bg-black text-white px-4 py-2   mx-auto z-50 rounded-full text-sm ">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center flex flex-col  gap-6">
        <h3 className="text-xl font-semibold  mt-6">{plan.name}</h3>
        <p className="text-4xl font-bold">{plan.price}</p>
        <p className="text-gray-500">{plan.description}</p>
      </div>

      <ul className="flex flex-col  my-6 gap-6">
        {plan.features.map((feature: string) => (
          <li key={feature} className="flex gap-3">
            <Check className="w-5 h-5 text-green-600 mt-1" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Button size={"lg"}
        className={clsx(
          "w-full gap-2",
          plan.popular ? "bg-accent text-white" : "bg-gray-100 text-black"
        )}>
        <Calendar className="w-4 h-4" />
        Get Started
      </Button>
    </div>
  );
}
