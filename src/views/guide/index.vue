<template>
  <div class="page-margin">
    <el-card class="box-card">
      <template #header>
        <div style="font-weight: bold;">新手指引</div>
      </template>
      <div>
        引导页对于一些第一次进入项目的人很有用，你可以简单介绍下项目的功能。本Demo是基于
        <a href="https://driverjs.com" target="_blank">driver.js</a>
      </div>
    </el-card>
    <div style="margin-top: 20px;">
      <el-button type="primary" @click="handleClickGuide">新手指引</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, watch, onUnmounted } from 'vue'
import { useConfigStore } from '@/store';
import { initDriver } from '@/utils/driver'
import { useI18n } from 'vue-i18n'
const configStore = useConfigStore()
const { t } = useI18n()
let driverObj = initDriver(t)
const isCollapse = computed(() => {
  return configStore.collapse
})
const language = computed(() => {
  return configStore.language
})
let timer: any = null
watch(isCollapse, () => {
  if(timer) clearInterval(timer);
  timer = setTimeout(() => {
    clearInterval(timer)
    driverObj.refresh();
  }, 300)
})
watch(language, () => {
  driverObj = initDriver(t)
})
const handleClickGuide = () => {
  driverObj.drive()
}
onUnmounted(() => {
  if(timer) clearInterval(timer);
})
</script>

