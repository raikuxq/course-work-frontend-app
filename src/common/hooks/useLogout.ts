import {useAuthStore} from "@/modules/auth/store/authStore";
import {useRouter} from "vue-router";
import {ERouteName} from "@/router";
import {LS_KEY_ACCESS_TOKEN, LS_KEY_REFRESH_TOKEN} from "@/options/constants";

export const useLogout = () => {
    const authStore = useAuthStore()
    const router = useRouter()


    const logout = () => {
        authStore.setUser(null)
        localStorage.removeItem(LS_KEY_ACCESS_TOKEN)
        localStorage.removeItem(LS_KEY_REFRESH_TOKEN)
        router.push({ name: ERouteName.AUTH })
    }

    return {
        logout
    }
}
