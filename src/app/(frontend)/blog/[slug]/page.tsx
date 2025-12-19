import Image from "next/image";
import { getArticleBySlug } from "@/src/collections/Articles/fetchers";
import { notFound } from "next/navigation";
import { relationIsObject } from "@/src/lib/relation-to-object";
import { RichText } from "../../src/components/blog/rich-text";
import { Button } from "../../src/components/ui/button";
import { Abt_SectionHeader } from "../../src/components/about/Abt_SectionHeader";
export const dynamicParams = true;

export default async function BlogPostPage({

  params,
}: {
  params: Promise<{ slug: string }>;
  }) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);



  if (!article) notFound();

  if (!relationIsObject(article.coverImage)) return null;
  if (
    !relationIsObject(article.author) ||
    !relationIsObject(article.author.avatar)
  ) {
    return null;
  }
  const { tags } = article;
  console.log(tags);
  if (!tags) {
    return null;
  }

  return (
    <div className="prose lg:prose-lg dark:prose-invert mt-20  mb-0! h-full px-5 bg-neutral-200">
      <span className="mt-14"></span>

      <div className="relative flex justify-center items-center flex-col h-full min-h-48 ">
        <h1 className="text-2xl font-semibold text-white font-montserrat h-full py-14 z-10 max-h-[500px] px-5">
          {article.title}{" "}
        </h1>
        <Image
          src={article.coverImage.url ?? ""}
          alt="Cover image"
          width={600}
          height={300}
          className="w-full  object-center object-cover brightness-70  h-full absolute top-0 "
          placeholder="blur"
          blurDataURL={article.coverImage.blurDataUrl}
        />
      </div>
      <div className="bg-white rounded-2xl mb-6">
        <RichText lexicalData={article.content} />
      </div>
      <div className=" ">Read This: </div>

      <div className="mt-32 mb-16 ">
        {tags && <h3 className="text-2xl font-medium mb-3">Tags</h3>}

        <div className="flex flex-wrap gap-2 font-montserrat">
          {tags.length > 0 &&
            tags?.map((tag) => {
              if (typeof tag === "object" && tag !== null) {
                return <Button className="bg-accent capitalize" key={tag?.slug}>{tag?.name}</Button>; 
              }

              return (
                <Button className="bg-accent" key={tag}>
                  {tag}
                </Button>
              );
            })}
        </div>
          </div>
          
           <Abt_SectionHeader
                  isHorizonatalLine="w-22 bg-accent h-2  rounded-3xl  "
                  title="Recent Activities"
                  className="flex gap-y-6 flex-col-reverse max-w-sm justify-cent er items-cen ter px-0 mx-0"
                  titleStylesOveride="text-start! p-0 font-monteserrat font-semibold"
                />
    </div>
  );
}
