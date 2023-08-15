<template>
  <el-container>
    <el-aside v-if="navType === 'lt'" width="auto" style="overflow: hidden">
      <vsider />
    </el-aside>
    <el-container :class="['content-container', navType !== 'tl' && nofixHeader ? 'no_fix_header' : '']">
      <el-header class="header-container">
        <vheader />
      </el-header>
      <TagsView v-if="!isHideTagView" />
      <el-container>
        <el-aside v-if="navType === 'tl'" width="auto" style="overflow: hidden">
          <vsider :show-logo="false" />
        </el-aside>
        <el-container>
          <el-main class="main-container">
            <router-view />
          </el-main>
        </el-container>
      </el-container>
      <SettingDrawer />
    </el-container>
  </el-container>
</template>
<script lang="ts" setup>
import vsider from './layoutSider/index.vue'
import vheader from './layoutHeader/index.vue'
import TagsView from './tagsView/index.vue'
import SettingDrawer from './setting/drawer.vue'
import { useConfigStore } from '@/store/index'
import { computed } from 'vue';
const configStore = useConfigStore()
const isHideTagView = computed({
  get() {
    return configStore.hideTagsView || false
  },
  set(v: boolean) {
    configStore.SET_TAGVIEW_ISSHOW(v)
  }
}) 
const navType = computed(() => {
  return configStore.navType
})
const hideTagsView = computed(() => {
  return configStore.hideTagsView
})
const nofixHeader = computed(() => {
  return configStore.nofixHeader
})
const computedHeight = computed(() => {
  let offsetH = 50
  if(!hideTagsView.value) {
    offsetH += 40
  }
  return `calc(100vh - ${offsetH}px)`
})
</script>

<style lang="scss" scoped>
.content-container {
  position: relative;
  .header-container {
    height: 50px;
    padding-left: 0;
    padding-right: 0;
    font-size: 12px;
  }
  .main-container {
    padding: 0;
    height: v-bind(computedHeight);
  }
  &.no_fix_header {
    display: block;
    overflow: hidden;
    overflow-y: auto;
    height: 100vh;
    .main-container {
      overflow: hidden;
      height: fit-content;
    }
  }
}
</style>