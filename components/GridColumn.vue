<script setup lang="ts">
export interface GridColum extends Blok {
  span: number;
  body: Blok[];
}

const props = defineProps<{ blok: GridColum }>();
</script>

<template>
  <div v-editable="blok" :class="`col-span-${props.blok.span}`">
    <StoryblokComponent
      :is="_blok.component"
      v-for="_blok in props.blok.body"
      :key="_blok._uid"
      :blok="_blok"
    />
  </div>
</template>
