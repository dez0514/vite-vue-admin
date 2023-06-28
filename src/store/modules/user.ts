import { defineStore } from 'pinia'
import { getUserInfo, loginPost } from '@/api/user'
import { resetRouter } from '@/router'
import { usePermissionStore } from './permission'

export const useUserStore = defineStore({
  id: 'users',
  state: () => {
    return {
      token: sessionStorage.getItem('token') || '',
      avatar: '',
      name: 'hanshansaonian',
      roles: []
    }
  },
  actions: {
    SET_TOKEN(token = '') {
      token ? sessionStorage.setItem('token', token) : sessionStorage.removeItem('token')
      this.token = token
    },
    DO_LOGIN ({username = '', password = ''}) {
      return new Promise(async (resolve: Function, reject: Function) => {
        try {
          const { code, data }: any = await loginPost({ username, password })
          if (code === 0) {
            this.SET_TOKEN(data)
            resolve(data)
          } else {
            reject(data)
          }
        } catch(err) {
          reject(err)
        }
      })
    },
    GET_USER_INFO() {
      return new Promise(async (resolve: Function, reject: Function) => {
        try {
          // mock 插件监听不到 sessionStorage 的token更新, 暂时手动传一下
          const { code, data }: any = await getUserInfo({}, { headers: { 'Authorization': this.token }})
          if (code === 0) {
            const { name, avatar, roles } = data
            if(roles) { // 账号一定有个基础角色
              this.name = name || ''
              this.avatar = avatar
              sessionStorage.setItem('userInfo', JSON.stringify(data))
              const permissionStore = usePermissionStore()
              await permissionStore.SET_ROUTES(roles)
              this.roles = roles
              resolve(data)
            } else {
              reject(data)
            }
          } else {
            reject(data)
          }
        } catch (error) {
          reject(error)
        }
      })
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
