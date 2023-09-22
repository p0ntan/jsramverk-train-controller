<template>
  <component :is="currentComponent"></component>
</template>

<script>
import TrainsView from './components/TrainsView.vue'
import TicketView from './components/TicketView.vue'

export default {
  components: {
    TrainsView,
    TicketView
  },
  computed: {
    currentComponent() {
      const trainInStorage = sessionStorage.getItem('train')
      return trainInStorage ? TicketView : TrainsView
    }
  }
}
</script>
