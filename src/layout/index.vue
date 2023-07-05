<template>
  <el-container>
    <el-aside width="auto" style="overflow: hidden">
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
      <el-drawer v-model="isShowDraw" title="系统设置">
        <div>Hi there!</div>
      </el-drawer>
    </el-container>
  </el-container>
</template>
<script lang="ts" setup>
import vsider from './layoutSider/index.vue'
import vheader from './layoutHeader/index.vue'
import { useConfigStore } from '@/store/index'
import { computed } from 'vue';
const configStore = useConfigStore()
const isShowDraw = computed({
  get() {
    return configStore.isShowRightDraw || false
  },
  set(v:boolean) {
    configStore.SET_DRAW_ISSHOW(v)
  }
})
</script>

<style lang="scss" scoped>
.header-container {
  padding-left: 0;
  padding-right: 0;
  font-size: 12px;
}
</style>