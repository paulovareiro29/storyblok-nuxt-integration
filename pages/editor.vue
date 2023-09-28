<script setup lang="ts">
const { path } = useRoute().query;

const slug = (path as string)?.replace("/", "");

const story = await useAsyncStoryblok(slug && slug.length > 0 ? slug : "home", {
  version: "draft",
  cv: +new Date(),
});
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>
