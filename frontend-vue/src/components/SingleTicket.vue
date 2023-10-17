<template>
    <div v-if="edit">
      <form @submit.prevent="saveEdit" v-if="codes">
          <span>{{ ticket._id }} - </span>
          <select v-model="newCode">
          <option v-for="code in codes" :key="code" :value="code.Code">
              {{ code.Code }} - {{ code.Level3Description }}
          </option>
          </select>
          <span> - {{ ticket.trainnumber }} - {{ ticket.traindate }}</span>
          <button type="submit">Spara</button>
          <button @click="stopEdit()">Avbryt</button>
          <button @click="removeTicket()">Ta bort</button>
      </form>
    </div>
    <div v-else>
      <span>{{ ticket._id }} - {{ ticket.code }} - {{ ticket.trainnumber }} - {{ ticket.traindate }}</span>
      <button v-if="!blocked.includes(ticket._id) && this.$store.jwt" @click="editTicket">Redigera</button>
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
      'fetchTickets',
      'localEdit'
    ],
    data() {
      return {
        edit: false,
        currentCode: '',
        newCode: '',
        codes: null,
        blocked: []
      }
    },
    beforeMount() {
      socket.emit("fetchBlockedTickets")

      socket.on("blockedTickets", (data) => {
        this.blocked = data
      })

      // When ticket is mounted it checks if it should be in "edit-mode"
      if (this.localEdit.id === this.ticket._id) {
        // Set variables
        this.edit = true
        this.codes = this.$store.codes
        this.currentCode = this.ticket.code
        this.newCode = this.ticket.code
      }
    },
    methods: {
      editTicket() {
        // Function to edit the value for Code in the existing tickets

        if (this.localEdit.id) {
          // Remove any existing localEdit.id
          socket.emit("stopEditingTicket", this.localEdit.id)
        }

        // Set variables
        this.edit = true
        this.codes = this.$store.codes
        this.currentCode = this.ticket.code
        this.newCode = this.ticket.code

        // Set new content to global variable localEdit
        this.$emit("newLocalEdit", this.ticket._id)

        // Start edit and add ticket._id to blockedTickets list
        socket.emit("startEditingTicket", {
          id: this.ticket._id,
          jwt: this.$store.jwt
        })
      },
      saveEdit() {
        // Function to save the edit made to a ticket
        if (this.newCode != this.currentCode) {
          const mutationUpdateTicket = `mutation {
          updateTicket (
            _id: "${this.ticket._id}",
            code: "${this.newCode}"
            ){
              _id
              code
            }
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
              // Stop edit
              this.stopEdit()
              // Refresh
              socket.emit('updateTickets', result.data.updateTicket)
            })
          } catch (error) {
            console.error('Error fetching data:', error)
            // Stop edit
            this.stopEdit()
          }
        }
      },
      stopEdit() {
        // Stop edit, setting localEdit.id to null and remove from blockedTickets list
        this.edit = false
        this.$emit("newLocalEdit", null)
        socket.emit("stopEditingTicket", this.ticket._id)
      },
      removeTicket() {
        // Function to remove ticket in edit mode
        const mutationRemoveTicket = `mutation {
          deleteTicket (
            _id: "${this.ticket._id}",
            ){
              _id
            }
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
            body: JSON.stringify({ query: mutationRemoveTicket })
            })
            .then(response => response.json())
            .then(result => {
              if (result.errors) {
                console.error(result.errors[0].message)
              }
              // Stop edit
              this.stopEdit()
              // Refresh
              socket.emit('updateTickets', result.data.deleteTicket)
            })
          } catch (error) {
            console.error('Error fetching data:', error)
            // Stop edit
            this.stopEdit()
          }
      }
    },
    watch: {
      // 'Watches' the variable localEdit and runs code upon change
      localEdit: {
        handler(newValue, oldValue) {
          if (this.localEdit.id !== this.ticket._id)
            this.edit = false
        },
        deep: true
      },
    }
}
</script>