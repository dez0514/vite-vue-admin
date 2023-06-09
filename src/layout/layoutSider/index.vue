<template>
  <div class="sider-wrapper">
    <Logo />
    <div style="height: calc(100vh - 50px)">
      <el-scrollbar>
        <Menu />
      </el-scrollbar>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import { computed, reactive } from 'vue'
// import { useConfigStore } from '../../store'
import Logo from '../Logo/index.vue'
import Menu from './menu.vue'

// const configStore = useConfigStore()

// const set = reactive({
//   isCollapse: computed(() => {
//     return !configStore.collapse
//   })
// })
</script>

<style lang="scss" scoped>
.sider-wrapper {
  height: 100vh;
}
.sidebar-menus {
  min-height: calc(100vh - 50px);
}

.sider-wrapper :deep(.sidebar-menus.el-menu--vertical) {
  .el-sub-menu {
    overflow: hidden;
  }
  .svg-icon {
    margin-right: 5px;
    font-size: 16px;
  }
  &.el-menu--collapse {
    .el-sub-menu {
      &>.el-sub-menu__title {
        &>span {
          height: 0;
          width: 0;
          overflow: hidden;
          visibility: hidden;
          display: inline-block;
        }
        &>.el-sub-menu__icon-arrow {
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