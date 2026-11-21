// Tests for dark mode on /blog: the theme helpers, the pre-paint script the
// root layout puts in <head>, and the header toggle.
//
// Run with `npm test`. That is Node's built-in test runner started through tsx
// (already installed through payload), so the .ts and .tsx sources load as is.
// tsconfig.test.json switches JSX to the automatic runtime, because the main
// tsconfig leaves JSX to Next ("preserve").
// There is no browser DOM here: a small fake stands in for localStorage,
// matchMedia and <html>.

import { afterEach, describe, it } from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import {
  BLOG_THEME_KEY,
  applyBlogTheme,
  blogThemeScript,
  getBlogTheme,
  getSavedBlogTheme,
  isBlogPath,
  saveBlogTheme,
  watchSystemTheme,
} from "./blog-theme.ts";
import { BlogThemeToggle } from "./BlogThemeToggle.tsx";

// ---------------------------------------------------------------------------
// Fake browser

function fakeStorage(entries = {}) {
  const map = new Map(Object.entries(entries));
  return {
    getItem: (key) => (map.has(key) ? map.get(key) : null),
    setItem: (key, value) => map.set(key, String(value)),
    removeItem: (key) => map.delete(key),
  };
}

// Safari private mode and blocked cookies throw on any storage access.
function blockedStorage() {
  const fail = () => {
    throw new Error("SecurityError: storage is blocked");
  };
  return { getItem: fail, setItem: fail, removeItem: fail };
}

function fakeDocument() {
  const classes = new Set();
  return {
    documentElement: {
      classList: {
        add: (name) => classes.add(name),
        remove: (name) => classes.delete(name),
        contains: (name) => classes.has(name),
        toggle: (name, force) => {
          const on = force ?? !classes.has(name);
          if (on) classes.add(name);
          else classes.delete(name);
          return on;
        },
      },
      style: { colorScheme: "" },
    },
  };
}

// One browser tab: a page at `pathname` with a system colour setting and a
// storage. Passing the same storage to a second browser() is a reload.
function browser({ pathname = "/blog", systemDark = false, storage = fakeStorage() } = {}) {
  const listeners = new Set();
  const system = { dark: systemDark };
  const env = {
    location: { pathname },
    localStorage: storage,
    document: fakeDocument(),
    matchMedia: (query) => {
      assert.equal(query, "(prefers-color-scheme: dark)");
      return {
        get matches() {
          return system.dark;
        },
        addEventListener: (type, fn) => type === "change" && listeners.add(fn),
        removeEventListener: (type, fn) => type === "change" && listeners.delete(fn),
      };
    },
  };
  return {
    env,
    storage,
    listenerCount: () => listeners.size,
    setSystemDark(dark) {
      system.dark = dark;
      for (const fn of listeners) fn({ matches: dark });
    },
    isDark: () => env.document.documentElement.classList.contains("dark"),
    colorScheme: () => env.document.documentElement.style.colorScheme,
  };
}

// blog-theme.ts reads these as globals, the way a browser has them.
const GLOBALS = ["location", "localStorage", "document", "matchMedia"];
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
  return tab;
}

afterEach(() => {
  for (const [name, descriptor] of originals) {
    if (descriptor) Object.defineProperty(globalThis, name, descriptor);
    else delete globalThis[name];
  }
});

// Runs the <head> script the way the browser does on a full page load.
function runPrePaintScript(tab) {
  vm.runInNewContext(blogThemeScript, { ...tab.env });
  return tab;
}

// Renders the toggle as the server and the first client render see it, and
// hands back the <button> element so a test can call its onClick.
function renderToggle() {
  let button;
  function Probe() {
    button = BlogThemeToggle({});
    return button;
  }
  const html = renderToStaticMarkup(createElement(Probe));
  return { html, button };
}

// ---------------------------------------------------------------------------

describe("isBlogPath", () => {
  it("is true for the blog index and posts", () => {
    for (const path of ["/blog", "/blog/", "/blog/some-post"]) {
      assert.equal(isBlogPath(path), true, path);
    }
  });

  it("is false for every other route, including look-alikes", () => {
    for (const path of ["/", "/about", "/contact-us", "/blogger", "/blog-archive", "/x/blog", null]) {
      assert.equal(isBlogPath(path), false, String(path));
    }
  });
});

describe("saved preference", () => {
  it("reads 'light' and 'dark' from the blog-theme key", () => {
    assert.equal(BLOG_THEME_KEY, "blog-theme");
    install(browser({ storage: fakeStorage({ "blog-theme": "dark" }) }));
    assert.equal(getSavedBlogTheme(), "dark");
    install(browser({ storage: fakeStorage({ "blog-theme": "light" }) }));
    assert.equal(getSavedBlogTheme(), "light");
  });

  it("ignores a missing or unknown value", () => {
    install(browser());
    assert.equal(getSavedBlogTheme(), null);
    install(browser({ storage: fakeStorage({ "blog-theme": "purple" }) }));
    assert.equal(getSavedBlogTheme(), null);
  });

  it("returns null instead of throwing when storage is blocked", () => {
    install(browser({ storage: blockedStorage() }));
    assert.equal(getSavedBlogTheme(), null);
  });

  it("saveBlogTheme stores the choice and applies it", () => {
    const tab = install(browser({ systemDark: false }));
    saveBlogTheme("dark");
    assert.equal(tab.storage.getItem("blog-theme"), "dark");
    assert.equal(tab.isDark(), true);
    assert.equal(tab.colorScheme(), "dark");

    saveBlogTheme("light");
    assert.equal(tab.storage.getItem("blog-theme"), "light");
    assert.equal(tab.isDark(), false);
    assert.equal(tab.colorScheme(), "light");
  });

  it("saveBlogTheme still switches the page when storage is blocked", () => {
    const tab = install(browser({ storage: blockedStorage() }));
    assert.doesNotThrow(() => saveBlogTheme("dark"));
    assert.equal(tab.isDark(), true);
  });
});

describe("getBlogTheme", () => {
  it("follows the system setting when nothing is saved", () => {
    install(browser({ systemDark: true }));
    assert.equal(getBlogTheme(), "dark");
    install(browser({ systemDark: false }));
    assert.equal(getBlogTheme(), "light");
  });

  it("lets the saved choice override the system setting", () => {
    install(browser({ systemDark: true, storage: fakeStorage({ "blog-theme": "light" }) }));
    assert.equal(getBlogTheme(), "light");
    install(browser({ systemDark: false, storage: fakeStorage({ "blog-theme": "dark" }) }));
    assert.equal(getBlogTheme(), "dark");
  });
});

describe("applyBlogTheme", () => {
  it("adds and removes the dark class and sets color-scheme", () => {
    const tab = install(browser());
    applyBlogTheme("dark");
    assert.equal(tab.isDark(), true);
    assert.equal(tab.colorScheme(), "dark");
    applyBlogTheme("light");
    assert.equal(tab.isDark(), false);
    assert.equal(tab.colorScheme(), "light");
  });

  it("null clears both, which is what leaving /blog does", () => {
    const tab = install(browser());
    applyBlogTheme("dark");
    applyBlogTheme(null);
    assert.equal(tab.isDark(), false);
    assert.equal(tab.colorScheme(), "");
  });
});

describe("watchSystemTheme", () => {
  it("reports system changes until stopped", () => {
    const tab = install(browser({ systemDark: false }));
    let calls = 0;
    const stop = watchSystemTheme(() => calls++);
    tab.setSystemDark(true);
    assert.equal(calls, 1);
    stop();
    assert.equal(tab.listenerCount(), 0);
    tab.setSystemDark(false);
    assert.equal(calls, 1);
  });
});

describe("pre-paint script in <head>", () => {
  it("makes /blog dark before first paint when the system is dark", () => {
    const tab = runPrePaintScript(browser({ pathname: "/blog", systemDark: true }));
    assert.equal(tab.isDark(), true);
    assert.equal(tab.colorScheme(), "dark");
  });

  it("makes a post dark before first paint when the system is dark", () => {
    const tab = runPrePaintScript(browser({ pathname: "/blog/some-post", systemDark: true }));
    assert.equal(tab.isDark(), true);
  });

  it("leaves the blog light when the system is light", () => {
    const tab = runPrePaintScript(browser({ pathname: "/blog", systemDark: false }));
    assert.equal(tab.isDark(), false);
    assert.equal(tab.colorScheme(), "light");
  });

  it("uses the saved choice over the system setting", () => {
    const light = runPrePaintScript(
      browser({ systemDark: true, storage: fakeStorage({ "blog-theme": "light" }) })
    );
    assert.equal(light.isDark(), false);
    assert.equal(light.colorScheme(), "light");

    const dark = runPrePaintScript(
      browser({ systemDark: false, storage: fakeStorage({ "blog-theme": "dark" }) })
    );
    assert.equal(dark.isDark(), true);
  });

  it("falls back to the system setting when storage is blocked", () => {
    const tab = browser({ systemDark: true, storage: blockedStorage() });
    assert.doesNotThrow(() => runPrePaintScript(tab));
    assert.equal(tab.isDark(), true);
  });

  it("does nothing on other routes, even with dark saved and a dark system", () => {
    for (const pathname of ["/", "/about", "/contact-us", "/blogger", "/blog-archive"]) {
      const tab = runPrePaintScript(
        browser({ pathname, systemDark: true, storage: fakeStorage({ "blog-theme": "dark" }) })
      );
      assert.equal(tab.isDark(), false, pathname);
      assert.equal(tab.colorScheme(), "", pathname);
    }
  });

  it("agrees with getBlogTheme for every saved value and system setting", () => {
    for (const saved of [undefined, "light", "dark", "purple"]) {
      for (const systemDark of [false, true]) {
        const entries = saved === undefined ? {} : { "blog-theme": saved };
        const script = runPrePaintScript(browser({ systemDark, storage: fakeStorage(entries) }));
        install(browser({ systemDark, storage: fakeStorage(entries) }));
        const label = `saved=${saved} systemDark=${systemDark}`;
        assert.equal(script.colorScheme(), getBlogTheme(), label);
        assert.equal(script.isDark(), getBlogTheme() === "dark", label);
      }
    }
  });
});

describe("BlogThemeToggle", () => {
  it("renders an accessible button with both icons, picked by CSS", () => {
    install(browser());
    const { html } = renderToggle();
    assert.match(html, /^<button type="button"/);
    assert.match(html, /aria-label="Switch to dark mode"/);
    assert.match(html, /title="Switch to dark mode"/);
    // The moon shows in light and the sun in dark through the dark: variant,
    // so the icon is right on first paint, before React hydrates.
    assert.match(html, /<svg[^>]*class="[^"]*lucide-moon[^"]*dark:hidden/);
    assert.match(html, /<svg[^>]*class="[^"]*lucide-sun[^"]*hidden dark:block/);
    assert.equal((html.match(/aria-hidden="true"/g) ?? []).length, 2);
  });

  it("clicking it in light mode switches to dark and saves the choice", () => {
    const tab = install(browser({ systemDark: false }));
    const { button } = renderToggle();
    button.props.onClick();
    assert.equal(tab.storage.getItem("blog-theme"), "dark");
    assert.equal(tab.isDark(), true);
    assert.equal(tab.colorScheme(), "dark");
  });

  it("keeps the choice made with the toggle after a reload", () => {
    // First visit: the system is light, so the blog loads light.
    const storage = fakeStorage();
    const first = install(runPrePaintScript(browser({ systemDark: false, storage })));
    assert.equal(first.isDark(), false);

    renderToggle().button.props.onClick();
    assert.equal(first.isDark(), true);

    // Reload a post: same storage, system still light. The saved 'dark' wins.
    const reload = runPrePaintScript(browser({ pathname: "/blog/some-post", systemDark: false, storage }));
    assert.equal(reload.isDark(), true);
    assert.equal(reload.colorScheme(), "dark");
  });

  it("keeps a saved 'light' after a reload on a dark system", () => {
    const storage = fakeStorage();
    install(runPrePaintScript(browser({ systemDark: true, storage })));
    saveBlogTheme("light"); // what the toggle does when the page is dark
    const reload = runPrePaintScript(browser({ systemDark: true, storage }));
    assert.equal(reload.isDark(), false);
    assert.equal(reload.colorScheme(), "light");
  });
});
