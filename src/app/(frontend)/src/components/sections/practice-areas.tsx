"use client"

import { SectionHeader } from "../ui/section-header"
import { PracticeCard } from "../ui/practice-card"
import {  FileText, Scale, Home, BriefcaseBusiness, Rocket, FileCheck, Shield } from "lucide-react"
import StraightVerticalLine from "./StraightVerticalLine";

const practiceAreas = [
  {
    icon: BriefcaseBusiness,
    title: "Corporate & Commercial",
    description:
      "End-to-end corporate structuring, M&A transactions, commercial contracts and joint ventures tailored to your business objectives.",
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

export function PracticeAreas() {
  return (
    <section id="services" className="py-20 md:py-28 md:pt-14 b g-secondary">
      <div className="container mx-auto px-4">
        <SectionHeader 
          isLabelAvl={false}
        titleStylesOveride="font-montesserat md:font"
          label="Our Expertise"
          title="Legal Practice Areas"
          // description="We offer comprehensive legal services across multiple practice areas, ensuring your business receives expert guidance in every aspect of corporate law."
          className="mb-12"
        />

    <StraightVerticalLine/>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {practiceAreas.map((area, index) => (
            <PracticeCard
              key={area.title}
              icon={area.icon}
              title={area.title}
              description={area.description}
              index={index}
              learnMoreUrl={area.learnMoreUrl}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
