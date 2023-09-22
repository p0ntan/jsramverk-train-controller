<template>
  <div class="ticket-container">
    <div class="ticket">
      <NewTickets />
    </div>
    <br />
    <OldTickets />
  </div>
</template>

<script setup>
import OldTickets from './OldTickets.vue'
import NewTickets from './NewTickets.vue'
</script>
