import { Media } from "@/src/app/payload-types";
import Image from "next/image";

export function ArticleMetadataPost({
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
    <div className={`mt-4 flex items-start justify-between! w-full ${className}`}>
      <div className="w-1/2">
        {/* author */}
        <div
          className={`flex items-center justify-between  ${intent === "card" ? "gap-2" : "gap-3"}`}>
          <Image
            src={author.avatar.url ?? ""}
            alt={`${author.name}'s avatar`}
            width={40}
            height={40}
            className={`rounded-full hidden ${intent === "card" ? "size-10" : "size-11"}`}
            sizes="40px"
          />

          {/* author name, role */}
          <div
            className={`flex flex-col leading-none ${intent === "card" ? "text-sm gap-1.5" : "text-base gap-2"}`}>
            <time
              dateTime={new Date(publishedAt).toISOString()}
              className="leading-none text-nowrap sm:text-base">
              {publishedAt
                .toLocaleString("en-GB", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })
                .replace(/\b(am|pm)\b/gi, (m) => m.toUpperCase())}
            </time>
          </div>
        </div>
      </div>

      <div className="flex  justify-center w-full  gap-1">
        {/* date, read time */}
        <div
          className={`flex flex-col justify-between text-right ${intent === "card" ? "text-sm gaap-1.5" : "text-base gaap-2"}`}>
          <p className="font-bold text-nowrap sm:text-base">{author.name}</p>
          <p className="text-dimmed text-nowrap sm:text-base">{author.role}</p>
          <p className="text-dimmed -translate-y-2 leading-none hidden">
            <br /> {readTimeInMinutes}{" "}
            {readTimeInMinutes === 1 ? "minute" : "minutes"} read.
          </p>
        </div>
      </div>
    </div>
  );
}
