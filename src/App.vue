<template>
  <el-config-provider namespace="ep" :locale="locale">
    <router-view />
  </el-config-provider>
</template>
<script lang="ts" setup>
// @ts-nocheck
  import { watch } from 'vue'
  import { ElConfigProvider } from 'element-plus'
  import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
  import en from 'element-plus/dist/locale/en.mjs'
  import dayjs from 'dayjs'
  import 'dayjs/locale/zh-cn'
  import 'dayjs/locale/en'
  import { computed, onMounted } from 'vue'
  import { useConfigStore } from '@/store'
  import { StorageKeys } from './types/enum'
  const configStore = useConfigStore()
  const language = computed(() => {
    return configStore.language
  })
  const locale = computed(() => {
    return language.value === 'en' ? en : zhCn
  })
  watch(language, () => {
    console.log('immediate')
    dayjs.locale(language.value === 'en' ? 'en' : 'zh-cn')
  }, { immediate: true })
  onMounted(() => {
    const color = sessionStorage[StorageKeys.PRIMARYCOLOR]
    if(color) {
      document.getElementsByTagName('body')[0].style.setProperty('--ep-color-primary', color);
    }
  })
</script>