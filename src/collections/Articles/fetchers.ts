// import { getPayloadClient } from "@/src/lib/client";
// import { STATUS_OPTIONS } from "./constants";

// export const getArticles = async () => {
//   const payload = await getPayloadClient();
//   try {
//     const { docs: allArticles } = await payload.find({
//       collection: "articles",
//       where: { status: { equals: STATUS_OPTIONS.PUBLISHED } },
//       select: {
//         slug: true,
//         title: true,
//         contentSummary: true,
//         coverImage: true,
//         status: true,
//         author: true,
//         readTimeInMinutes: true,
//         publishedAt: true,
//         tags:true
//       },
//     });

//     return allArticles ?? [];
//   } catch (error) {
//     console.log("Failed to fetch articles", error);

//     return [];
//   }
// };

import { getPayloadClient } from "@/src/lib/client";
import { CACHE_TAG_ARTICLES, STATUS_OPTIONS } from "./constants";
import { unstable_cache } from "next/cache";

export const getArticles = async () => {
  const payload = await getPayloadClient();
  try {
    const { docs: allArticles } = await payload.find({
      collection: "articles",
      sort: '-publishedAt',
      where: { status: { equals: STATUS_OPTIONS.PUBLISHED } },
      select: {
        slug: true,
        title: true,
        contentSummary: true,
        coverImage: true,
        status: true,
        author: true,
        readTimeInMinutes: true,
        publishedAt: true,
        tags:true
      },
    });

    return allArticles ?? [];
  } catch (error) {
    console.log("Failed to fetch articles", error);

    return [];
  }
};

export function getPublishedArticles() {
  return unstable_cache(getArticles, [], {
    tags: [CACHE_TAG_ARTICLES],
  })();
}

export async function getArticleBySlug(slug: string) {
  const payload = await getPayloadClient();
  try {
    const { docs: articles } = await payload.find({
      collection: "articles",
      limit: 1,
      where: { slug: { equals: slug } },
    });
    const [firstArticle] = articles ?? [];
    return firstArticle ?? null;
  } catch (error) {
    console.error("Failed to fetch articles", error);
    return null;
  }
}
