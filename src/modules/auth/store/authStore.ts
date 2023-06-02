import { defineStore } from 'pinia'
import {EStoreSubmodules} from "@/stores/config";

export const useAuthStore = defineStore(EStoreSubmodules.AUTH, {
    state: () => ({
        user: null
    }),
    actions: {
        setUser(user: any) {
            this.user = user;
        },
        clearUser() {
            this.user = null;
        }
    },
    persist: true
});
