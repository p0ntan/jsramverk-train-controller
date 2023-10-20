<template>
  <div class="ticket-container">
    <Toast :message="toastMessage" />
    <a class="button button-blue button-big" href="" @click.prevent="renderTrainsView">&#8592; Tillbaka</a>
    <div class="ticket-view">
      <div class="ticket" v-if="this.$store.jwt && this.$store.train">
        <NewTickets @ticketAdded="fetchOldTickets" @show-toast="displayToast"/>
      </div>
      <OldTickets class="old-ticket" ref="OldTickets" @show-toast="displayToast"/>
    </div>
  </div>
</template>

<script>
import OldTickets from './OldTickets.vue'
import NewTickets from './NewTickets.vue'
import Toast from './Toast.vue'

export default {
  data() {
    return {
      toastMessage: ''
    };
  },
  components: {
    OldTickets,
    NewTickets,
    Toast
  },
  methods: {
    renderTrainsView() {
      this.$router.push('/')
    },
    fetchOldTickets(data) {
      // Rerender the oldTicket component by "re-fetching" data from API 
      this.$refs.OldTickets.fetchTickets(data)
    },
    displayToast(message) {
      this.toastMessage = message
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
