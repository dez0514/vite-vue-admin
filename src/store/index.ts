import { createPinia } from 'pinia'
import { useConfigStore } from './modules/config'
import { useUserStore } from './modules/user'
import { usePermissionStore } from './modules/permission'
import { useTagsViewStore } from './modules/tagsView'
import { App } from 'vue'


const store = createPinia()

export function registerStore(app: App) {
  app.use(store)
}

export { useConfigStore, useUserStore, usePermissionStore, useTagsViewStore }

export default store