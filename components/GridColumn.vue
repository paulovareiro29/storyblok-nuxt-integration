<script setup lang="ts">
export interface GridColum extends Blok {
  span: number;
  body: Blok[];
}

const props = defineProps<{ blok: GridColum }>();
const { span, body } = props.blok;
</script>

<template>
  <div v-editable="blok" :class="`col-span-${span}`">
    <StoryblokComponent
      :is="blok.component"
      v-for="blok in body"
      :key="blok._uid"
      :blok="blok"
    />
  </div>
</template>
