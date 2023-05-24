import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
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
    }
});
