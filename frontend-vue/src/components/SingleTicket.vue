<template>
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
        <button @click="stopEdit()">cancel</button>
    </form>
    </div>
    <div v-else>
    <span>{{ ticket._id }} - {{ ticket.code }} - {{ ticket.trainnumber }} - {{ ticket.traindate }}</span>
    <button @click="editTicket(ticket._id, ticket.code)">edit</button>
    </div>
</template>

<script>
import { io } from "socket.io-client"
const baseURL = import.meta.env.VITE_BASE_URL
const graphqlURL = import.meta.env.VITE_GRAPHQL_URL
const socket = io(`${baseURL}/`)

export default {
    props: [
      'ticket',
      'fetchTickets'
    ],
    data() {
      return {
        editItem: null,
        currentCode: '',
        newCode: '',
        codes: null
      }
    },
    methods: {
      editTicket(ticketId, ticketCode) {
        // Function to edit the value for Code in the existing tickets
        // Takes the ticket id and the current ticket code as argument
        this.codes = this.$store.codes
        this.editItem = ticketId
        this.currentCode = ticketCode
        this.newCode = ticketCode

        socket.emit("startEditingTicket", ticketId)
        // // create unique room
        // socket.emit("create", data[_id])
      },
      // TODO Add functionality to delete a ticket
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
              if (result.errors) {
                window.alert(result.errors[0].message)
              }
              this.fetchTickets()
            })
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }

        // stop edit
        socket.emit("stopEditingTicket", this.editItem)
        // reset variable
        this.editItem = null
      },
      stopEdit() {
        // stop edit
        socket.emit("stopEditingTicket", this.editItem)
        // reset variable
        this.editItem = null
      }
    }
}
</script>