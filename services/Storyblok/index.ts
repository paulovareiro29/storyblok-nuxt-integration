const RoutesToIgnore: string[] = [];

const ComponentsMapping: Record<string, string> = {};

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
        if (!RoutesToIgnore.includes(link.slug) && !link.is_folder) {
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
  isComponent(blok: any): boolean {
    return blok?._uid && blok?.component;
  },
  isBlokArray(value: any) {
    return (
      Array.isArray(value) && value.every((blok) => this.isComponent(blok))
    );
  },
  /**
   *  Recursibly iterates on component object to map components according to ComponentsMapping
   *  The result component, if mapped, will have the field original_component with the original component name
   *  e.g:
   *   component -> mapped-component
   */
  parseComponent(component: Blok) {
    return Object.entries(component).reduce(
      (accumulator, [key, value]: any) => {
        if (!this.isBlokArray(value)) return { ...accumulator, [key]: value };

        const parsed = value.map((blok: Blok) => {
          if (!this.isComponent(blok)) return blok;

          const mappedComponent = ComponentsMapping[blok.component as string];

          if (mappedComponent) {
            blok.original_component = blok.component;
            blok.component = mappedComponent;
          }

          return this.parseComponent(blok);
        });

        return { ...accumulator, [key]: parsed };
      },
      {}
    );
  },
};
