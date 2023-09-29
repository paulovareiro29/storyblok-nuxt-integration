<script setup lang="ts">
export interface Teaser extends Blok {
  headline: string;
}

const props = defineProps<{ blok: Teaser }>();
const { headline } = props.blok;
</script>

<template>
  <h1 v-editable="blok">
    {{ headline }}
  </h1>
</template>

<style src="./style.scss" lang="scss" scoped></style>
