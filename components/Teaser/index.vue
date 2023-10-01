<script setup lang="ts">
export interface Teaser extends Blok {
  headline: string;
}

const props = defineProps<{ blok: Teaser }>();
</script>

<template>
  <h1 v-editable="props.blok">
    {{ props.blok.headline }}
  </h1>
</template>

<style src="./style.scss" lang="scss" scoped></style>
