import { StoryblokService } from "./services/storyblok";

export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: true,
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

      const routes = [
        "/",
        ...(await StoryblokService.fetchAllRoutes(cacheVersion)),
      ];

      // @ts-ignore
      nitroConfig.prerender.routes.push(...routes);
    },
  },
});
