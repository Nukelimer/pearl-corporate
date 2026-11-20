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

// Mounted by blog/layout.tsx. Applies the theme when a reader navigates into
// /blog and removes it when they navigate out, both before the browser paints.
export function BlogThemeController() {
  useLayoutEffect(() => {
    applyBlogTheme(getBlogTheme());
    const stopWatching = watchSystemTheme(() => {
      if (!getSavedBlogTheme()) applyBlogTheme(getBlogTheme());
    });
    return () => {
      stopWatching();
      applyBlogTheme(null);
    };
  }, []);

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
