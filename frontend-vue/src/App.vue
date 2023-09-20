<script setup>
import DelayedTable from './components/DelayedTable.vue'
import DelayedMap from './components/DelayedMap.vue'
</script>

<template>
  <div class="container">
    <DelayedTable />
    <DelayedMap />
  </div>
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
