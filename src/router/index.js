import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {layout: 'main'},
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    meta: {layout: 'empty'},

    component: () => import('../views/Login.vue')
  },
  {
    path: '/module',
    name: 'module',
    meta: {layout: 'main'},

    component: () => import('../views/Module.vue')
  },
  {
    path: '/test',
    name: 'test',
    meta: {layout: 'main'},

    component: () => import('../views/Test.vue')
  },
  {
    path: '/user',
    name: 'user',
    meta: {layout: 'main'},

    component: () => import('../views/User.vue')
  },
  {
    path: '/temp',
    name: 'temp',
    meta: {layout: 'main'},

    component: () => import('../views/Temp.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
