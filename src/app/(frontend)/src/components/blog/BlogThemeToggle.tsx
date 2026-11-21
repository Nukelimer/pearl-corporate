"use client";

import { useLayoutEffect, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/src/app/(frontend)/lib/utils";
import {
  applyBlogTheme,
  getBlogTheme,
  getSavedBlogTheme,
  saveBlogTheme,
  watchSystemTheme,
} from "./blog-theme";

// Rendered by the Header, which every page has, the 404 page included. A blog
// layout would not do: notFound() in blog/[slug] renders the root not-found
// page without it, and the dark class would then stay on for the next route.
// `active` is true on /blog paths. The theme is applied when it turns true and
// removed when it turns false, both before the browser paints.
export function BlogThemeController({ active }: { active: boolean }) {
  useLayoutEffect(() => {
    if (!active) {
      applyBlogTheme(null);
      return;
    }
    applyBlogTheme(getBlogTheme());
    return watchSystemTheme(() => {
      if (!getSavedBlogTheme()) applyBlogTheme(getBlogTheme());
    });
  }, [active]);

  return null;
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

const isDarkNow = () => document.documentElement.classList.contains("dark");

export function BlogThemeToggle({ className }: { className?: string }) {
  const isDark = useSyncExternalStore(subscribe, isDarkNow, () => false);
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={() => saveBlogTheme(isDark ? "light" : "dark")}
      aria-label={label}
      title={label}
      className={cn(
        "p-2 rounded-md cursor-pointer text-muted-foreground hover:text-primary hover:bg-muted transition-colors",
        className
      )}>
      {/* CSS picks the icon, so it is right on the first paint, before React runs. */}
      <Moon className="size-5 dark:hidden" aria-hidden="true" />
      <Sun className="size-5 hidden dark:block" aria-hidden="true" />
    </button>
  );
}
