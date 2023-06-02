import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PageAuth from "@/modules/auth/pages/PageAuth/PageAuth.vue";
import PageChannelDetails from "@/modules/channels/pages/PageChannelDetails/PageChannelDetails.vue";
import {useAuthStore} from "@/modules/auth/store/authStore";

export enum ELayoutType {
  MAIN = 'MAIN',
  AUTH = 'AUTH'
}

export enum ERouteName {
  HOME = 'home',
  AUTH = 'auth',
  CHANNEL = 'channel'
}

type TRoutesPath = {
  [key in ERouteName]: string;
}

const ROUTES_PATHS: TRoutesPath = {
  [ERouteName.AUTH]: '/auth',
  [ERouteName.HOME]: '/',
  [ERouteName.CHANNEL]: '/channel/:channelId'
}


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTES_PATHS[ERouteName.HOME],
      name: ERouteName.HOME,
      component: HomeView,
      meta: {
        layout: ELayoutType.MAIN,
        requiresAuth: true,
      }
    },
    {
      path: ROUTES_PATHS[ERouteName.AUTH],
      name: ERouteName.AUTH,
      component: PageAuth,
      meta: {
        layout: ELayoutType.AUTH,
        requiresAuth: false,
      }
    },
    {
      path: ROUTES_PATHS[ERouteName.CHANNEL],
      name: ERouteName.CHANNEL,
      component: PageChannelDetails,
      meta: {
        layout: ELayoutType.MAIN,
        requiresAuth: true,
      }
    }
  ]
})

router.beforeEach((to) => {
  const meta = to.meta

  if (meta.requiresAuth) {
    const authStore = useAuthStore()

    const isAuthorized = Boolean(authStore.user)

    if (!isAuthorized) {
      return ({ name: ERouteName.AUTH })
    }
  }
})


export default router
