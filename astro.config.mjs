import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

export default defineConfig({
  site: isGitHubPages
    ? "https://tarek-prod.github.io"
    : "https://salahpub.netlify.app",
  base: isGitHubPages ? "/salahpub" : "/",
  trailingSlash: "always",
  vite: {
    plugins: [tailwindcss()],
  },
});
