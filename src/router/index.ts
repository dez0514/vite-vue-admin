
import { createRouter, createWebHashHistory, RouteRecordRaw, RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import Login from '@/views/login/index.vue'
import Layout from '@/layout/index.vue'
// import { getUserInfo } from '../api/user'
export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: {
      title: '首页',
      icon: 'Guide',
    },
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/guide',
    meta: {
      title: '引导页',
      icon: 'Guide'
    },
    component: () => import('@/views/guide/index.vue')
  }
]
const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: '登录页面'
    }
  },
  {
    path: "/:pathMatch(.*)*",
    name: '404',
    component: () => import('@/views/error/404.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: asyncRoutes[0].path || '/dashboard',
      component: Layout,
      children: [
        ...asyncRoutes
      ]
    },
    ...constantRoutes
  ],
});
// 登录拦截
// router.beforeEach(async(
//   to: RouteLocationNormalized,
//   _from: RouteLocationNormalized,
//   next: NavigationGuardNext
// ) => {
//   if (typeof (to.meta.title) === 'string') document.title = to.meta.title
//   const token = localStorage.getItem('token')
//   if (to.path !== '/login') {
//     if (!token) {
//       localStorage.clear()
//       next('/login')
//     } else {
//       const userinfo = localStorage.getItem('userinfo') || ''
//       if(!userinfo || !(JSON.parse(userinfo) && JSON.parse(userinfo).username)) {
//         const res: any = await getUserInfo()
//         if (Number(res.code) === 0) {
//           localStorage.setItem('userinfo', JSON.stringify(res.data))
//           next()
//         } else {
//           next('/login')
//         }
//       } else {
//         next()
//       }
//     }
//   } else {
//     if (token) {
//       next('/')
//     } else {
//       next()
//     }
//   }
// })

export default router
