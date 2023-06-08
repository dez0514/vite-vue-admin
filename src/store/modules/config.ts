import { defineStore } from 'pinia'
import { ConfigState } from '../../types/store'

export const useConfigStore = defineStore('config', {
  state: (): ConfigState => ({
    collapse: false
  }),
  getters: {
    getCommonConfig(state: ConfigState): ConfigState {
      return state
    }
  },
  actions: {
    SET_COLLAPSE(payload: boolean) {
      this.collapse = payload
    }
  },
})