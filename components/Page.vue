<script setup lang="ts">
export interface Page extends Blok {
  body: Blok[];
}

const props = defineProps<{ blok: Page }>();
const { body } = props.blok;
</script>

<template>
  <div v-editable="blok" class="px-4">
    <StoryblokComponent
      :is="blok.component"
      v-for="blok in body"
      :key="blok._uid"
      :blok="blok"
    />
  </div>
</template>
