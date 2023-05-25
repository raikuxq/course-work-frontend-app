import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PageAuth from "@/modules/auth/pages/PageAuth/PageAuth.vue";

export enum ELayoutType {
  MAIN = 'MAIN',
  AUTH = 'AUTH'
}

export enum ERouteName {
  HOME = 'home',
  AUTH = 'auth',
  CHANNEL = 'channel'
}


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: ERouteName.HOME,
      component: HomeView,
      meta: {
        layout: ELayoutType.MAIN
      }
    },
    {
      path: '/auth',
      name: ERouteName.AUTH,
      component: PageAuth,
      meta: {
        layout: ELayoutType.AUTH
      }
    }
  ]
})

export default router
