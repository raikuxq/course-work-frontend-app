import {useAuthStore} from "@/modules/auth/store/authStore";
import {ERouteName} from "@/router";
import type {NavigationGuardWithThis, RouteLocationNormalized} from "vue-router";

export const authGuard: NavigationGuardWithThis<undefined> = (to: RouteLocationNormalized) => {
    const meta = to.meta

    if (meta.requiresAuth) {
        const authStore = useAuthStore()

        const isAuthorized = Boolean(authStore.user)

        if (!isAuthorized) {
            return ({ name: ERouteName.AUTH })
        }
    }
}
