import { defineStore } from 'pinia'
import type {T_GQL_userCurrent_userCurrent} from "@/types/graphql";
import {EStoreSubmodules} from "@/types/common.types";

export type TUseAuthStoreStateUser = Omit<T_GQL_userCurrent_userCurrent, '__typename'>

export const useAuthStore = defineStore(EStoreSubmodules.AUTH, {
    state: () => ({
        user: null as TUseAuthStoreStateUser | null
    }),
    actions: {
        setUser(user: TUseAuthStoreStateUser | null) {
            this.user = user;
        },
        clearUser() {
            this.user = null;
        }
    },
    persist: true
});
