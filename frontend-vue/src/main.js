import './assets/main.css'

import { createApp } from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import TrainsView from './components/TrainsView.vue'
import TicketView from './components/TicketView.vue'

import App from './App.vue'

const router = createRouter({
    history:createWebHistory(),
    routes: [
        {path: '/', component: TrainsView},
        {path: '/ticket', component: TicketView}
    ]
})

const app = createApp(App)

app.use(router);

app.mount('#app');
