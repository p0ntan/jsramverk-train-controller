<template>
  <div class="old-tickets" id="old-tickets">
    <h2>Befintliga ärenden</h2>
    <div v-if="this.oldTickets">
      <div v-for="ticket in this.oldTickets" :key="ticket">
        <SingleTicket :ticket="ticket" :fetchTickets="fetchTickets"/>
      </div>
    </div>
  </div>
</template>

<script>
import SingleTicket from './SingleTicket.vue'

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
      oldTickets: []
    }
  },
  created() {
    this.fetchTickets()
  },
  methods: {
    fetchTickets() {
      try {
        // Fetch data via graphql
        fetch(`${graphqlURL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ query: queryTickets })
        })
        .then(response => response.json())
        .then(data => {
          this.oldTickets = data.data.tickets
        })
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }
}
</script>
