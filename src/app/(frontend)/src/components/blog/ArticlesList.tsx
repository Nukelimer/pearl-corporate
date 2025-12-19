"use client"; 

import { useState } from "react";
import Blog_Card from "./Blog_Card";
import { relationIsObject } from "@/src/lib/relation-to-object";

export default function ArticleList({
  initialArticles,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialArticles: any[];
}) {
  const [visibleCount, setVisibleCount] = useState(5);

  const showMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  const visibleArticles = initialArticles.slice(0, visibleCount);

  return (
    <>
      <div className="">
        {visibleArticles.map(
          ({
            id,
            title,
            slug,
            contentSummary,
            coverImage,
            readTimeInMinutes,
            publishedAt,
            author,
          }) => {
            if (!relationIsObject(coverImage)) return null;

            if (!relationIsObject(author) || !relationIsObject(author.avatar)) {
              return null;
            }

            const readTime =
              typeof readTimeInMinutes === "string"
                ? parseInt(readTimeInMinutes, 10)
                : readTimeInMinutes;

            return (
              <Blog_Card
                key={id}
                title={title}
                href={`/blog/${slug}`}
                summary={contentSummary}
                coverImage={coverImage}
                readTimeInMinutes={readTime ?? 0}
                publishedAt={new Date(publishedAt ?? new Date())}
                author={{
                  avatar: author.avatar,
                  name: author.name ?? "",
                  role: author.role ?? "",
                }}
              />
            );
          }
        )}
      </div>

      {visibleCount < initialArticles.length && (
        <div className="flex justify-center my-10">
          <button
            onClick={showMore}
            className="px-6 py-3 bg-accent text-sm text-white rounded-md hover:opacity-90 transition-all">
            Show Older Articles
          </button>
        </div>
      )}
    </>
  );
}
