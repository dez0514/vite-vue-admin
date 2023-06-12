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
      <el-drawer v-model="set.isShowDraw" title="I am the title">
        <span>Hi there!</span>
      </el-drawer>
    </el-container>
  </el-container>
</template>
<script lang="ts" setup>
import vsider from './layoutSider/index.vue'
import vheader from './layoutHeader/index.vue'
import { useConfigStore } from '@/store/index'
import { computed, reactive } from 'vue';
const configStore = useConfigStore()
const set = reactive({
  isShowDraw: computed(() => configStore.isShowRightDraw)
})
</script>

<style lang="scss" scoped>
.header-container {
  padding-left: 0;
  padding-right: 0;
  font-size: 12px;
  background: pink;
}
</style>