export default function BlogPostPageLoading() {
  return (
    <p>
      <ArticleCardSkeletonMain />
    </p>
  );
}

export function ArticleCardSkeletonMain() {
  return (
    <span className="block rounded-md min-h-screen -z-10 h-[350px] animate-pulse bg-accent/60" />
  );
}
