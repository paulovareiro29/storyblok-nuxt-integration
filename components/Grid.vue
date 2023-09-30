<script setup lang="ts">
import { GridColum } from "./GridColumn.vue";

export interface Grid extends Blok {
  columns: GridColum[];
}

const props = defineProps<{ blok: Grid }>();
</script>

<template>
  <div v-editable="blok" class="container mx-auto grid grid-cols-12">
    <StoryblokComponent
      v-for="_blok in props.blok.columns"
      :key="_blok._uid"
      :blok="_blok"
    />
  </div>
</template>
