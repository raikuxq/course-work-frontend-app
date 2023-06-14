import {createRouter, createWebHistory} from 'vue-router'
import PageAuth from "@/modules/auth/pages/PageAuth/PageAuth.vue";
import PageChannelDetails from "@/modules/channels/pages/PageChannelDetails/PageChannelDetails.vue";
import {authGuard} from "@/router/middlewares/auth";
import PageTrackerDetails from "@/modules/trackers/pages/PageTrackerDetails/PageTrackerDetails.vue";
import PageProfile from "@/modules/profile/pages/PageProfile/PageProfile.vue";
import PageHome from "@/modules/home/pages/PageHome.vue";
import PageIssuesDetails from "@/modules/issues/pages/PageIssuesDetails/PageIssuesDetails.vue";

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
            component: PageHome,
            meta: {
                layout: ELayoutType.MAIN,
                requiresAuth: true,
            }
        },
        {
            path: ROUTES_PATHS[ERouteName.PROFILE],
            name: ERouteName.PROFILE,
            component: PageProfile,
            meta: {
                layout: ELayoutType.MAIN,
                requiresAuth: true
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
            },
            children: [
                {
                    path: ROUTES_PATHS[ERouteName.TRACKER],
                    name: ERouteName.TRACKER,
                    component: PageTrackerDetails,
                    meta: {
                        requiresAuth: true
                    },
                    children: [
                        {
                            path: ROUTES_PATHS[ERouteName.ISSUE],
                            name: ERouteName.ISSUE,
                            component: PageIssuesDetails,
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
