
import { Check, Clock, Shield } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export function RetainershipPlans() {
  const features = [
    {
      icon: Check,
      title: "Priority Support",
      description: "Get expedited responses and dedicated attention",
    },
    {
      icon: Clock,
      title: "Cost Effective",
      description: "Fixed monthly rates with predictable costs",
    },
    {
      icon: Shield,
      title: "Flexible Terms",
      description: "Choose Plans that adopt to your needs",
    },
  ];

  return (
    <section className="relative min-h-s creen w-full overflow-hidden bg-black text-white">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: "url('/contact-us/bg.jpg')",
        }}
      />


      <div className="relative z-10 mx-auto max-w-2xl px-6 py-16 md:py-24">

        <div className="mb-12 flex justify-center">
          <div className="rounded-full bg-white px-8 py-1">
            <span className="text-sm  px-12 tracking-wider text-gray-800">
              FLEXIBLE PLANS
            </span>
          </div>
        </div>


        <h2 className="mb-8 text-center text-2xl font-bold leading-tight md:text-5xl">
          Explore Our Retainership Plans
        </h2>

        <p className="mb-12 text-center text leading-relaxed text-gray-300 md:text-xl">
          Discover flexible retainership options designed to provide ongoing
          legal support tailored to your specific needs and budget.
        </p>

        <Link href={"/pricing"}>
          <Button
            size="lg"
            className="mb-16 h-11 w-full rounded-lg bg-accent text-lg font-medium hover:bg-orange-700">
            View Retainership Plans
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>

        <div className="space-y-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="rounded-2xl border border-white/40 bg-black/20 p-6  transition-all hover:border-white/20">
                <div className="flex flex-col items-start gap-4">
                  <div className="rounded-xl bg-accent p-3">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 ">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
