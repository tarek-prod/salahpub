import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const dist = join(process.cwd(), "dist");
const baseUrl = process.env.GITHUB_ACTIONS === "true" ? "/salahpub/" : "/";
const pages = ["index", "services", "realizations", "about", "faq", "contact", "article"];

const outputPath = (page: string) =>
  page === "index"
    ? join(dist, "index.html")
    : join(dist, page, "index.html");

const readPage = (page: string) => readFileSync(outputPath(page), "utf-8");

describe("generated site", () => {
  it("builds all seven pages", () => {
    for (const page of pages) {
      expect(existsSync(outputPath(page))).toBe(true);
    }
  });

  it("homepage shows identity, slogan, and services", () => {
    const html = readPage("index");
    expect(html).toContain("SalahPub");
    expect(html).toContain("Votre image, notre métier");
    expect(html).toContain("Enseignes &amp; signalétique");
  });

  it("uses the correct base path for internal links and images", () => {
    const html = readPage("index");
    expect(html).toContain(`href="${baseUrl}contact/`);
    expect(html).toContain(`src="${baseUrl}images/realization-1.svg"`);
  });

  it("every page has French language metadata and a title", () => {
    for (const page of pages) {
      const html = readPage(page);
      expect(html).toContain('lang="fr"');
      expect(html).toMatch(/<title>.+<\/title>/);
    }
  });

  it("contact page posts to Formspree", () => {
    expect(readPage("contact")).toContain("formspree.io/f/xkjrzewo");
  });

  it("ships the favicon and realization placeholders", () => {
    expect(existsSync(join(dist, "favicon.svg"))).toBe(true);
    for (let index = 1; index <= 6; index += 1) {
      expect(existsSync(join(dist, "images", `realization-${index}.svg`))).toBe(true);
    }
  });
});
