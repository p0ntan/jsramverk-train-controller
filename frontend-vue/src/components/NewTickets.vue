<template>
  <a href="" @click.prevent="renderTrainsView">&#8592; Tillbaka</a>
  <h1>
    Nytt ärende för tåg #<span>{{ trainObject.OperationalTrainNumber }}</span>
  </h1>
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
    <input type="submit" value="Skapa nytt ärende" />
  </form>
</template>

<script>
// Store is used to store train-data when clicking a delayed train
import store from '../store/store'
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
    'ticketAdded'
  ],
  data() {
    return {
      trainObject: null,
      codes: null,
      selectedOption: null
    }
  },
  created() {
    this.trainObject = store.train

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
        store.codes = this.codes
      })
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
  methods: {
    renderTrainsView() {
      this.$router.push('/')
    },
    addNewTicket() {
      const mutateTicket = `mutation {
          createTicket (
          code: "${this.selectedOption}",
          trainnumber: "${this.trainObject.OperationalTrainNumber}",
          traindate: "${this.trainObject.EstimatedTimeAtLocation.substring(0, 10)}"
          ) { trainnumber }
      }`

      try {
      // Fetch data via graphql
      fetch(`${graphqlURL}`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      },
      body: JSON.stringify({ query: mutateTicket })
      })
      .then(response => response.json())
      .then(result => {
        // Store received data in component variable
        //TODO Adjust what data should be returned?
        // console.log(result.data.createTicket.trainnumber);
        this.$emit('ticketAdded', result.data);
      })
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    }
  }
}
</script>
