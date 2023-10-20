<template>
  <div v-if="edit">
    <form @submit.prevent="saveEdit" v-if="codes" class="flex-row-ai-center">
        <!-- <span>{{ ticket._id }}</span> -->
        <span class="train-number">{{ ticket.trainnumber }}</span>
        <span class="train-date">{{ ticket.traindate }}</span>
        <select v-model="newCode">
          <option v-for="code in codes" :key="code" :value="code.Code">
              {{ code.Code }} - {{ code.Level3Description }}
          </option>
        </select>
        <button class="save-btn" type="submit">Spara</button>
        <button id="remove-ticket" class="delete-btn" @click="removeTicket()">Ta bort</button>
        <button class="cancel-btn" @click="stopEdit()">Avbryt</button>
    </form>
  </div>
  <div v-else class="flex-row-ai-center">
    <!-- <span>{{ ticket._id }}</span> -->
    <span class="train-number">{{ ticket.trainnumber }}</span>
    <span class="train-date">{{ ticket.traindate }}</span>
    <span class="train-code">{{ ticket.code }}</span>
    <button class="button-blue" v-if="!blocked.includes(ticket._id) && this.$store.jwt" @click="editTicket">Redigera</button>
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
    emits: ['newLocalEdit', 'send-toast'],
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

      // Only runs if there are no codes saved in store, needed if
      // visiting page when logged in clicking "visa ärenden"
      if (!this.$store.codes && this.$store.jwt) {
        this.fetchCodes()
      }

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
                // window.alert(result.errors[0].message)
                this.showToast(result.errors[0].message)
              }
              // Stop edit
              this.stopEdit()
              // Refresh
              socket.emit('updateTickets', result.data.updateTicket)
              this.showToast(`Edit of ${this.ticket._id} saved.`)
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
                this.showToast(result.errors[0].message)
              }
              // Stop edit
              this.stopEdit()
              // Refresh
              socket.emit('updateTickets', result.data.deleteTicket)
              this.showToast(`Ticket ${this.ticket._id} has been removed.`)
            })
          } catch (error) {
            console.error('Error fetching data:', error)
            // Stop edit
            this.stopEdit()
          }
      },
      showToast(message) {
        this.$emit('send-toast', message)
      },
      fetchCodes() {
        // Define data needed from backend
        const queryCodes = `{
          codes {
            Code
            Level3Description
          }
        }`

        try {
          // Fetch data via graphql
          fetch(`${graphqlURL}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
          },
          body: JSON.stringify({ query: queryCodes })
          })
          .then(response => response.json())
          .then(data => {
            this.$store.codes = data.data.codes
          })
        } catch (error) {
          console.error('Error fetching data:', error);
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


<style scoped>
.train-number {
  font-size: 2rem;
  font-weight: bold;
  width: 10rem;
}

.train-date {
  width: 10rem;
}

span {
  margin: 0rem 0.5rem;
}
.save-btn {
  color: #000;
  background-color: #64cb54;
}

.cancel-btn {
  color: #000;
  background-color: #ded733;
}

.delete-btn {
  color: #000;
  background-color: #fd1818;
}

/* button {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
} */

button {
  margin: 0 0 0 auto;
}
</style>