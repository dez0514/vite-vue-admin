<template>
  <el-dropdown trigger="click">
    <div class="user-wrapper">
      <el-avatar :src="avatar" />
      <div class="username">{{ name }}</div>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <a target="_blank" href="https://github.com/dez0514/vite-vue-admin">
          <el-dropdown-item>
            <svg-icon icon-class="github" style="margin-right: 5px"></svg-icon>
            Github
          </el-dropdown-item>
        </a>
        <el-dropdown-item divided :icon="SwitchButton">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script lang="ts" setup>
import { SwitchButton } from '@element-plus/icons-vue'
import { useUserStore } from '@/store/index'
const userStore = useUserStore()
const { avatar, name } = userStore

</script>
<style lang="scss" scoped>
.user-wrapper {
  padding: 0 15px;
  height: 50px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  .username {
    margin-left: 5px;
  }
  &:hover {
    background: rgba(0,0,0,0.06);
  }
}
a {
  text-decoration: none;
}
</style>