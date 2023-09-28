<script setup lang="ts">
export interface Teaser extends Blok {
  headline: string;
}

const props = defineProps<{ blok: Teaser }>();
const { headline } = props.blok;
</script>

<template>
  <div
    v-editable="blok"
    class="py-32 text-6xl text-[#50b0ae] font-bold text-center"
  >
    {{ headline }}
  </div>
</template>
