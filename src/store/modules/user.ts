import { defineStore } from 'pinia'
import { getUserInfo, loginPost } from '@/api/user'
import { resetRouter } from '@/router'
import avatar from '@/assets/head.png'
import { usePermissionStore } from './permission'

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
    // 返回布尔表示 是否登录完成
    async DO_LOGIN ({username = '', password = ''}) {
      try {
        const { code, data }: any = await loginPost({ username, password })
        if (code === 0) {
          this.SET_TOKEN(data)
          const { roles }: any =  await this.GET_USER_INFO()
          if(roles) {
            // 处理路由
            const permissionStore = usePermissionStore()
            await permissionStore.SET_ROUTES(roles)
            return true
          } else {
            // 获取用户角色信息失败
            return false
          }
        } else {
          // 获取token失败
          return false
        }
      } catch(err) {
        console.log(err)
        return false
      }
    },
    SET_TOKEN(token = '') {
      token ? sessionStorage.setItem('token', token) : sessionStorage.removeItem('token')
      this.token = token
    },
    async GET_USER_INFO() {
      try {
        // mock 插件监听不到 sessionStorage 的token更新, 暂时手动传一下
        const { code, data }: any = await getUserInfo({}, { headers: { 'Authorization': this.token }})
        if (code === 0) {
          const { name, avatar, roles } = data
          this.name = name || ''
          this.avatar = avatar
          this.roles = roles || ['editor']
          sessionStorage.setItem('userInfo', JSON.parse(data))
          return {
            ...data,
            roles: this.roles
          }
        } else {
          return null
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
