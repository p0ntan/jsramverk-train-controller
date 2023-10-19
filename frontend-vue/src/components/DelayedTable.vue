<template>
  <div class="delayed">
    <h1>Försenade Tåg</h1>
    <div class="delayed-trains" v-if="delayedTrains">
      <div v-for="train in sortByTrainNumber(delayedTrains)"
        :key="train"
        @click="showOnMap(train.OperationalTrainNumber)"
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
    AdvertisedTrainIdent
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
            const trainId = train.AdvertisedTrainIdent || train.OperationalTrainNumber

            // Setting OperationalTrainNumber to the AdvertisedTrainIdent if exist
            // This is what is used at sj.se and seams to more correct
            train.OperationalTrainNumber = trainId
            this.$store.delayedTrains[trainId] = train
          });
        })
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
  methods: {
    showOnMap(trainNumber) {
      // Save train in store, or remove if already in there.
      if (this.$store.showOnMap.includes(trainNumber)) {
        // This can proably be changed but needed for reactivity, splice dosn't work as wanted
        this.$store.showOnMap = this.$store.showOnMap.filter(train => train !== trainNumber)
      } else {
        // This way is needed because of reactivity
        this.$store.showOnMap = [...this.$store.showOnMap, trainNumber]
      }
    }
  },
  computed: {
    // Computes and sets the class to chosen if train is chosen, works for button and marker
    classChosen() {
      return (selectedTrainNumber) => {
        const inArray = this.$store.showOnMap.includes(selectedTrainNumber)
        if (this.$store.showOnMap.length === 0 || inArray) {
          return  "on-map"
        }
        return "not-on-map"
        
      };
    },
    // Sort the train by trainnumber, more functions can be added in the same way to have
    // more options for a user
    sortByTrainNumber() {
      return (delayedTrains) => {
        return delayedTrains.sort((a, b) => a.OperationalTrainNumber - b.OperationalTrainNumber)
      }
    }
  }
}
</script>

<style>
.delayed {
  height: calc(100vh - 65px);
  width: 50vw;
  padding: 1rem 2rem;
  overflow: scroll;
  background-color: white;
}

.delayed-trains {
  display: flex;
  flex-direction: column;
}

.delayed-trains > div {
  display: flex;
  flex-direction: row;
  border-top: 1px solid #ccc;
  padding: 0.2rem 0.8rem;
  align-items: center;
  cursor: pointer;
}

.delayed-trains > div:nth-of-type(2n) {
  background-color: #eee;
}

.not-on-map {
  color: rgb(161, 161, 161);
}
.delayed {
  scroll-behavior: smooth;
}
</style>