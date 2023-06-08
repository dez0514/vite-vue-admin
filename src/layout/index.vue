<template>
  <el-container style="height: 500px">
    <vsider />
    <el-container>
      <vheader />
      <el-main>
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

<style scoped>

</style>