import { defineStore } from 'pinia'
import { getUserInfo } from '@/api/user'
import { resetRouter } from '@/router'
import avatar from '@/assets/head.png'

export const useUserStore = defineStore({
  id: 'users',
  state: () => {
    return {
      token: sessionStorage.getItem('token') || '',
      avatar: avatar,
      name: 'hanshansaonian',
      roles: []
    }
  },
  actions: {
    SET_TOKEN(token = '') {
      token ? sessionStorage.getItem('token') : sessionStorage.removeItem('token')
      this.token = token
    },
    async GET_USER_INFO() {
      try {
        const { code, data }: any = await getUserInfo()
        if (code === 0) {
          const { name, avatar, roles } = data
          this.name = name || ''
          this.avatar = avatar
          this.roles = roles || ['editor']
          return {
            ...data,
            roles: this.roles
          }
        }
      } catch (error) {
        return error
      }
    },
    async LOGIN_OUT() {
      this.token = ''
      this.name = ''
      this.avatar = ''
      this.roles = []
      this.RESET_INFO()
    },
    // 清空所有登录信息
    RESET_INFO() {
      return new Promise((resolve: Function) => {
        // const tagsViewStore = useTagsViewStore()
        // tagsViewStore.DEL_ALL_VIEWS(null)
        sessionStorage.clear()
        resetRouter()
        resolve()
      })
    }
  }
})
