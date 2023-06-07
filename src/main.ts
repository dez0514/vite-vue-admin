import { App, createApp } from 'vue'
import './style.css'
import router from './router'
import { createPinia } from 'pinia'
import AppVue from './App.vue'
import SvgIcon from '@/components/svgIcon.vue'
import 'virtual:svg-icons-register'

const app: App<Element> = createApp(AppVue)
app.component('svg-icon', SvgIcon)
app.use(createPinia())
app.use(router)
app.mount('#app')
