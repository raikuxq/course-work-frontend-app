import './assets/main.css'

import { createApp, provide, h } from 'vue'
import { createPinia } from 'pinia'
// @ts-ignore
import { createI18n } from 'vue-i18n'
import { langEn } from '@/translations/lang.en'
import { langRu } from "@/translations/lang.ru";
import { DefaultApolloClient } from '@vue/apollo-composable'
import { client as apolloClient } from "@/app/apollo";
import App from './App.vue'
import router from './router'


/**
 * Инициализация Vue-i18n
 */
const i18n = createI18n({
    locale: localStorage.getItem('lang'),
    fallbackLocale: 'ru',
    messages: { en: langEn, ru: langRu }
})


/**
 * Инициализация корневого инстанса Vue
 */
const app = createApp({
    setup () {
        provide(DefaultApolloClient, apolloClient)
    },

    render: () => h(App),
})

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
