import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Media } from "@/src/app/payload-types";
import { ArticleMetadata } from "./article-metadata";
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


  console.log("BFsjdddddd", coverImage.url);
  
  return (
    <div className={cn("w-full flex flex-col  my-12 ")}>
      <div className="bg-white shadow rounded-2xl! overflow-hidden pb-8">
        <Image
          src={coverImage?.url ?? ""}
          alt={`Blog Image ${title}`}
          width={500}
          height={500}
          className="w-full brightness-80 min-h-75 h-full max-h-75 object-cover "
          blurDataURL={coverImage?.blurDataUrl ?? ""}
        />
        <h3 className=" text-2xl py-4 px-4 font-semibold font-montserrat">
          {title}
        </h3>

        <p
          className="py-4 px-4 text-base font-light
        ">
          {summary}
        </p>

        <div className="py-4 px-4 text-2xl font-light flex gap-x-6">

          <ArticleMetadata   intent="card"
                        data={{ author, publishedAt,  readTimeInMinutes }}
                        className="mt-auto"/>
          {/* <span>{ publishedAt}</span> <span>Remi Egwuda</span> */}
        </div>

        <Button
          size={"lg"}
          className="bg-accent py-3 px-12 text-sm   h-full mx-4 mt-8 ">
          <Link href={href} className="">
            Read More
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default Blog_Card;
