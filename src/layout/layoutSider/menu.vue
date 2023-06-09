<template>
  <el-menu
    :active-text-color="variables.menuActiveText"
    :background-color="variables.menuBg"
    :text-color="variables.menuText"
    :default-active="set.activeMenu"
    :collapse="set.isCollapse"
    :unique-opened="true"
    :collapse-transition="true"
    mode="vertical"
    class="sidebar-menus"
  >
    <SidebarItem
      v-for="item in asyncRoutes"
      :key="item.path"
      :item="item"
      :base-path="item.path"
    />
  </el-menu>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue'
import variables from '@/styles/variables.module.scss'
import SidebarItem from './sidebarItem.vue'
import { useRoute } from 'vue-router'
import { useConfigStore } from '@/store'
import { asyncRoutes } from '@/router'

const route = useRoute()
const configStore = useConfigStore()

const set = reactive({
  isCollapse: computed(() => {
    return configStore.collapse
  }),
  activeMenu: computed(() => {
    const { meta, path } = route
    if (meta.activeMenu) {
      return meta.activeMenu
    }
    return path
  }),
  // routerLists: computed(() => {
  //   return 
  // })
})
</script>
