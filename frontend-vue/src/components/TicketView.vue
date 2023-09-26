<template>
  <div class="ticket-container">
    <div class="ticket">
      <NewTickets @ticketAdded="fetchOldTickets"/>
    </div>
    <br />
    <OldTickets ref="OldTickets" />
  </div>
</template>

<script>
// Store is used to store train-data
import store from '../store/store'

import OldTickets from './OldTickets.vue'
import NewTickets from './NewTickets.vue'

export default {
  components: {
    OldTickets,
    NewTickets
  },
  beforeCreate() {
    if (!store.train) {
      // Checks if there is a train in store, if not redirect to '/'
      this.$router.push('/')
    }
  },
  methods: {
    fetchOldTickets() {
      // Rerender the oldTicket component by "re-fetching" data from API 
      this.$refs.OldTickets.fetchTickets()
    }
  }
};
</script>
