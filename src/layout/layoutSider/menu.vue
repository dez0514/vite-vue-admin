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
const { menuActiveText } = toRefs(variables)
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
    const { meta, path } = route
    if (meta.activeMenu) {
      return meta.activeMenu
    }
    return path
  })
})
</script>
<style lang="scss" scoped>
.horizontal-menu {
  width: 100%;
  & > div {
    height: 49px;
  }
  :deep(.ep-menu-item) {
    height: 49px;// var(--ep-menu-item-height);
    line-height: 49px;
    &:not(.is-disabled):focus {
      color: v-bind(menuActiveText);
    }
  }
  :deep(.ep-sub-menu__title) {
    height: 49px;// var(--ep-menu-item-height);
    line-height: 49px;
  }
  :deep(a:active) {
    text-decoration: none!important;
  }
}
</style>
<style>
.nest-menu a, .nest-menu a:active {
  text-decoration: none!important;
}
</style>
