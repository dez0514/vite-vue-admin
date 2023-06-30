<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>
<script lang="ts" setup>
  import { watch } from 'vue'
  import { ElConfigProvider } from 'element-plus'
  import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
  import en from 'element-plus/dist/locale/en.mjs'
  import dayjs from 'dayjs'
  import 'dayjs/locale/zh-cn'
  import 'dayjs/locale/en'
  import { computed } from 'vue'
  import { useConfigStore } from '@/store'
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
</script>