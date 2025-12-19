"use client"; 

import { useState } from "react";
import Blog_Card from "./Blog_Card";
import { relationIsObject } from "@/src/lib/relation-to-object";
import See_More_Blog_Card from "./See_MoreBlog_Card";

export default function SeeMoreArticleList({
  initialArticles,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialArticles: any[];
}) {
  
  
  
  
  const visibleArticles = initialArticles.slice(0, 3);

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
              <See_More_Blog_Card
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

    </>
  );
}
