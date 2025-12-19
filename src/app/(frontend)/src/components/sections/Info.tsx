import { Media } from "@/src/app/payload-types";
import { Clock4, NotepadText } from "lucide-react";


export function SeeMoreInfo({
  data,
  intent,
  className,
}: {
  data: {
    author: { avatar: Media; name: string; role: string };
    publishedAt: Date;
    readTimeInMinutes: number;
  };
  intent: "card" | "post";
  className?: string;
}) {
  const { author, publishedAt, readTimeInMinutes } = data;

  return (
    <div
      className={`mt-4 flex items-start justify-between! w-full ${className}`}>
      <div className="w-full">

        <div
          className={`flex items-center px-3 ${intent === "card" ? "gap-2" : "gap-3"}`}>
          <div
            className={` flex flex-row justify-between w-full leading-none ${intent === "card" ? "text-sm gap-1.5" : "text-sm! gap-2"}`}>
            <time
              dateTime={new Date(publishedAt).toISOString()}
              className="leading-none flex items-center gap-3 text-left text-nowrap ">
              {publishedAt
                .toLocaleString("en-GB", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",

                  hour12: true,
                })
                .replace(/\b(am|pm)\b/gi, (m) => m.toUpperCase())}
            </time>
            <div className="flex items-center text-right">
              <p className=" text-nowrap ">{author.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
