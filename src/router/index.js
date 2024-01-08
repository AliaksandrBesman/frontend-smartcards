import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import store from "../store";

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {layout: 'main', auth:true},
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
    meta: {layout: 'main', auth:true},

    component: () => import('../views/Module.vue')
  },
  {
    path: '/test',
    name: 'test',
    meta: {layout: 'main', auth:true},

    component: () => import('../views/Test.vue')
  },
  {
    path: '/user',
    name: 'user',
    meta: {layout: 'main', auth:true},

    component: () => import('../views/User.vue')
  },
  {
    path: '/users',
    name: 'users',
    meta: {layout: 'main', auth:true},

    component: () => import('../views/Users.vue')
  },
  {
    path: '/temp',
    name: 'temp',
    meta: {layout: 'main', auth:true},

    component: () => import('../views/Temp.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next)=>{
  console.log("BeforeEach");
  console.log(store.getters.getJwtInfo);

  const activeUser = store.getters.getUser
  const reqireAuth = to.matched.some(record=>record.meta.auth)
  if(reqireAuth && !activeUser){
    next('/login')
  }
  else{
    console.log("route params");
    console.log(to.params)
    next()
  }
})
export default router
