import components from "./components";

const STORYBLOK_TOKEN = process.env.STORYBLOK_TOKEN;
const API_URL = "https://api.storyblok.com/v2/";

const RoutesToIgnore: string[] = [];

export const StoryblokService = {
  async getLatestCacheVersion(): Promise<number> {
    const result = await fetch(
      `${API_URL}cdn/spaces/me?token=${STORYBLOK_TOKEN}`,
    );

    if (!result.ok) {
      // eslint-disable-next-line no-console
      console.error("Failed to fetch Storyblok latest cache version");
      return +new Date();
    }

    const space = await result.json();
    return space.space.version;
  },
  async fetchAllRoutes(
    cacheVersion: number,
    page: number = 1,
  ): Promise<string[]> {
    const version = "published";
    const perPage = 100;

    const routes: string[] = [];

    try {
      const response = await fetch(
        `${API_URL}cdn/links?token=${STORYBLOK_TOKEN}&version=${version}&per_page=${perPage}&page=${page}&cv=${cacheVersion}`,
      );
      const data = await response.json();

      Object.values(data.links).forEach((link: any) => {
        if (!RoutesToIgnore.includes(link.slug) && !link.is_folder) {
          routes.push(link.real_path);
        }
      });

      const total = parseInt(response.headers.get("total") || "0");
      const maxPage = Math.ceil(total / perPage);

      if (maxPage > page) {
        return [
          ...routes,
          ...(await StoryblokService.fetchAllRoutes(cacheVersion, ++page)),
        ];
      }

      return routes;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return [];
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

          const mappedComponent = components[blok.component as string];

          if (mappedComponent) {
            blok.original_component = blok.component;
            blok.component = mappedComponent;
          }

          return this.parseComponent(blok);
        });

        return { ...accumulator, [key]: parsed };
      },
      {},
    );
  },
};
