import { defineStore } from 'pinia'
import { ConfigState, TypeLang, TypeTheme } from '@/types/store'
import { TypeNav } from '@/types'
import { StorageKeys } from '@/types/enum'
import defaultSetting from '@/defaultSetting'

export const useConfigStore = defineStore('config', {
  state: (): ConfigState => ({
    language: sessionStorage.getItem(StorageKeys.LANG) as TypeLang || defaultSetting.language,
    theme: sessionStorage.getItem(StorageKeys.THEME) as TypeTheme || defaultSetting.theme,
    collapse: false,
    isShowRightDraw: false,
    nofixHeader: !!(sessionStorage.getItem(StorageKeys.NOFIXHEAD) === 'true') || defaultSetting.nofixHeader,
    hideLogo: !!(sessionStorage.getItem(StorageKeys.HIDELOGO) === 'true') || defaultSetting.hideLogo,
    hideTagsView: !!(sessionStorage.getItem(StorageKeys.HIDETAGSVIEW) === 'true')  || defaultSetting.hideTagsView,
    primaryColor: sessionStorage.getItem(StorageKeys.PRIMARYCOLOR) || defaultSetting.primaryColor || '#1890ff',
    navType: sessionStorage.getItem(StorageKeys.NAVTYPE) as TypeNav || defaultSetting.navType || 'lt',
  }),
  actions: {
    // 合并方法：更新所有的config
    SET_CONFIG(payload: ConfigState) {
      if(payload.language) {
        sessionStorage.setItem(StorageKeys.LANG, payload.language)
      }
      if('theme' in payload) {
        sessionStorage.setItem(StorageKeys.THEME, payload.theme)
      }
      Object.keys(payload).forEach((item: string) => {
        this[item] = payload[item]
      })
    },
    SET_COLLAPSE(payload: boolean) {
      this.collapse = payload
    },
    SET_DRAW_ISSHOW(payload: boolean) {
      this.isShowRightDraw = payload
    },
    SET_LOGO_ISSHOW(payload: boolean) {
      sessionStorage.setItem(StorageKeys.HIDELOGO, String(payload))
      this.hideLogo = payload
    },
    SET_TAGVIEW_ISSHOW(payload: boolean) {
      sessionStorage.setItem(StorageKeys.HIDETAGSVIEW, String(payload))
      this.hideTagsView = payload
    },
    SET_ISNOFIXHEAD(payload: boolean) {
      sessionStorage.setItem(StorageKeys.NOFIXHEAD, String(payload))
      this.nofixHeader = payload
    },
    SET_PRIMARYCOLOR(payload: string) {
      sessionStorage.setItem(StorageKeys.PRIMARYCOLOR, payload)
      this.primaryColor = payload
    },
    SET_NAVTYPE(payload: string) {
      sessionStorage.setItem(StorageKeys.NAVTYPE, payload)
      this.navType = payload
    }
  },
})