<script setup lang="ts">
import { GridColum } from "./GridColumn.vue";

export interface Grid extends Blok {
  columns: GridColum[];
}

const props = defineProps<{ blok: Grid }>();
const { columns } = props.blok;
</script>

<template>
  <div v-editable="blok" class="container mx-auto grid grid-cols-12">
    <StoryblokComponent v-for="blok in columns" :key="blok._uid" :blok="blok" />
  </div>
</template>
