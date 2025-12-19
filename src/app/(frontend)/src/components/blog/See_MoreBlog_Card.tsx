import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Media } from "@/src/app/payload-types";
import { ArticleMetadata } from "./article-metadata";
import { SeeMoreArticleMetadata } from "./see_more_article-metadata";
type BlogArticleCardProps = {
  href: string;
  title: string;
  summary: string;
  coverImage: Media;
  publishedAt: Date;
  readTimeInMinutes: number;
  author: {
    avatar: Media;
    name: string;
    role: string;
  };
};
function See_More_Blog_Card({
  href,
  title,
  summary,
  coverImage,
  publishedAt,

  readTimeInMinutes,
  author,
}: BlogArticleCardProps) {


  return (
    <div className={cn("w-full flex flex-col  my-12 ")}>
      <Link
        href={href}
        className="cursor-pointer  overflow-hidden pb-8 flex items-center-safe">
        <Image
          src={coverImage?.url ?? ""}
          alt={`Blog Image ${title}`}
          width={100}
          height={100}
          className=" brightness-80 h-32 max-w-28 min-w-28 object-cover w-32 "
          blurDataURL={coverImage?.blurDataUrl ?? ""}
        />
        <div className="">
          <h3 className=" text-xl py-4 px-4 font-semibold font-montserrat">
            {title}
          </h3>

          <div className="py-4 px-4 text-2xl font-light flex gap-x-6">
            <SeeMoreArticleMetadata
              intent="post"
              data={{ author, publishedAt, readTimeInMinutes }}
              className="mt-auto"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default See_More_Blog_Card;
