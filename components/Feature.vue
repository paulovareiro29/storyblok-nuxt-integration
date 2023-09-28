<script setup lang="ts">
export interface Feature extends Blok {
  name: string;
}

const props = defineProps<{ blok: Feature }>();
const { name } = props.blok;
</script>

<template>
  <div
    v-editable="blok"
    class="w-full p-12 bg-[#f7f6fd] rounded-[5px] text-center"
  >
    <h3 class="text-2xl text-[#1d243d] font-bold">
      {{ name }}
    </h3>
  </div>
</template>
