"use client"; 

;
import { relationIsObject } from "@/src/lib/relation-to-object";
import See_More_Blog_Card from "../blog/See_MoreBlog_Card";
import Blog_Card from "./BlogCard";

export default function Articles({
  initialArticles,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialArticles: any[];
}) {
  
  
  
  
  const visibleArticles = initialArticles.slice(0, 3);

  return (
    <>
      <div className="flex gap-8">
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

    </>
  );
}
