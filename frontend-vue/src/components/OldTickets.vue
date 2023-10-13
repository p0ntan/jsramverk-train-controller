<template>
  <div class="old-tickets" id="old-tickets">
    <h2>Befintliga ärenden</h2>
    <div v-if="this.oldTickets">
      <div v-for="ticket in this.oldTickets" :key="ticket">
        <SingleTicket :ticket="ticket" :localEdit="localEdit" @updateTickets="fetchTickets" @newLocalEdit="setLocalEdit"/>
      </div>
    </div>
  </div>
</template>

<script>
import SingleTicket from './SingleTicket.vue'
import { io } from "socket.io-client"
const baseURL = import.meta.env.VITE_BASE_URL
const socket = io(`${baseURL}/`)

const graphqlURL = import.meta.env.VITE_GRAPHQL_URL
// Define data needed from backend
const queryTickets = `{
  tickets {
    _id
    code
    trainnumber
    traindate
  }
}`

export default {
  components: {
    SingleTicket
  },
  data() {
    return {
      oldTickets: [],
      localEdit: {
        id: null
      }
    }
  },
  beforeCreate() {
    // Makes an emit to fetch tickets from backend, triggering emit "tickets"
    socket.emit("fetchTickets")
    socket.on("tickets", (data) => {
      this.oldTickets = data
    })
  },
  beforeMount() {
    // This is to unlock a ticket if a person leaves the site before saving
    // Needs to be added when OldTicket is mounted
    window.addEventListener('beforeunload', this.onUnload);
  },
  methods: {
    // If needing to fetch tickets, used when creating and updating tickets
    fetchTickets(data) {
      socket.emit('updateTickets', data)
    },
    // Setting localEdit for client
    setLocalEdit(ticketId) {
      this.localEdit.id = ticketId
    },
    // Runs when a client is exiting before saving
    onUnload() {
      socket.emit("stopEditingTicket", this.localEdit.id)
      this.setLocalEdit(null)
    }
  },
  beforeUnmount() {
    this.onUnload()
  }
}
</script>
