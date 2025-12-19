import { H_R_Header } from "../src/components/reusable/H_R_Header";
import { Abt_SectionHeader } from "../src/components/about/Abt_SectionHeader";
import {
  getArticles,
  getPublishedArticles,
} from "@/src/collections/Articles/fetchers";
import ArticleList from "../src/components/blog/ArticlesList";
import SeeMoreArticleList from "../src/components/blog/SeeMoreArticlesList";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../src/components/ui/button";
import { PracticeAreas } from "../src/components/blog/P_Area";

export const revalidate = 60;
async function page() {
  const articles = await getPublishedArticles();
  console.log(articles);

  console.log("DEBUG ARTICLES COUNT:", articles?.length);
  console.log("DEBUG FIRST ARTICLE:", JSON.stringify(articles?.[0]?.title));

  if (!articles || articles.length === 0) {
    return (
      <div className="min-h-screen -z-10 flex justify-center items-center">
        <div className=" flex flex-col item-center justify-center w-full">
          <Image
            src={"/blog/blognotfound.png"}
            alt="not-found"
            width={500}
            height={500}
          />
          <p className=" max-w-2xl  text-center mt-4 mx-auto">
            Oops, no articles found please refresh this page or go back home.
          </p>

          <Link href={"/"} className="mx-auto mt-14 ">
            <Button className="bg-accent cursor-pointer"> Go Back Home</Button>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <section className=" flex flex-col ">
      <span className="mt-16"></span>

      <div className="">
        <H_R_Header
          label="Blog"
          labelStyles="text-accent text-3xl lg:text-2xl pt-26 lg:pt-16 pb-16 lg:pb-8"
          title="Stay updated with stories, articles in and around Pearlaw Corporate"
          isLabelAvl={false}
          titleStylesOveride="font-montesserat text-white lg:text-2xl! lg:max-w-2xl lg:mx-auto pb-16"
          imgUrl="/blog/scale.png"
          imgStyles="brightness-60 absolute object-cover  -z-10 h-full w-full "
          className="relative h-full min-h-75 space-y-0 flex  flex-col justify-center"
        />
      </div>

      <div className="lg:flex lg:max-w-6xl lg:mx-auto ">
        <div className="container mx-auto px-4">
          <ArticleList initialArticles={articles} />
        </div>

        <div className="lg:mt-13">
          <Abt_SectionHeader
            isHorizonatalLine="w-18 lg:w-12 bg-accent h-1.5  rounded-3xl  mx-7 lg:mx-0 "
            title="Recent Activities"
            className="flex gap-y-4  flex-col-reverse max-w-sm px-0 mx-0"
            titleStylesOveride="text-start! px-7 lg:text-xl font-monteserrat font-semibold text-2xl"
          />

          <div className="container mx-auto px-4">
            <SeeMoreArticleList initialArticles={articles} />
          </div>

          <PracticeAreas />
        </div>
      </div>
    </section>
  );
}

export default page;


