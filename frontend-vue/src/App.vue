<script setup>
import Example from './components/Example.vue'
</script>

<template>
  <header>
    <h1>Hello world</h1>
  </header>
  <main>
    <Example />
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
