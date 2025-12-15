import { type LucideIcon } from "lucide-react";


interface HistoryProps {
  icon?: LucideIcon;
  year?: string | number;
  milestone?: string;
  milestoneInfo?: string;
}
export function HistoryFlow({
  icon: Icon,
  year,
  milestone,
  milestoneInfo,
}: HistoryProps) {
  return (
    <section className=" flex gap-4 w-full px-6 py-8 md:py-2 md:first-of-type:pt-16 md:last-of-type:pb-16  ">
      <div className="flex flex-col ">
        {" "}
        <span className="h-2.5 w-2.5 max-w-2.5 max-h-2.5 bg-accent rounded-full"></span>{" "}
        <span className="w-0.5 bg-accent h-full mx-auto"></span>
      </div>

      <div className=" bg-white rounded-xl w-full p-4">
        <div className="text-accent flex gap-4 font-semibold">
          {" "}
          {Icon && <Icon />} {year}
        </div>
        <h3 className="text-black font-semibold py-4">{milestone}</h3>
        <p className="text-black text-sm">{milestoneInfo}</p>
      </div>
    </section>
  );
}
