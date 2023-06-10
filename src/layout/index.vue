<template>
  <el-container>
    <el-aside width="auto">
      <vsider />
    </el-aside>
    <el-container style="height: 100vh">
      <el-header class="header-container" height="50px">
        <vheader />
      </el-header>
      <el-main style="padding: 0;">
        <el-scrollbar>
          <router-view />
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts" setup>
import vsider from './layoutSider/index.vue'
import vheader from './layoutHeader/index.vue'
</script>

<style lang="scss" scoped>
.header-container {
  padding-left: 0;
  font-size: 12px;
  background: pink;
}
</style>