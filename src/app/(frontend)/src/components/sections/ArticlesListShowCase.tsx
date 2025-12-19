import { getPublishedArticles } from "@/src/collections/Articles/fetchers";
import React from "react";

import { H_R_Header } from "../reusable/H_R_Header";
import { Button } from "../ui/button";
import Link from "next/link";
import Articles from "./Articles";
import { Abt_SectionHeader } from "../about/Abt_SectionHeader";
import SeeMoreArticleList from "../blog/SeeMoreArticlesList";

async function ArticlesListShowCase() {
  const articles = await getPublishedArticles();
  return (
    <>
      <div className="hidden  lg:flex flex-col justify-center items-center ">
        <H_R_Header
          title="Recent Articles"
          label="Our Blogs"
          isLabelAvl={false}
          titleStylesOveride="text-2xl! "
          labelStyles="text-sm!"
          isHorizonatalLine="w-1 h-12 bg-accent"
          className="flex flex-col items-center justify-center font-montserrat mt-6"
        />

        <div className="  lg:block mx-auto px-4">
          <Articles initialArticles={articles} />
        </div>

        <Link href={"/blog"} scroll>
          <Button className="bg-accent rounded-xs mb-14 text-xs">
            Read the Blog
          </Button>
        </Link>
      </div>
      <div className="mt-18 lg:hidden flex flex-col justify-center">
        <Abt_SectionHeader
          isHorizonatalLine="w-12  bg-accent h-1.5  rounded-3xl  mx-7 lg:mx-0 "
          title="Recent Activities"
          className="flex gap-y-4  flex-col-reverse max-w-sm px-0 mx-0"
          titleStylesOveride="text-start! px-7 lg:text-xl font-monteserrat font-semibold text-2xl"
        />

        <div className="container mx-auto px-6">
          <SeeMoreArticleList initialArticles={articles} />
        </div>

        <Link href={"/blog"} className="mx-auto">
          <Button className="bg-accent rounded-xs mb-14 text-xs">
            Read the Blog
          </Button>
        </Link>
      </div>
    </>
  );
}

export default ArticlesListShowCase;
