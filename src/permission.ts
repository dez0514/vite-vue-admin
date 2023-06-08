import router from '@/router'
import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { useUserStore, usePermissionStore } from '@/store'
// 登录拦截
router.beforeEach(async(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const userStore = useUserStore()
  const permissionStore = usePermissionStore()
  if (typeof (to.meta.title) === 'string') document.title = to.meta.title
  const token = sessionStorage.getItem('token')
  if (to.path !== '/login') {
    if (!token) {
      userStore.RESET_INFO()
      next('/login')
    } else {
      const hasRoles = userStore.roles && userStore.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          const { roles } = await userStore.GET_USER_INFO()
          const accessRoutes = await permissionStore.SET_ROUTES(roles)
          console.log('accessRoutes===', accessRoutes)
          next({ ...to, replace: true })
        } catch {
          userStore.RESET_INFO()
          next('/login')
        }
      }
    }
  } else {
    if (token) {
      next('/')
    } else {
      next()
    }
  }
})

// router.afterEach(() => {
//   NProgress.done()
// })