<template>
  <div class="train-number" @click="changeFocus">
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
  <button v-if="this.$store.jwt" @click.stop="renderTicketView">Lägg till ärende</button>
</template>

<script>
export default {
    name: 'DelayedTableItem',
    props: [
        'train'
    ],
    methods: {
    changeFocus() {


    },
    renderTicketView() {
      // Save train in store, then change route.
      this.$store.train = this.train
      this.$router.push('/tickets')
    }
  },
  watch: {
    // Watch showOnMap and make changes on map according to what changes
    '$store.showOnMap': {
      handler(newValue, oldValue) {
        if (newValue.length > oldValue.length) {
          // Get trainnumber from last item in list
          const trainNumber = newValue[newValue.length - 1]

          // If trainnumber is the component, scroll to that listitem
          if (trainNumber === this.train.OperationalTrainNumber) {
            const table = this.$parent.$el
            const childYPox = this.$el.parentNode.offsetTop

            table.scrollTop = childYPox - table.clientHeight / 2
          }
        }          
      }
    }
  }
}
</script>