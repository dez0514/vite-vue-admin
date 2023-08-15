<template>
  <div :class="['sider-wrapper', set.isCollapse ? 'collapse-sider' : '']">
    <Logo v-if="showLogo && !set.isHideLogo" :is-collpase="set.isCollapse" />
    <div class="sider-scroll-wrap">
      <el-scrollbar>
        <Menu />
      </el-scrollbar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue'
import Logo from '../Logo/index.vue'
import Menu from './menu.vue'
import { useConfigStore } from '@/store'
import { toRefs } from '@vueuse/core';
type Props = {
  showLogo?: boolean
}
const configStore = useConfigStore()
const props = withDefaults(defineProps<Props>(), {
  showLogo: true
})
const { showLogo } = toRefs(props)
const set = reactive({
  isCollapse: computed(() => {
    return configStore.collapse
  }),
  isHideLogo: computed(() => {
    return configStore.hideLogo
  }),
  navType: computed(() => {
    return configStore.navType
  }),
  hideTagsView: computed(() => {
    return configStore.hideTagsView
  })
})
const computedHeight = computed(() => {
  let offsetH = 0
  if(set.navType === 'tl') {
    offsetH += 50 // logo 不在侧边栏，始终要减
    if(!set.hideTagsView) {
      offsetH += 40
    }
  } else {
    if(!set.isHideLogo) {
      offsetH += 50
    }
  }
  return `calc(100vh - ${offsetH}px)`
})
// const computedHeight = computed(() => {
//   if(set.navType === 'tl') {
//     return 'calc(100vh - 50px - 40px)'
//   }
//   return 'calc(100vh - 50px)'
// })
</script>

<style lang="scss" scoped>
.sider-wrapper {
  // 宽度给容器，为了让 整个侧边栏动画同步
  /* height: 100vh; */
  width: 210px;
  transition: width 0.28s;
  &.collapse-sider {
    width: 64px;
  }
}
.sidebar-menus {
  height: v-bind(computedHeight); // calc(100vh - 50px);
  border: 0;
}
.sider-scroll-wrap {
  height: v-bind(computedHeight);
}

.sider-wrapper :deep(.sidebar-menus.ep-menu--vertical) {
  width: 100%; // 必须要
  a, a:active {
    text-decoration: none!important;
  }
  .ep-sub-menu {
    overflow: hidden;
    .ep-sub-menu__title {
      &:hover {
        background-color:  var(--el-menu-hover-bg-color)!important;
      }
    }
  }
  .svg-icon {
    margin-right: 5px;
    font-size: 16px;
  }
  &.ep-menu--collapse {
    .ep-sub-menu {
      &>.ep-sub-menu__title {
        &>span {
          height: 0;
          width: 0;
          overflow: hidden;
          visibility: hidden;
          display: inline-block;
        }
        &>.ep-sub-menu__icon-arrow {
          display: none;
        }
      }
      .svg-icon {
        margin-right: 0;
        width: var(--el-menu-icon-width);
      }
    }
  }
}
</style>