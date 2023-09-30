<script setup lang="ts">
import { StoryblokService } from "~/services/storyblok";
const { slug } = useRoute().params;

const story = await useAsyncStoryblok(
  slug && slug.length > 0 ? (slug as []).join("/") : "home",
  { version: "published", cv: +new Date() },
);
</script>

<template>
  <StoryblokComponent
    v-if="story"
    :blok="StoryblokService.parseComponent(story.content)"
  />
</template>
