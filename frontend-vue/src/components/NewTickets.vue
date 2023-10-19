<template>
  <h2>
    Nytt ärende för tåg #<span>{{ trainObject.OperationalTrainNumber }}</span>
  </h2>
  <h3 v-if="trainObject.FromLocation && trainObject.ToLocation">
    Tåg från {{ trainObject.FromLocation[0].LocationName }} till
    {{ trainObject.ToLocation[0].LocationName }}. Just nu i {{ trainObject.LocationSignature }}.
  </h3>
  <p><strong>Försenad:</strong> {{ trainObject.delayInMin }} minuter</p>
  <form @submit.prevent="addNewTicket">
    <label for="codes">Orsakskod</label><br />
    <select v-model="selectedOption" id="codes" v-if="trainObject && codes">
      <option v-for="code in codes" :key="code" :value="code.Code">
        {{ code.Code }} - {{ code.Level3Description }}
      </option></select
    ><br /><br />
    <input class="button-green" type="submit" value="Skapa nytt ärende" />
  </form>
</template>

<script>
const graphqlURL = import.meta.env.VITE_GRAPHQL_URL
// Define data needed from backend
const queryCodes = `{
  codes {
    Code
    Level3Description
  }
}`

export default {
  emits: [
    'ticketAdded',
    'show-toast'
  ],
  data() {
    return {
      trainObject: null,
      codes: null,
      selectedOption: null
    }
  },
  created() {
    this.trainObject = this.$store.train

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
        this.codes = data.data.codes
        this.$store.codes = this.codes
      })
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
  methods: {
    // Updated code for adding ticket, only difference is the x-access-token
    // and the !result.errors part in result
    addNewTicket() {
      const mutateTicket = `mutation {
        createTicket (
        code: "${this.selectedOption}",
        trainnumber: "${this.trainObject.OperationalTrainNumber}",
        traindate: "${this.trainObject.EstimatedTimeAtLocation.substring(0, 10)}"
        ) { 
          _id
          code
          traindate
          trainnumber }
      }`

      try {
        // Fetch data via graphql
        fetch(`${graphqlURL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-access-token': this.$store.jwt // jwt is added from store
        },
        body: JSON.stringify({ query: mutateTicket })
        })
        .then(response => response.json())
        .then(result => {
          if (!result.errors) {
            this.$emit('ticketAdded', result.data.createTicket)
            this.showToast('New ticket successfully added.')
          } else {
            this.showToast(result.errors[0].message)
          }
        })
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    showToast(message) {
      this.$emit('show-toast', message)
    },
  }
}
</script>
