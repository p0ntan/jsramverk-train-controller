<template>
  <div class="old-tickets" id="old-tickets">
    <h2>Befintliga ärenden</h2>
    <div v-if="this.oldTickets">
      <div v-for="ticket in this.oldTickets" :key="ticket">
        <div v-if="this.editItem == ticket._id">
          <form @submit.prevent="saveEdit" v-if="codes">
            <span>{{ ticket._id }} - </span>
            <select v-model="newCode">
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
          <button @click="editTicket(ticket._id, ticket.code)">edit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { nextTick } from 'process'

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
      currentCode: '',
      newCode: '',
      codes: null
    }
  },
  created() {
    this.fetchTickets()
  },
  methods: {
    editTicket(ticketId, ticketCode) {
      // Function to edit the value for Code in the existing tickets
      // Takes the ticket id and the current ticket code as argument
      this.codes = this.$store.codes
      this.editItem = ticketId
      this.currentCode = ticketCode
      this.newCode = ticketCode
    },
    saveEdit() {
      // Function to save the edit made to a ticket
      if (this.newCode != this.currentCode) {
        const mutationUpdateTicket = `mutation {
        updateTicket (
          _id: "${this.editItem}",
          code: "${this.newCode}"
          ){_id}
        }`

        try {
          // Fetch data via graphql
          fetch(`${graphqlURL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
              'Accept': 'application/json',
              'x-access-token': this.$store.jwt
          },
          body: JSON.stringify({ query: mutationUpdateTicket })
          })
          .then(response => response.json())
          .then(result => {
            console.log(result)
            this.fetchTickets()
          })
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }

      // reset variable
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
