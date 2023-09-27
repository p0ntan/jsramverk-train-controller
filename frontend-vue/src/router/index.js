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
// Router root is "" when in development and "/~elmo22/train/" in production
const router = createRouter({
history: createWebHistory(import.meta.env.VITE_ROUTER_ROOT),
  routes: routes
})

export default router
