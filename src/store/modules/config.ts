import { defineStore } from 'pinia'
import { ConfigState, TypeLang } from '@/types/store'
import { StorageKeys } from '@/types/enum'
import defaultSetting from '@/defaultSetting'

export const useConfigStore = defineStore('config', {
  state: (): ConfigState => ({
    language: sessionStorage.getItem(StorageKeys.LANG) as TypeLang || defaultSetting.language,
    collapse: false,
    isShowRightDraw: false
  }),
  actions: {
    // 合并方法：更新所有的config
    SET_CONFIG(payload: ConfigState) {
      if(payload.language) {
        sessionStorage.setItem(StorageKeys.LANG, payload.language)
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
    }
  },
})