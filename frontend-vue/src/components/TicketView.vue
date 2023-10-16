<template>
  <div class="ticket-container">
    <a href="" @click.prevent="renderTrainsView">&#8592; Tillbaka</a>
    <div v-if="this.$store.jwt" class="ticket">
      <NewTickets @ticketAdded="fetchOldTickets"/>
    </div>
    <br />
    <OldTickets ref="OldTickets"/>
  </div>
</template>

<script>
import OldTickets from './OldTickets.vue'
import NewTickets from './NewTickets.vue'

export default {
  components: {
    OldTickets,
    NewTickets
  },
  beforeCreate() {
    // When logged in
    // Check if there is a train in store, if not redirect to '/'
    if (this.$store.jwt && !this.$store.train) {
      this.$router.push('/')
    }
  },
  methods: {
    renderTrainsView() {
      this.$router.push('/')
    },
    fetchOldTickets(data) {
      // Rerender the oldTicket component by "re-fetching" data from API 
      this.$refs.OldTickets.fetchTickets(data)
    }
  }
};
</script>
