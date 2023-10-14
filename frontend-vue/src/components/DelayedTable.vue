<template>
  <div class="delayed">
    <h1>Försenade Tåg</h1>
    <div class="delayed-trains" v-if="delayedTrains">
      <div v-for="train in delayedTrains"
        :key="train"
        @click="renderTicketView(train)"
        class="train"
        :class="classChosen(train.OperationalTrainNumber)"
      >
        <DelayedTableItem :train="train" />
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
const graphqlURL = import.meta.env.VITE_GRAPHQL_URL
import DelayedTableItem from "./DelayedTableItem.vue";
// Define data needed from backend
const queryDelayed = `{
  delayed {
    AdvertisedTimeAtLocation
    EstimatedTimeAtLocation
    OperationalTrainNumber
    LocationSignature
    FromLocation {
      LocationName
    }
    ToLocation {
      LocationName
    }
  }
}`

export default {
  data() {
    return {
      delayedTrains: null,
      delays: null,
    }
  },
  components: {
    DelayedTableItem
  },
  created() {
      try {
        // Fetch data via graphql
        fetch(`${graphqlURL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ query: queryDelayed })
        })
        .then(response => response.json())
        .then(data => {
          // Store received data in component variable
          this.delayedTrains = data.data.delayed
          const numberOfDelays = Object.entries(this.delayedTrains).length
          for (let i = 0; i < numberOfDelays; i++) {
            const date1 = new Date(this.delayedTrains[i].AdvertisedTimeAtLocation)
            const date2 = new Date(this.delayedTrains[i].EstimatedTimeAtLocation)
            // Calculate delay in minutes
            const differenceInMilliseconds = Math.abs(date1 - date2)
            const differenceInMinutes = Math.floor(differenceInMilliseconds / (1000 * 60))
            // Add delay to object
            this.delayedTrains[i].delayInMin = differenceInMinutes
          }
          // Adding delayedTrains id into the store for easier access on map
          // Using object with trainnumber as key
          this.delayedTrains.forEach(train => {
            const trainId = train.OperationalTrainNumber
            this.$store.delayedTrains[trainId] = train
          });
        })
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  methods: {
    renderTicketView(trainObject) {
      // Save train in store, then change route.
      this.$store.train = trainObject
      this.$router.push('/tickets')
    }
  },
  computed: {
    // Computes and sets the class to chosen if train is chosen, works for button and marker
    classChosen() {
      return (selectedTrainNumber) => {
        return this.$store.showOnMap.includes(selectedTrainNumber) ? 'chosen' : ''
      };
    }
  }
}
</script>

<style>
.chosen {
  outline: 2px solid red;
}
</style>