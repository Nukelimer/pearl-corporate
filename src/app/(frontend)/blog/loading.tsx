import { ArticleCardSkeleton } from "../src/components/blog/article-card";


export default function BlogIndexPageLoading() {
    return (
        <div className="flex flex-col gap-4 px-6">
            {Array.from({ length: 5 }).map((_, index) => (
                <ArticleCardSkeleton key={index} />
            ))}
        </div>
    )
}
