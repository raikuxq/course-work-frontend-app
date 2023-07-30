import {createRouter, createWebHistory} from 'vue-router'
import {authGuard} from "@/app/router/middlewares/auth";

export enum ELayoutType {
    MAIN = 'MAIN',
    AUTH = 'AUTH'
}

export enum ERouteName {
    HOME = 'home',
    AUTH = 'auth',
    CHANNEL = 'channel',
    TRACKER = 'tracker',
    PROFILE = 'profile',
    ISSUE = 'issue'
}

type TRoutesPath = {
    [key in ERouteName]: string;
}

const ROUTES_PATHS: TRoutesPath = {
    [ERouteName.AUTH]: '/auth',
    [ERouteName.PROFILE]: '/profile',
    [ERouteName.HOME]: '/',
    [ERouteName.CHANNEL]: '/channel/:channelId',
    [ERouteName.TRACKER]: 'tracker/:trackerId',
    [ERouteName.ISSUE]: 'issue/:issueId'
}


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: ROUTES_PATHS[ERouteName.HOME],
            name: ERouteName.HOME,
            component: () => import('@/modules/home/pages/PageHome.vue'),
            meta: {
                layout: ELayoutType.MAIN,
                requiresAuth: true,
            }
        },
        {
            path: ROUTES_PATHS[ERouteName.PROFILE],
            name: ERouteName.PROFILE,
            component: () => import('@/modules/profile/pages/PageProfile/PageProfile.vue'),
            meta: {
                layout: ELayoutType.MAIN,
                requiresAuth: true
            }
        },
        {
            path: ROUTES_PATHS[ERouteName.AUTH],
            name: ERouteName.AUTH,
            component: () => import('@/modules/auth/pages/PageAuth/PageAuth.vue'),
            meta: {
                layout: ELayoutType.AUTH,
                requiresAuth: false,
            }
        },
        {
            path: ROUTES_PATHS[ERouteName.CHANNEL],
            name: ERouteName.CHANNEL,
            component: () => import('@/modules/channels/pages/PageChannelDetails/PageChannelDetails.vue'),
            meta: {
                layout: ELayoutType.MAIN,
                requiresAuth: true,
            },
            children: [
                {
                    path: ROUTES_PATHS[ERouteName.TRACKER],
                    name: ERouteName.TRACKER,
                    component: () => import('@/modules/trackers/pages/PageTrackerDetails/PageTrackerDetails.vue'),
                    meta: {
                        requiresAuth: true
                    },
                    children: [
                        {
                            path: ROUTES_PATHS[ERouteName.ISSUE],
                            name: ERouteName.ISSUE,
                            component: () => import('@/modules/issues/pages/PageIssuesDetails/PageIssuesDetails.vue'),
                            meta: {
                                requiredAuth: true
                            }
                        }
                    ]
                }
            ]
        }
    ]
})

/**
 * Apply route guards
 */
router.beforeEach(authGuard)

export default router
