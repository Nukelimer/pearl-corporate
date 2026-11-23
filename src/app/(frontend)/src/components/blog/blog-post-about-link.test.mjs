// Tests for the "Back to About Us" link at the end of a blog post.
//
// The post page reads from Payload, which needs a database. These tests compile
// the real page and replace only its data fetchers and sidebar components, so
// the markup under test is what the page really renders. The article body goes
// through the real RichText, and the styles come from the real globals.css.

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

import { RichText } from "./rich-text.tsx";
import { relationIsObject } from "../../../../../lib/relation-to-object.ts";

const require = createRequire(import.meta.url);
const NextLink = require("next/link");
const { compile } = require("@tailwindcss/node");

const here = path.dirname(fileURLToPath(import.meta.url));
const frontend = path.resolve(here, "../../..");
const pagePath = path.join(frontend, "blog/[slug]/page.tsx");
const cssPath = path.join(frontend, "globals.css");

const LINK_TEXT = "Back to About Us";
const SIDEBAR = "data-sidebar";

const text = (value) => ({ type: "text", text: value, format: 0, detail: 0, mode: "normal", style: "", version: 1 });
const block = (type, children, extra = {}) => ({ type, children, direction: "ltr", format: "", indent: 0, version: 1, ...extra });
const paragraph = (value) => block("paragraph", [text(value)], { textFormat: 0 });
const content = (...children) => ({ root: block("root", children) });

const endings = {
  paragraph: { node: paragraph("LAST-CONTENT"), marker: "LAST-CONTENT" },
  heading: { node: block("heading", [text("LAST-CONTENT")], { tag: "h2" }), marker: "LAST-CONTENT" },
  list: {
    node: block("list", [block("listitem", [text("LAST-CONTENT")], { value: 1 })], { listType: "bullet", start: 1, tag: "ul" }),
    marker: "LAST-CONTENT",
  },
  image: {
    node: { type: "upload", relationTo: "media", value: { url: "/last-image.jpg", alt: "Last image" }, fields: {}, format: "", version: 1 },
    marker: "/last-image.jpg",
  },
};

const articleWith = (lastNode) => ({
  title: "A post",
  slug: "a-post",
  coverImage: { url: "/cover.jpg", blurDataUrl: "data:image/png;base64,AA==" },
  author: { avatar: { url: "/avatar.jpg" } },
  tags: [{ name: "Law", slug: "law" }],
  content: content(paragraph("First paragraph of the article."), lastNode),
});

function loadPage(article) {
  const { outputText } = ts.transpileModule(readFileSync(pagePath, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
    },
  });

  const linkProps = [];
  const Link = (props) => {
    linkProps.push(props);
    return createElement(NextLink, props);
  };
  const stubs = {
    "next/image": { __esModule: true, default: ({ alt }) => createElement("img", { alt }) },
    "next/link": { __esModule: true, default: Link },
    "next/navigation": {
      notFound() {
        throw new Error("notFound");
      },
    },
    "@/src/collections/Articles/fetchers": {
      getArticleBySlug: async () => article,
      getPublishedArticles: async () => [],
      getRandomPublishedArticle: async () => null,
    },
    "@/src/lib/relation-to-object": { relationIsObject },
    "../../src/components/blog/rich-text": { RichText },
    "../../src/components/ui/button": {
      Button: ({ children }) => createElement("button", null, children),
    },
    "../../src/components/about/Abt_SectionHeader": {
      Abt_SectionHeader: ({ title }) => createElement("h2", { [SIDEBAR]: "" }, title),
    },
    "../../src/components/blog/SeeMoreArticlesList": {
      __esModule: true,
      default: () => createElement("div", { [SIDEBAR]: "" }),
    },
    "../../src/components/blog/P_Area": {
      PracticeAreas: () => createElement("div", { [SIDEBAR]: "" }),
    },
  };

  const compiled = { exports: {} };
  const quiet = { ...console, log() {} };
  new Function("require", "module", "exports", "console", outputText)(
    (name) => (name in stubs ? stubs[name] : require(name)),
    compiled,
    compiled.exports,
    quiet
  );
  return { Page: compiled.exports.default, linkProps };
}

async function renderPost(lastNode = endings.paragraph.node) {
  const { Page, linkProps } = loadPage(articleWith(lastNode));
  const element = await Page({ params: Promise.resolve({ slug: "a-post" }) });
  return { html: renderToStaticMarkup(element), linkProps };
}

// The open elements at the first place `needle` appears in the HTML.
function ancestorsAt(html, needle) {
  const stack = [];
  const before = html.slice(0, html.indexOf(needle));
  for (const [, closing, tag, attrs, selfClosed] of before.matchAll(/<(\/?)([a-z0-9]+)([^>]*?)(\/?)>/gi)) {
    if (closing) stack.pop();
    else if (!selfClosed) stack.push({ tag, className: /class="([^"]*)"/.exec(attrs)?.[1] ?? "" });
  }
  return stack;
}

const classesOf = (node) => node.className.split(/\s+/).filter(Boolean);
const inCard = (chain) => chain.slice(chain.findIndex((node) => classesOf(node).includes("bg-white")));

// Left edge of the text inside the card, from the width and padding classes
// that position it: max-w-4xl is 896px, mx-auto centers it and px-4 is 16px.
// globals.css also gives paragraphs in .rich-text-content 16px of side padding.
function textLeft(chain, cardWidth) {
  let left = 0;
  let width = cardWidth;
  let inRichText = false;
  for (const node of chain.slice(1)) {
    const classes = classesOf(node);
    inRichText ||= classes.includes("rich-text-content");
    if (classes.includes("max-w-4xl")) {
      const capped = Math.min(width, 896);
      if (classes.includes("mx-auto")) left += (width - capped) / 2;
      width = capped;
    }
    if (classes.includes("px-4") || (inRichText && node.tag === "p")) {
      left += 16;
      width -= 32;
    }
  }
  return left;
}

function luminance(hex) {
  const [r, g, b] = [1, 3, 5]
    .map((start) => parseInt(hex.slice(start, start + 2), 16) / 255)
    .map((value) => (value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(first, second) {
  const [light, dark] = [luminance(first), luminance(second)].sort((a, b) => b - a);
  return (light + 0.05) / (dark + 0.05);
}

function token(css, selector, name) {
  const start = css.indexOf(`${selector} {`);
  const body = css.slice(start, css.indexOf("}", start));
  return new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`).exec(body)[1];
}

describe("Back to About Us link position", () => {
  for (const [name, { node, marker }] of Object.entries(endings)) {
    it(`comes after a post that ends in a ${name}, inside the card and before the sidebar`, async () => {
      const { html } = await renderPost(node);
      assert.equal(html.split(LINK_TEXT).length - 1, 1, "the link appears exactly once");
      const link = html.indexOf(LINK_TEXT);
      assert.ok(html.indexOf(marker) >= 0, "the post's last content rendered");
      assert.ok(html.indexOf(marker) < link, "the link comes after the last content");
      assert.ok(link < html.indexOf(SIDEBAR), "the link comes before the sidebar");
      assert.ok(
        ancestorsAt(html, LINK_TEXT).some((el) => classesOf(el).includes("bg-white")),
        "the link is inside the post body card"
      );
      assert.ok(
        !ancestorsAt(html, LINK_TEXT).some((el) => el.className.includes("rich-text-content") && el.tag === "li"),
        "the link is not inside the article's last list"
      );
    });
  }
});

describe("Back to About Us link behaviour", () => {
  it("goes to /about through next/link with the exact text", async () => {
    const { html, linkProps } = await renderPost();
    const props = linkProps.find((candidate) => candidate.children === LINK_TEXT);
    assert.ok(props, "the page renders it through next/link");
    assert.equal(props.href, "/about");
    assert.match(html, /<a [^>]*href="\/about"[^>]*>Back to About Us<\/a>/);
  });

  it("links to a route that exists", () => {
    assert.ok(existsSync(path.join(frontend, "about/page.tsx")));
  });

  it("is a real link the keyboard can reach", async () => {
    const { html } = await renderPost();
    const tag = /<a [^>]*>Back to About Us/.exec(html)[0];
    assert.doesNotMatch(tag, /tabindex="-1"/i);
    assert.doesNotMatch(tag, /aria-hidden|disabled/i);
  });

  it("uses the page's link style without the pulse", async () => {
    const { linkProps } = await renderPost();
    const classes = linkProps.find((candidate) => candidate.children === LINK_TEXT).className.split(/\s+/);
    for (const expected of ["underline", "text-accent", "dark:text-link"]) {
      assert.ok(classes.includes(expected), expected);
    }
    assert.ok(!classes.includes("animate-pulse"));
  });
});

describe("Back to About Us link readability", () => {
  const css = readFileSync(cssPath, "utf8");

  it("reaches 4.5:1 on the card in light and dark", () => {
    assert.ok(contrast(token(css, ":root", "accent"), token(css, ":root", "card")) >= 4.5);
    assert.ok(contrast(token(css, ".dark", "link"), token(css, ".dark", "card")) >= 4.5);
  });

  it("shows a solid 2px focus outline in both themes", async () => {
    const compiler = await compile(css, { base: path.dirname(cssPath), onDependency() {} });
    const { linkProps } = await renderPost();
    const classes = linkProps.find((candidate) => candidate.children === LINK_TEXT).className.split(/\s+/);
    const built = compiler.build(classes);
    assert.match(built, /focus-visible\\:outline-2[\s\S]*?outline-width: 2px/);
    assert.match(built, /focus-visible\\:outline-accent[\s\S]*?outline-color: var\(--accent\)/);
    assert.match(built, /dark\\:focus-visible\\:outline-link[\s\S]*?outline-color: var\(--link\)/);
  });
});

describe("Back to About Us link layout", () => {
  // Below 1024px the card fills the page minus the 20px side padding. From
  // 1024px it is a flex item, and the article's 896px cap limits its width.
  const cardWidths = {
    375: 335,
    768: 728,
    936: 896,
    937: 897,
    960: 920,
    1000: 960,
    1023: 983,
    1024: 896,
    1440: 896,
  };

  for (const [viewport, cardWidth] of Object.entries(cardWidths)) {
    it(`lines up with the article text at ${viewport}px`, async () => {
      const { html } = await renderPost();
      const article = textLeft(inCard(ancestorsAt(html, "LAST-CONTENT")), cardWidth);
      const link = textLeft(inCard(ancestorsAt(html, LINK_TEXT)), cardWidth);
      assert.equal(link, article, `link starts ${link}px into the card, article text ${article}px`);
    });
  }

  it("has space between the link and the card's bottom edge", async () => {
    const { html } = await renderPost();
    const chain = inCard(ancestorsAt(html, LINK_TEXT)).slice(1);
    assert.ok(chain.some((node) => classesOf(node).some((name) => /^pb-[1-9]/.test(name))));
  });
});
