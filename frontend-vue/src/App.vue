<script setup>
import Example from './components/Example.vue'
import Delayed from './components/Delayed.vue'
</script>

<template>
  <main>
    <!-- <Example /> -->
    <Delayed />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
}
</style>
