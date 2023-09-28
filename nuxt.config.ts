import { StoryblokService } from "./services/Storyblok";

export default defineNuxtConfig({
  devtools: { enabled: true },
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
      if (!nitroConfig || nitroConfig.dev) {
        return;
      }
      const token = process.env.STORYBLOK_TOKEN;

      let cache_version = 0;

      // other routes that are not in Storyblok with their slug.
      let routes = ["/"]; // adds home directly but with / instead of /home
      try {
        const result = await fetch(
          `https://api.storyblok.com/v2/cdn/spaces/me?token=${token}`
        );

        if (!result.ok) {
          throw new Error("Could not fetch Storyblok data");
        }
        // timestamp of latest publish
        const space = await result.json();

        cache_version = space.space.version;

        await StoryblokService.fetchStories(routes, cache_version);

        // @ts-ignore
        nitroConfig.prerender.routes.push(...routes);
      } catch (error) {
        console.error(error);
      }
    },
  },
});
