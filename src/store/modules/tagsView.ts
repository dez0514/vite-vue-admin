import { defineStore } from 'pinia'
import { TagviewState } from '@/types/store'

export const useTagsViewStore = defineStore('tagsview', {
  state: (): TagviewState => ({
    tagsViewArr: [
      {
        path: '/dashboard',
        query: {},
        title: '首页',
        meta: {
          affix: true
        }
      },
      {
        path: '/guide',
        query: {},
        title: '引导页'
      },
      {
        path: '/permissionTest/intro',
        query: {},
        title: '权限介绍'
      },
      {
        path: '/dashboard',
        query: {},
        title: '首页',
        meta: {
          affix: true
        }
      },
      {
        path: '/guide',
        query: {},
        title: '引导页'
      },
      {
        path: '/permissionTest/intro',
        query: {},
        title: '权限介绍'
      },
      {
        path: '/dashboard',
        query: {},
        title: '首页',
        affix: true
      },
      {
        path: '/guide',
        query: {},
        title: '引导页'
      },
      {
        path: '/permissionTest/intro',
        query: {},
        title: '权限介绍'
      }
    ]
  }),
  actions: {
    ADD_TAGVIEW(payload: any) {
      this.tagsViewArr?.push(payload)
    }
  },
})