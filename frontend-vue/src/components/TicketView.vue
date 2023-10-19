<template>
  <div class="ticket-container">
    <a class="button button-blue button-big" href="" @click.prevent="renderTrainsView">&#8592; Tillbaka</a>
    <div class="ticket-view">
      <div class="ticket" v-if="this.$store.jwt">
        <NewTickets @ticketAdded="fetchOldTickets"/>
      </div>
      <OldTickets class="old-ticket" ref="OldTickets"/>
    </div>
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

<style>
.ticket-container {
  padding: 1rem 2rem;
}

.ticket-view {
  display: flex;
  flex-direction: row;
  padding: 2rem 0rem;
}

.old-ticket {
  flex: 1;
}

.ticket {
  width: 40vw;
  /* border-right: 2px solid #30404B; */
}
</style>
