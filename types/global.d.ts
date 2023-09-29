type SbBlokData = import("@storyblok/vue/dist").SbBlokData;

type Blok = SbBlokData & {
  original_component?: string;
};
