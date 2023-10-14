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
      const trainNumber = this.train.OperationalTrainNumber
      const index = this.$store.showOnMap.indexOf(trainNumber)

      if (index === -1) {
        // This way is needed because of reactivity
        this.$store.showOnMap = [...this.$store.showOnMap, trainNumber]
      } else {
        // This can proably be changed but needed for reactivity
        this.$store.showOnMap = this.$store.showOnMap.filter(train => train !== trainNumber)
      }
    }
  }
}
</script>