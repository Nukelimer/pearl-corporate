import { H_R_Header } from "../src/components/reusable/H_R_Header";
import { Abt_SectionHeader } from "../src/components/about/Abt_SectionHeader";
import { getArticles, getPublishedArticles } from "@/src/collections/Articles/fetchers";
import ArticleList from "../src/components/blog/ArticlesList";

export const revalidate = 60;
async function page() {

 const articles = await getPublishedArticles();
  console.log(articles);

  console.log("DEBUG ARTICLES COUNT:", articles?.length);
  console.log("DEBUG FIRST ARTICLE:", JSON.stringify(articles?.[0]?.title));

  if (!articles || articles.length === 0) {
    return <p className=" text-4xl text-center">No articles found.</p>;
  }
  return (
    <section className=" flex flex-col ">
      <span className="mt-16"></span>

      <H_R_Header
        label="Blog"
        labelStyles="text-accent text-3xl pt-26 pb-16"
        title="Stay updated with stories, articles in and around Pearlaw Corporate"
        isLabelAvl={false}
        titleStylesOveride="font-montesserat text-white  pb-16"
        imgUrl="/blog/scale.png"
        imgStyles="brightness-60 absolute -z-10 h-full w-full "
        className="relative h-full min-h-75 space-y-0 flex  flex-col justify-center"
      />

      <div className="container mx-auto px-4">
        <ArticleList initialArticles={articles} />
      </div>

      <Abt_SectionHeader
        isHorizonatalLine="w-22 bg-accent h-2  rounded-3xl  mx-7 "
        title="Recent Activities"
        className="flex gap-y-6 flex-col-reverse max-w-sm justify-cent er items-cen ter px-0 mx-0"
        titleStylesOveride="text-start! px-7 font-monteserrat font-semibold"
      />
    </section>
  );
}

export default page;
