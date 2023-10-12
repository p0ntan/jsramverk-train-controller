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
          <button type="submit">save</button>
          <button @click="stopEdit()">cancel</button>
      </form>
    </div>
    <div v-else>
      <span>{{ ticket._id }} - {{ ticket.code }} - {{ ticket.trainnumber }} - {{ ticket.traindate }}</span>
      <button v-if="!blocked.includes(ticket._id)" @click="editTicket">edit</button>
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
    mounted() {
      socket.emit("fetchBlockedTickets")

      socket.on("blockedTickets", (data) => {
        // console.log(data)
        this.blocked = data
      })
      // // This is to unlock a ticket if a person leaves the site before saving
      // window.addEventListener('beforeunload', function() {
      //   socket.emit("stopEditingTicket", this.localEdit.id)
      // });
      window.addEventListener('beforeunload', this.onUnload);
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

        socket.emit("startEditingTicket", this.ticket._id)
      },
      // TODO Add functionality to delete a ticket
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
              // stop edit
              this.stopEdit()
              // refresh
              socket.emit('updateTickets', result.data.updateTicket)
            })
          } catch (error) {
            console.error('Error fetching data:', error)
            // stop edit
            this.stopEdit()
          }
        }
      },
      stopEdit() {
        // stop edit
        this.edit = false
        socket.emit("stopEditingTicket", this.ticket._id)
      },
      onUnload() {
        if (this.localEdit.id === this.ticket._id) {
          socket.emit("stopEditingTicket", this.localEdit.id)
        }
      }
    },
    // 'Watches' the variable localEdit and runs code upon change
    watch: {
      localEdit: {
        handler(newValue, oldValue) {
          if (this.localEdit.id !== this.ticket._id)
            this.edit = false
        },
        deep: true
      }
  }
}
</script>