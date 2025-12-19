import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Media } from "@/src/app/payload-types";
import { ArticleMetadata } from "../blog/article-metadata";
import { SeeMoreArticleMetadata } from "../blog/see_more_article-metadata";
import { SeeMoreInfo } from "./Info";
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
function Blog_Card({
  href,
  title,
  summary,
  coverImage,
  publishedAt,

  readTimeInMinutes,
  author,
}: BlogArticleCardProps) {


  return (
    <div className={cn("w-full flex flex-col  my-12 border bg-white ")}>
      <Link
        href={href}
        className="cursor-pointer flex-col overflow-hidden pb-8 flex items-center-safe">
        <Image
          src={coverImage?.url ?? ""}
          alt={`Blog Image ${title}`}
          width={100}
          height={100}
          className=" brightness-80 w-full object-cover  "
          blurDataURL={coverImage?.blurDataUrl ?? ""}
        />
        <div className="">
          <h3 className=" px-3 text-start text-base py-4 font-semibold font-montserrat first-letter:uppercase">
            {title}
          </h3>

          <div className="py-4 text-2xl font-light flex ">
            <SeeMoreInfo
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

export default Blog_Card;
