import { StoryblokService } from "./services/storyblok";

const env = process.env.NODE_ENV || "dev";
const ignore = env === "production" ? ["pages/editor.vue"] : undefined;

export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: true,
  ignore,
  components: {
    global: true,
    dirs: ["~/components"],
  },
  modules: [
    [
      "@storyblok/nuxt",
      {
        accessToken: process.env.STORYBLOK_TOKEN,
      },
    ],
    "@nuxtjs/tailwindcss",
  ],
  hooks: {
    async "nitro:config"(nitroConfig) {
      if (!nitroConfig || nitroConfig.dev) return;

      const cacheVersion = await StoryblokService.getLatestCacheVersion();

      const routes: string[] = [
        "/",
        ...(await StoryblokService.fetchAllRoutes(cacheVersion)),
      ];

      // @ts-ignore
      nitroConfig.prerender.routes.push(...routes);
    },
  },
});
