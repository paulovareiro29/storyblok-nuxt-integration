<script setup lang="ts">
const story = await useAsyncStoryblok("error-404", {
  version: "published",
  cv: +new Date(),
});
</script>

<template>
  <StoryblokComponent v-if="story" :blok="story.content" />
</template>
