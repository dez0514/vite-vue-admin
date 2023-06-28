import router from '@/router'
import { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { useUserStore } from '@/store'
import NProgress from 'nprogress';
import "nprogress/nprogress.css"; 

// 登录拦截
router.beforeEach(async(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  NProgress.start()
  const userStore = useUserStore()
  if (typeof (to.meta.title) === 'string') document.title = to.meta.title
  const token = sessionStorage.getItem('token')
  if (to.path !== '/login') {
    if (!token) {
      userStore.RESET_INFO()
      next('/login')
    } else {
      const hasRoles = userStore.roles && userStore.roles.length > 0
      if (hasRoles) {
        console.log(111)
        next()
      } else {
        console.log(222)
        try {
          const { roles }: any = await userStore.GET_USER_INFO()
          if(roles) {
            console.log(333, to)
            next({ ...to, replace: true })
          } else {
            userStore.RESET_INFO()
            next('/login')
          }
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

router.afterEach(() => {
  NProgress.done()
})