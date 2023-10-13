import { reactive } from 'vue'

// Store to use across components. This can also hold other things like jwt for a user
const store = reactive({
  train: '',
  jwt: '',
  showOnMap: [],
  delayedTrains: {}
})

export default store
