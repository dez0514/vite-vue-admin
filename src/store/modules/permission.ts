// @ts-nocheck
import { defineStore } from 'pinia'
import { asyncRoutes, constantRoutes, addRoutes } from '@/router'
import Layout from '@/layout/index.vue'
import { shallowRef } from 'vue'

/**
 * 使用meta.role来确定当前用户是否有权限
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 通过递归过滤异步路由表
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

export const usePermissionStore = defineStore({
  id: 'permission',
  state: () => {
    return {
      routes: [],
      addRoutesArr: []
    }
  },
  actions: {
    SET_ROUTES(roles) {
      return new Promise(resolve => {
        let accessedRoutes
        if (roles.includes('admin')) {
          accessedRoutes = asyncRoutes || []
        } else {
          accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        }
        this.addRoutesArr = accessedRoutes
        this.routes = [
          {
            path: '/',
            name: 'layout',
            redirect: accessedRoutes[0].path || '/dashboard',
            component: shallowRef(Layout),
            children: [
              ...accessedRoutes,
              {
                path: '/:pathMatch(.*)*',
                redirect: '/404'
              }
            ]
          },
          ...constantRoutes
        ]
        console.log('this.routes===', this.routes)
        addRoutes(this.routes)
        resolve()
      })
    }
  }
})
