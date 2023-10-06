<template>
  <div class="old-tickets" id="old-tickets">
    <h2>Befintliga ärenden</h2>
    <div v-if="this.oldTickets">
      <div v-for="ticket in this.oldTickets" :key="ticket">
        <div v-if="this.editItem == ticket._id">
          <form @submit.prevent="saveEdit">
            <span>{{ ticket._id }} - </span>
            <select v-model="editValue" v-if="codes">
              <option v-for="code in codes" :key="code" :value="code.Code">
                {{ code.Code }} - {{ code.Level3Description }}
              </option>
            </select>
            <span> - {{ ticket.trainnumber }} - {{ ticket.traindate }}</span>
            <button type="submit">save</button>
          </form>
        </div>
        <div v-else>
          <span>{{ ticket._id }} - {{ ticket.code }} - {{ ticket.trainnumber }} - {{ ticket.traindate }}</span>
          <button @click="editTicket(ticket._id)">edit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Store is used to store train-data when clicking a delayed train
import store from '../store/store'
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
  data() {
    return {
      oldTickets: [],
      editItem: null,
      editValue: '',
      codes: null
    }
  },
  created() {
    this.fetchTickets()
  },
  methods: {
    editTicket(ticketId) {
      // Function to edit the value for Code in the existing tickets
      // Takes the ticket id as argument
      this.codes = store.codes
      this.editItem = ticketId
    },
    saveEdit() {
      // Function to save the edit made to a ticket
      console.log(this.editValue)
      this.editItem = null
    },
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
          // Store received data in component variable
          this.oldTickets = data.data.tickets
        })
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }
}
</script>
