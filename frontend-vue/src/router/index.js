import { createRouter, createWebHistory } from 'vue-router'

// View components
import TrainsView from '../components/TrainsView.vue'
import TicketView from '../components/TicketView.vue'

// Routes
const routes = [
  {
    path: '/',
    name: 'Home',
    component: TrainsView
  },
  {
    path: '/tickets',
    name: 'Tickets',
    component: TicketView
  },
]

// Router
const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router
