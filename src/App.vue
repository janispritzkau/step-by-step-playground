<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <nav class="my-8">
    <ul class="flex gap-8">
      <li v-for="route in router.getRoutes().filter((route) => route.meta.title)" :key="route.path">
        <RouterLink
          :to="route.path"
          class="block border-blue-700/20 py-1 font-medium text-blue-500 aria-[current=page]:border-b-2 aria-[current=page]:text-blue-700"
          v-text="route.meta.title" />
      </li>
    </ul>
  </nav>

  <main class="mb-8">
    <RouterView />
  </main>
</template>

<style>
#app {
  @apply mx-auto px-8 md:max-w-screen-md;
}
</style>
