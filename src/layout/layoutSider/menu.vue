<template>
  <el-menu
    :active-text-color="variables.menuActiveText"
    :background-color="variables.menuBg"
    :text-color="variables.menuText"
    :default-active="set.activeMenu"
    :collapse="set.isCollapse"
    :unique-opened="true"
    :collapse-transition="false"
    :mode="mode"
    :class="['sidebar-menus', mode === 'horizontal' ? 'horizontal-menu' : '']"
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
import { toRefs } from '@vueuse/core'
type Props = {
  mode?: 'vertical' | 'horizontal'
}
const props = withDefaults(defineProps<Props>(), {
  mode: 'vertical'
})
const { mode } = toRefs(props)
const route = useRoute()
const configStore = useConfigStore()

const set = reactive({
  isCollapse: computed(() => {
    return configStore.collapse
  }),
  activeMenu: computed(() => {
    console.log('ccc===',route)
    const { path } = route
    // if (meta.activeMenu) {
    //   return meta.activeMenu
    // }
    return path
  })
})
</script>
<style lang="scss" scoped>
.horizontal-menu {
  width: 100%;
  border-color: transparent;
}
</style>

