<script setup lang="ts">
defineProps<{
  step: number;
  done: boolean;
  next: () => void;
  prev: () => void;
}>();
</script>

<template>
  <div class="mt-8 flex gap-4">
    <button
      @click="prev"
      :disabled="step == 0"
      class="rounded-lg bg-gray-800 px-3 py-2 font-medium text-white active:bg-gray-950 disabled:bg-gray-200 disabled:text-gray-400">
      Prev
    </button>
    <button
      @click="next"
      :disabled="done"
      class="rounded-lg bg-gray-800 px-3 py-2 font-medium text-white active:bg-gray-950 disabled:bg-gray-200 disabled:text-gray-400">
      Next
    </button>
  </div>
</template>
