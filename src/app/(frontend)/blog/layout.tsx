import type React from "react";
import { BlogThemeController } from "../src/components/blog/BlogThemeToggle";

export default function BlogLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <BlogThemeController />
      {children}
    </>
  );
}
