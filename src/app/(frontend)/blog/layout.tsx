import type React from "react";

// Pass-through. The blog theme is applied by BlogThemeController in the
// Header, not here: a missing post renders the root not-found page without
// this layout. This file can be deleted.
export default function BlogLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
