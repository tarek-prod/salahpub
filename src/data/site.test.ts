import { describe, expect, it } from "vitest";
import { site } from "./site";

describe("site data", () => {
  it("has the official identity", () => {
    expect(site.identity.name).toBe("SalahPub");
    expect(site.identity.slogan).toBe("Votre image, notre métier");
  });

  it("has valid contact fields", () => {
    expect(site.identity.phone).toMatch(/\d/);
    expect(site.identity.email).toContain("@");
  });

  it("has at least five complete services", () => {
    expect(site.services.length).toBeGreaterThanOrEqual(5);
    for (const service of site.services) {
      expect(service.title.length).toBeGreaterThan(0);
      expect(service.slug).toMatch(/^[a-z0-9-]+$/);
      expect(service.description.length).toBeGreaterThan(0);
    }
  });

  it("has enough engagements and FAQ entries", () => {
    expect(site.engagements.length).toBeGreaterThanOrEqual(6);
    expect(site.faq.length).toBeGreaterThanOrEqual(4);
  });

  it("has navigation entries for all primary pages", () => {
    const hrefs = site.navigation.map((item) => item.href);
    for (const href of [
      "/",
      "/services",
      "/realizations",
      "/about",
      "/faq",
      "/contact",
    ]) {
      expect(hrefs).toContain(href);
    }
  });
});
