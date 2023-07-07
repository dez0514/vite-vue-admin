<template>
  <el-dropdown trigger="click">
    <div class="user-wrapper common_hover_btn">
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
        <el-dropdown-item divided :icon="SwitchButton" @click="handleLogout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script lang="ts" setup>
import { SwitchButton } from '@element-plus/icons-vue'
import { useUserStore } from '@/store/index'
const userStore = useUserStore()
const { avatar, name } = userStore
const handleLogout = async () => {
  await userStore.RESET_INFO()
  location.reload()
}
</script>
<style lang="scss" scoped>
.ep-dropdown {
  height: 100%;
}
.user-wrapper {
  padding: 0 15px;
  height: 100%;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  .username {
    margin-left: 5px;
  }
}
a {
  text-decoration: none;
}
</style>