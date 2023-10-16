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
  <button v-if="this.$store.jwt" @click.stop="renderTicketView">Lägg till ärende</button>
</template>

<script>
export default {
    name: 'DelayedTableItem',
    props: [
        'train'
    ],
    methods: {
    renderTicketView() {
      // Save train in store, then change route.
      this.$store.train = this.train
      this.$router.push('/tickets')
    }
  },

}
</script>