import './assets/main.css'

// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './router/index'

// createApp(App).use(router).mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/store' // Make sure to adjust the path to your store file
import Toast from './components/Toast.vue';

const app = createApp(App)

app.component('Toast', Toast);
app.use(router)

// Apply the global mixin
app.mixin({
  beforeCreate() {
    this.$store = store
  }
})

app.mount('#app')
