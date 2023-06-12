import { defineStore } from 'pinia'
import { ConfigState } from '../../types/store'

export const useConfigStore = defineStore('config', {
  state: (): ConfigState => ({
    collapse: false,
    isShowRightDraw: false
  }),
  getters: {
    getCommonConfig(state: ConfigState): ConfigState {
      return state
    }
  },
  actions: {
    SET_COLLAPSE(payload: boolean) {
      this.collapse = payload
    },
    SET_DRAW_ISSHOW(payload: boolean) {
      this.isShowRightDraw = payload
    }
  },
})