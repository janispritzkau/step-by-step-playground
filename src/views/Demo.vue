<script setup lang="ts">
import { ref } from "vue";
import { useExecutor } from "~/composables/executor";
import Stepper from "~/components/Stepper.vue";

const title = ref("");
const description = ref("");

const { step, done, next, prev } = useExecutor(function* () {
  title.value = "First step";
  description.value = "This is the first step";
  yield;
  title.value = "Second step";
  description.value = "Here is the second step";
  yield;
  title.value = "Third step";
  description.value = "Finally, the third and last step";
});
</script>

<template>
  <h1 class="heading">{{ title }}</h1>

  <p class="subheading">{{ description }}</p>

  <Stepper :step="step" :done="done" :next="next" :prev="prev" />
</template>
