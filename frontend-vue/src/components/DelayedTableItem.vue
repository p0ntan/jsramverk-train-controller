<template>
  <div class="train-number">
      {{ train.OperationalTrainNumber }}
  </div>
  <div class="current-station">
      <div>{{ train.LocationSignature }}</div>
      <div v-if="train.FromLocation && train.ToLocation">
      {{ train.FromLocation[0].LocationName }} -> {{ train.ToLocation[0].LocationName }}
      </div>
      <div v-else></div>
  </div>
  <div class="delay">{{ train.delayInMin }} minuter</div>
  <!-- TODO add some delay for button or add error handling, if clicked to fast it makes an error -->
  <button @click.stop="showOnMap">Show train</button>
</template>

<script>
export default {
    name: 'DelayedTableItem',
    props: [
        'train'
    ],
    methods: {
    showOnMap() {
      // Save train in store, or remove if already in there.
      // FIXME OperationalTrainNumber is used here but AdvertisedTrainNumber in map from backend
      // decide on which one to use, but should be the same?
      // TODO decide what to use, using OperationalTrainNumber in backend seams to work better
      const trainNumber = this.train.OperationalTrainNumber

      if (this.$store.showOnMap.includes(trainNumber)) {
        // This can proably be changed but needed for reactivity, splice dosn't work as wanted
        // TODO this triggers a possible bug in Vue according to console, better to find another way
        this.$store.showOnMap = this.$store.showOnMap.filter(train => train !== trainNumber)
      } else {
        // This way is needed because of reactivity
        this.$store.showOnMap = [...this.$store.showOnMap, trainNumber]
      }
    }
  },

}
</script>