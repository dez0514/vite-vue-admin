import { App } from 'vue'
import { createI18n, I18n } from 'vue-i18n'
import messages from './getMessage'
import defaultSetting from '@/defaultSetting'
import { StorageKeys } from '@/types/enum'
import { TypeLang } from '@/types/store'
const lang = (sessionStorage.getItem(StorageKeys.LANG) as TypeLang) || defaultSetting.language

const localeData = {
  legacy: false, // composition API
  locale: lang || 'zh',
  globalInjection: true, // 全局模式，可以直接使用 $t
  messages
}

export const i18n: I18n = createI18n(localeData)

export function setupI18n(app: App<Element>) {
  app.use(i18n)
}

export function setI18nLanguage(localeType: TypeLang) {
  // console.log('loc===', i18n.global.locale)
  if (i18n.mode === 'legacy') {
    i18n.global.locale = localeType
  } else {
    i18n.global.locale.value = localeType
  }
}