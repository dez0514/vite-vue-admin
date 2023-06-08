
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Login from '@/views/login/index.vue'
import RouterViewBox from '@/components/RouterView.vue';
import { Aim } from '@element-plus/icons-vue'
// import { getUserInfo } from '../api/user'
export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: {
      title: '首页',
      icon: Aim,
    },
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/guide',
    meta: {
      title: '引导页',
      icon: Aim
    },
    component: () => import('@/views/guide/index.vue')
  },
  {
    path: '/permissionTest',
    meta: {
      title: '引导页',
      icon: Aim
    },
    redirect: '/permissionTest/intro',
    component: RouterViewBox,
    children: [
      {
        path: '/permissionTest/intro',
        meta: {
          title: '权限说明',
          icon: Aim
        },
        component: () => import('@/views/permissionTest/index.vue')
      },
    ]
  }
]
export const constantRoutes = [
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
  routes: [...constantRoutes]
});

export function resetRouter() {
  router.getRoutes().forEach((route: any) => {
    const { name } = route
    if (name && !constantRoutes.map(item => item.name).includes(name)) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export function addRoutes(arr: any){
  arr.forEach((item: any)=>{
    router.addRoute(item)
  })
}

// const lastRoutes = [
//   {
//     path: '/',
//     redirect: asyncRoutes[0].path || '/dashboard',
//     component: Layout,
//     children: [
//       ...asyncRoutes
//     ]
//   },
//   ...constantRoutes
// ]
// addRoutes(lastRoutes)

export default router
