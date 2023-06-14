import './assets/styles/app.scss'

import { createApp, provide, h } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// @ts-ignore
import { createI18n } from 'vue-i18n'
import { langEn } from '@/translations/lang.en'
import { langRu } from "@/translations/lang.ru";
import { DefaultApolloClient } from '@vue/apollo-composable'
import { client as apolloClient } from "@/options/apollo";
import App from './App.vue'
import router from './router'
import {useFetchUserCurrent} from "@/common/hooks/useFetchUserCurrent";


/**
 * Инициализация корневого инстанса Vue
 */
const app = createApp({
    setup () {
        provide(DefaultApolloClient, apolloClient)
    },
    async created() {
        await useFetchUserCurrent()
    },
    render: () => h(App),
})


/**
 * Инициализация Vue-i18n
 */
export const i18n = createI18n({
    legacy: false,
    locale: localStorage.getItem('lang') || 'ru',
    fallbackLocale: 'ru',
    messages: { en: langEn, ru: langRu }
})


/**
 * Инициализация pinia
 */
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)


/**
 * Подключение библиотек к инстансу app
 */
app.use(pinia)
app.use(router)
app.use(i18n)

app.mount('#app')
