import { Media } from "@/src/app/payload-types";
import { Clock4, NotepadText } from "lucide-react";
import Image from "next/image";

export function SeeMoreArticleMetadata({
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
      <div className="w-1/2">
        {/* author */}
        <div
          className={`flex items-center justify-between  ${intent === "card" ? "gap-2" : "gap-3"}`}>
          <div
            className={`flex flex-col leading-none ${intent === "card" ? "text-sm gap-1.5" : "text-base gap-2"}`}>
            <time
              dateTime={new Date(publishedAt).toISOString()}
              className="leading-none flex items-center gap-3 text-nowrap sm:text-base">
              <Clock4 />{" "}
              {publishedAt
                .toLocaleString("en-GB", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",

                  hour12: true,
                })
                .replace(/\b(am|pm)\b/gi, (m) => m.toUpperCase())}
            </time>
            <div className="flex items-center gap-3">
              <NotepadText strokeWidth={.8} />{" "}
              <p className=" text-nowrap sm:text-base">
                {author.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
