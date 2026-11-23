// Tests for the real Header running the blog theme through React effects:
// entering and leaving /blog, the /blog 404 page, live system changes and the
// toggle in both directions.
//
// The repo has no DOM library, so a small fake gives react-dom/client the few
// node methods the Header needs. Route changes re-render the same Header with
// a new pathname, which is what a Next.js client navigation does to it.

import { afterEach, describe, it } from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { act, createElement } from "react";
import { createRoot } from "react-dom/client";
import { PathnameContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime.js";

import { blogThemeScript } from "./blog-theme.ts";
import { Header } from "../sections/header.tsx";

const HTML_NS = "http://www.w3.org/1999/xhtml";

class FakeNode {
  constructor(ownerDocument, nodeType, name, namespaceURI = HTML_NS) {
    this.ownerDocument = ownerDocument;
    this.nodeType = nodeType;
    this.nodeName = name.toUpperCase();
    this.tagName = this.nodeName;
    this.localName = name;
    this.namespaceURI = namespaceURI;
    this.parentNode = null;
    this.childNodes = [];
    this.attrs = new Map();
    this.style = {};
    this.nodeValue = null;
  }
  get firstChild() {
    return this.childNodes[0] ?? null;
  }
  get lastChild() {
    return this.childNodes.at(-1) ?? null;
  }
  get nextSibling() {
    const siblings = this.parentNode?.childNodes ?? [];
    return siblings[siblings.indexOf(this) + 1] ?? null;
  }
  get textContent() {
    if (this.nodeType === 3) return this.nodeValue;
    return this.childNodes.map((child) => child.textContent).join("");
  }
  set textContent(value) {
    for (const child of this.childNodes) child.parentNode = null;
    this.childNodes = [];
    if (value) this.appendChild(this.ownerDocument.createTextNode(value));
  }
  appendChild(child) {
    return this.insertBefore(child, null);
  }
  insertBefore(child, before) {
    child.parentNode?.removeChild(child);
    const index = before ? this.childNodes.indexOf(before) : this.childNodes.length;
    this.childNodes.splice(index, 0, child);
    child.parentNode = this;
    return child;
  }
  removeChild(child) {
    this.childNodes.splice(this.childNodes.indexOf(child), 1);
    child.parentNode = null;
    return child;
  }
  setAttribute(name, value) {
    this.attrs.set(name, String(value));
  }
  removeAttribute(name) {
    this.attrs.delete(name);
  }
  getAttribute(name) {
    return this.attrs.get(name) ?? null;
  }
  hasAttribute(name) {
    return this.attrs.has(name);
  }
  addEventListener() {}
  removeEventListener() {}
}

// One browser tab, with the globals blog-theme.ts and React read.
function openTab({ pathname, systemDark = false, saved = null }) {
  const store = new Map(saved ? [["blog-theme", saved]] : []);
  const mediaListeners = new Set();
  const system = { dark: systemDark };
  const observers = new Set();
  const classes = new Set();

  const doc = new FakeNode(null, 9, "#document");
  doc.createElement = (tag) => new FakeNode(doc, 1, tag);
  doc.createElementNS = (ns, tag) => new FakeNode(doc, 1, tag, ns);
  doc.createTextNode = (text) => {
    const node = new FakeNode(doc, 3, "#text");
    node.nodeValue = text;
    return node;
  };
  const html = new FakeNode(doc, 1, "html");
  const changed = () => observers.forEach((notify) => notify());
  html.classList = {
    contains: (name) => classes.has(name),
    add(name) {
      classes.add(name);
      changed();
    },
    remove(name) {
      classes.delete(name);
      changed();
    },
    toggle(name, force) {
      const on = force ?? !classes.has(name);
      if (on) classes.add(name);
      else classes.delete(name);
      changed();
      return on;
    },
  };
  html.style = { colorScheme: "" };
  doc.documentElement = html;
  doc.body = new FakeNode(doc, 1, "body");
  doc.activeElement = doc.body;

  class HTMLIFrameElement {}
  const view = { document: doc, HTMLIFrameElement, event: undefined };
  doc.defaultView = view;

  class MutationObserver {
    constructor(callback) {
      this.notify = () => callback([], this);
    }
    observe() {
      observers.add(this.notify);
    }
    disconnect() {
      observers.delete(this.notify);
    }
  }

  const env = {
    window: view,
    // next/link schedules its prefetch through self.setTimeout. Doing nothing
    // here keeps prefetching, which needs a real router, out of these tests.
    self: { setTimeout: () => 0, clearTimeout: () => {} },
    document: doc,
    location: { pathname },
    localStorage: {
      getItem: (key) => store.get(key) ?? null,
      setItem: (key, value) => store.set(key, String(value)),
      removeItem: (key) => store.delete(key),
    },
    matchMedia: () => ({
      get matches() {
        return system.dark;
      },
      addEventListener: (_type, fn) => mediaListeners.add(fn),
      removeEventListener: (_type, fn) => mediaListeners.delete(fn),
    }),
    MutationObserver,
  };

  return {
    env,
    html,
    doc,
    store,
    mediaListeners,
    isDark: () => classes.has("dark"),
    setSystemDark(dark) {
      system.dark = dark;
      for (const fn of [...mediaListeners]) fn({ matches: dark });
    },
  };
}

const GLOBALS = ["window", "self", "document", "location", "localStorage", "matchMedia", "MutationObserver"];
const originals = new Map(
  GLOBALS.map((name) => [name, Object.getOwnPropertyDescriptor(globalThis, name)])
);

function install(tab) {
  for (const name of GLOBALS) {
    Object.defineProperty(globalThis, name, {
      value: tab.env[name],
      configurable: true,
      writable: true,
    });
  }
}

let mounted = null;

afterEach(async () => {
  if (mounted) await act(async () => mounted.unmount());
  mounted = null;
  for (const [name, descriptor] of originals) {
    if (descriptor) Object.defineProperty(globalThis, name, descriptor);
    else delete globalThis[name];
  }
  delete globalThis.IS_REACT_ACT_ENVIRONMENT;
});

const tree = (pathname) =>
  createElement(PathnameContext.Provider, { value: pathname }, createElement(Header));

// A full page load: the <head> script runs, then React mounts the Header.
async function load(options) {
  const tab = openTab(options);
  install(tab);
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  vm.runInNewContext(blogThemeScript, { ...tab.env });
  const container = new FakeNode(tab.doc, 1, "div");
  const root = createRoot(container);
  mounted = root;
  await act(async () => root.render(tree(options.pathname)));
  tab.container = container;
  tab.go = (pathname) => act(async () => root.render(tree(pathname)));
  return tab;
}

function toggles(node, found = []) {
  if (/^Switch to (dark|light) mode$/.test(node.getAttribute("aria-label") ?? "")) found.push(node);
  for (const child of node.childNodes) toggles(child, found);
  return found;
}

const labels = (tab) => toggles(tab.container).map((button) => button.getAttribute("aria-label"));

async function click(button) {
  const key = Object.keys(button).find((name) => name.startsWith("__reactProps$"));
  await act(async () => button[key].onClick());
}

describe("Header on and off /blog", () => {
  it("shows the toggle in the desktop and mobile nav on blog paths only", async () => {
    const blog = await load({ pathname: "/blog" });
    assert.equal(toggles(blog.container).length, 2);
    await blog.go("/blog/some-post");
    assert.equal(toggles(blog.container).length, 2);
    for (const pathname of ["/", "/about", "/contact-us", "/blogger"]) {
      await blog.go(pathname);
      assert.equal(toggles(blog.container).length, 0, pathname);
    }
  });

  it("stays light on other routes with a dark system and dark saved", async () => {
    const tab = await load({ pathname: "/about", systemDark: true, saved: "dark" });
    assert.equal(tab.isDark(), false);
    assert.equal(tab.html.style.colorScheme, "");
  });

  it("applies the theme when a link enters /blog and removes it on leaving", async () => {
    const tab = await load({ pathname: "/", systemDark: true });
    assert.equal(tab.isDark(), false);
    await tab.go("/blog");
    assert.equal(tab.isDark(), true);
    assert.equal(tab.html.style.colorScheme, "dark");
    await tab.go("/about");
    assert.equal(tab.isDark(), false);
    assert.equal(tab.html.style.colorScheme, "");
  });

  it("makes /about light after a dark post, and Back returns to dark", async () => {
    const tab = await load({ pathname: "/blog/some-post", saved: "dark" });
    assert.equal(tab.isDark(), true);
    await tab.go("/about");
    assert.equal(tab.isDark(), false);
    assert.equal(tab.html.style.colorScheme, "");
    assert.equal(toggles(tab.container).length, 0);
    await tab.go("/blog/some-post");
    assert.equal(tab.isDark(), true);
    assert.equal(tab.html.style.colorScheme, "dark");
  });
});

describe("Header on a missing /blog page", () => {
  it("removes dark when leaving the 404 on a dark system", async () => {
    const tab = await load({ pathname: "/blog/no-such-post", systemDark: true });
    assert.equal(tab.isDark(), true);
    await tab.go("/");
    assert.equal(tab.isDark(), false);
    assert.equal(tab.html.style.colorScheme, "");
  });

  it("is dark again after the back button, light again after forward", async () => {
    const tab = await load({ pathname: "/blog/no-such-post", systemDark: true });
    await tab.go("/");
    await tab.go("/blog/no-such-post");
    assert.equal(tab.isDark(), true);
    await tab.go("/");
    assert.equal(tab.isDark(), false);
  });

  it("keeps a choice made on the 404 for /blog without leaking it to /", async () => {
    const tab = await load({ pathname: "/blog/no-such-post", systemDark: false });
    assert.equal(tab.isDark(), false);
    await click(toggles(tab.container)[0]);
    assert.equal(tab.isDark(), true);
    assert.equal(tab.store.get("blog-theme"), "dark");
    await tab.go("/");
    assert.equal(tab.isDark(), false);
    assert.equal(toggles(tab.container).length, 0);
    await tab.go("/blog");
    assert.equal(tab.isDark(), true);
  });
});

describe("Header following the system setting", () => {
  it("follows live changes on /blog while nothing is saved", async () => {
    const tab = await load({ pathname: "/blog", systemDark: false });
    await act(async () => tab.setSystemDark(true));
    assert.equal(tab.isDark(), true);
    await act(async () => tab.setSystemDark(false));
    assert.equal(tab.isDark(), false);
  });

  it("ignores live changes once a choice is saved", async () => {
    const tab = await load({ pathname: "/blog", systemDark: false, saved: "light" });
    await act(async () => tab.setSystemDark(true));
    assert.equal(tab.isDark(), false);
  });

  it("stops listening after leaving /blog", async () => {
    const tab = await load({ pathname: "/blog", systemDark: false });
    assert.equal(tab.mediaListeners.size, 1);
    await tab.go("/about");
    assert.equal(tab.mediaListeners.size, 0);
    await act(async () => tab.setSystemDark(true));
    assert.equal(tab.isDark(), false);
  });
});

describe("Header toggle after hydration", () => {
  it("switches dark to light and back, and both toggles agree", async () => {
    const tab = await load({ pathname: "/blog", systemDark: true });
    assert.deepEqual(labels(tab), ["Switch to light mode", "Switch to light mode"]);

    await click(toggles(tab.container)[0]);
    assert.equal(tab.isDark(), false);
    assert.equal(tab.html.style.colorScheme, "light");
    assert.equal(tab.store.get("blog-theme"), "light");
    assert.deepEqual(labels(tab), ["Switch to dark mode", "Switch to dark mode"]);

    await click(toggles(tab.container)[1]);
    assert.equal(tab.isDark(), true);
    assert.equal(tab.html.style.colorScheme, "dark");
    assert.equal(tab.store.get("blog-theme"), "dark");
    assert.deepEqual(labels(tab), ["Switch to light mode", "Switch to light mode"]);
  });
});
