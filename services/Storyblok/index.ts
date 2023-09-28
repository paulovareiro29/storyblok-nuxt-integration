const toIgnore: string[] = [];

export const StoryblokService = {
  async fetchStories(routes: string[], cacheVersion: number, page: number = 1) {
    const token = process.env.STORYBLOK_TOKEN;
    const version = "published";
    const perPage = 100;

    try {
      const response = await fetch(
        `https://api.storyblok.com/v2/cdn/links?token=${token}&version=${version}&per_page=${perPage}&page=${page}&cv=${cacheVersion}`
      );
      const data = await response.json();

      // Add routes to the array
      Object.values(data.links).forEach((link: any) => {
        if (!toIgnore.includes(link.slug) && !link.is_folder) {
          routes.push(link.real_path);
        }
      });

      // Check if there are more pages with links
      const total = parseInt(response.headers.get("total") || "0");
      const maxPage = Math.ceil(total / perPage);

      if (maxPage > page) {
        await StoryblokService.fetchStories(routes, cacheVersion, ++page);
      }
    } catch (error) {
      console.error(error);
    }
  },
};
