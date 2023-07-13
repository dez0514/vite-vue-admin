<template>
  <div :class="['sider-wrapper', set.isCollapse ? 'collapse-sider' : '']">
    <Logo :is-collpase="set.isCollapse" />
    <div style="height: calc(100vh - 50px)">
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

const configStore = useConfigStore()

const set = reactive({
  isCollapse: computed(() => {
    return configStore.collapse
  })
})
</script>

<style lang="scss" scoped>
.sider-wrapper {
  // 宽度给容器，为了让 整个侧边栏动画同步
  height: 100vh;
  width: 210px;
  transition: width 0.28s;
  &.collapse-sider {
    width: 64px;
  }
}
.sidebar-menus {
  min-height: calc(100vh - 50px);
  border: 0;
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