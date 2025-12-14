"use client";

import { SectionHeader } from "../ui/section-header";
import { PracticeCard } from "../ui/practice-card";
import {
type
  LucideIcon,
} from "lucide-react";
import StraightVerticalLine from "../sections/StraightVerticalLine";
import { cn } from "@/lib/utils";


interface SpecialisedAreasProps {
  icon: LucideIcon
  title: string
  description: string
  learnMoreUrl?: string

}


export function SpecialisedAreas({
  practiceAreas,
  label,
  title,
  stylesOveride
}: {
  practiceAreas: SpecialisedAreasProps[];
  label?: string;
  title?: string;
  titleStyles?: string;
  stylesOveride?: string;
}) {
  return (
    <section id="services" className="py-20 md:py-28 b g-secondary">
      <div className="container mx-auto px-4">
        <SectionHeader
          isLabelAvl={false}
          label={label || "Our Expertise"}
          title={title || "Legal Practice Areas"}
          className={`mb-12 `}
          titleStylesOveride={stylesOveride}
        />

        <StraightVerticalLine />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {practiceAreas.map((area, index) => (
            <PracticeCard
              key={area.title}
              icon={area.icon}
              title={area.title}
              description={area.description}
              index={index}
              //       learnMoreUrl={area.learnMoreUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
