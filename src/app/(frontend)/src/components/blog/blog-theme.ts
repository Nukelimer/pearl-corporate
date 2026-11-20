// Dark mode for the /blog route only. The `dark` class goes on <html> so the
// header and footer, which the root layout renders, follow the theme too.
// Other routes never get the class, so they keep their light look.

export type BlogTheme = "light" | "dark";

export const BLOG_THEME_KEY = "blog-theme";

const DARK_QUERY = "(prefers-color-scheme: dark)";

export function isBlogPath(pathname: string | null) {
  return pathname === "/blog" || !!pathname?.startsWith("/blog/");
}

export function getSavedBlogTheme(): BlogTheme | null {
  try {
    const value = localStorage.getItem(BLOG_THEME_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

// The saved choice wins; without one, follow the system setting.
export function getBlogTheme(): BlogTheme {
  return getSavedBlogTheme() ?? (matchMedia(DARK_QUERY).matches ? "dark" : "light");
}

// null removes the theme, which is what every non-blog route needs.
export function applyBlogTheme(theme: BlogTheme | null) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme ?? "";
}

export function saveBlogTheme(theme: BlogTheme) {
  try {
    localStorage.setItem(BLOG_THEME_KEY, theme);
  } catch {
    // Storage blocked (private mode): the choice lasts for this page only.
  }
  applyBlogTheme(theme);
}

export function watchSystemTheme(onChange: () => void) {
  const media = matchMedia(DARK_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

// Inlined in <head> by the root layout. It runs before the first paint, so a
// dark-mode reader who opens a blog URL directly never sees the light page.
// Keep it in step with getBlogTheme and applyBlogTheme above.
export const blogThemeScript = `(function(){var p=location.pathname;if(p!=="/blog"&&p.indexOf("/blog/")!==0)return;var t;try{t=localStorage.getItem("${BLOG_THEME_KEY}")}catch(e){}if(t!=="light"&&t!=="dark")t=matchMedia("${DARK_QUERY}").matches?"dark":"light";var r=document.documentElement;if(t==="dark")r.classList.add("dark");r.style.colorScheme=t})()`;
