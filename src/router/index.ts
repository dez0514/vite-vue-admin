
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Login from '@/views/login/index.vue'
import RouterViewBox from '@/components/RouterView.vue';
import { House, Guide, SetUp, Document, User } from '@element-plus/icons-vue'
import { shallowRef } from 'vue'

interface OutlinkType {
  path: string
  meta: {
    linkType: string
    title: string
    icon: string
  }
}

export const asyncRoutes: Array<RouteRecordRaw | OutlinkType> = [
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: {
      title: 'menu.home',
      elIcon: shallowRef(House),
      affix: true
    },
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/guide',
    name: 'guide',
    meta: {
      title: 'menu.guide',
      elIcon: shallowRef(Guide)
    },
    component: () => import('@/views/guide/index.vue')
  },
  {
    path: '/permissionTest',
    name: 'permissionTest',
    meta: {
      title: 'menu.testPermission',
      elIcon: SetUp
    },
    redirect: '/permissionTest/intro',
    component: shallowRef(RouterViewBox),
    children: [
      {
        path: '/permissionTest/intro',
        name: 'permissionTest.intro',
        meta: {
          title: 'menu.testPermissionIntro',
          elIcon: shallowRef(Document)
        },
        component: () => import('@/views/permissionTest/index.vue')
      },
      {
        path: '/permissionTest/admin',
        name: 'permissionTest.admin',
        meta: {
          title: 'menu.testPermissionAdmin',
          elIcon: shallowRef(User)
        },
        component: () => import('@/views/permissionTest/admin.vue')
      },
    ]
  },
  {
    path: '/excel',
    name: 'excel',
    meta: {
      title: 'menu.excel',
      icon: 'zip'
    },
    redirect: '/excel/export',
    component: shallowRef(RouterViewBox),
    children: [
      {
        path: '/excel/export',
        name: 'excel.export',
        meta: {
          title: 'menu.export',
          icon: 'zip'
        },
        component: () => import('@/views/excel/export.vue')
      }
    ]
  },
  // 外链不需要加到router，addRouter之前过滤掉
  {
    path: 'https://github.com/dez0514/vite-vue-admin',
    meta: {
      linkType: 'outlink',
      title: 'menu.outlink',
      icon: 'zip'
    }
  }
]
export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: 'views.login'
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/404.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes:  [
    ...constantRoutes
  ]
});
console.log('router.getR===', router.getRoutes())
export function resetRouter() {
  console.log('router.getRoutes()===', router.getRoutes())
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
  console.log('router.get===', router.getRoutes())
}

export default router
