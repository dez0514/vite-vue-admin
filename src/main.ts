import { App, createApp } from 'vue'
import router from '@/router'
import { registerStore } from '@/store'
import AppVue from '@/App.vue'
import { setupI18n } from '@/locale'
import SvgIcon from '@/components/SvgIcon.vue'
import 'virtual:svg-icons-register'
// import { ElMessage } from 'element-plus'
import '@/styles/reset.scss'
import '@/styles/global.scss'
import './permission'

const app: App<Element> = createApp(AppVue)
app.component('svg-icon', SvgIcon)
registerStore(app)
app.use(router)
await router.isReady()
setupI18n(app)
app.mount('#app')


// app.config.globalProperties.$message = ElMessage

