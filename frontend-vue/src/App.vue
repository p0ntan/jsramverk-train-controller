<template>
  <component :is="currentComponent"></component>
</template>

<script>
import TrainsView from './components/TrainsView.vue';
import TicketView from './components/TicketView.vue';

export default{
  data() {
    return {
      currentComponent: TrainsView
    };
  },
  components: {
    TrainsView,
    TicketView
  },
  created() {
    const trainInStorage = sessionStorage.getItem("train");

    if (trainInStorage) {
      this.currentComponent = TicketView;
    }
  }
}
</script>
