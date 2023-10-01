<script setup lang="ts">
export interface Page extends Blok {
  body: Blok[];
}

const props = defineProps<{ blok: Page }>();
</script>

<template>
  <div v-editable="props.blok" class="px-4">
    <StoryblokComponent
      :is="_blok.component"
      v-for="_blok in props.blok.body"
      :key="_blok._uid"
      :blok="_blok"
    />
  </div>
</template>
