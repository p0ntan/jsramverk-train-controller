<template>
  <a href="" @click="renderTrainsView">&#8592; Tillbaka</a>
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
const baseURL = import.meta.env.VITE_BASE_URL

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

    fetch(`${baseURL}/codes`)
      .then((response) => response.json())
      .then((data) => {
        this.codes = data.data
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  },
  methods: {
    renderTrainsView() {
      this.$router.push('/')
    },
    addNewTicket() {
      const newTicket = {
        code: this.selectedOption,
        trainnumber: this.trainObject.OperationalTrainNumber,
        traindate: this.trainObject.EstimatedTimeAtLocation.substring(0, 10)
      }

      fetch(`${baseURL}/tickets`, {
        body: JSON.stringify(newTicket),
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST'
      })
        .then((response) => response.json())
        .then((result) => {
          if (result) {
            this.$emit('ticketAdded', result.data);
          }
      })
    }
  }
}
</script>
