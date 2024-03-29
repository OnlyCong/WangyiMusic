import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Layout from '../views/Layout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/topic',
        name: 'Topic',
        component: () => import('../views/Topic.vue')
      },
      {
        path: '/mine',
        name: 'Mine',
        component: () => import('../views/Mine.vue')
      },
      {
        path: '/search',
        name: 'Search',
        component: () => import('../views/Search.vue')
      },
    ]
  },
  {
    path: '/more/:id',
    name: 'More',
    component: () => import('../views/Home/MusicMore.vue')
  },
  {
    path: '/play/:id/:name/:author/:image',
    name: 'Player',
    component: () => import('../views/Player.vue')
  },
  {
    path: '/dj/:id',
    name: 'DJMore',
    component: () => import('../views/Home/DJMore.vue')
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
