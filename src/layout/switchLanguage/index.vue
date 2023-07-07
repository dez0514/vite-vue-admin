<template>
  <el-dropdown popper-class="lang-switch" trigger="click">
    <div :class="['lang-trigger', hover ? 'common_hover_btn' : '']">
      <svg-icon icon-class="lang" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in langMenu"
          :key="item.key"
          :disabled="language === item.key"
          @click="handleChangeLanguage(item.key)"
        >
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script lang="ts" setup>
import { computed, toRefs } from 'vue'
import { useConfigStore } from '@/store'
import { TypeLang } from '@/types/store';
import { setI18nLanguage } from '@/locale';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
// import { ElMessage } from 'element-plus' // 直接使用，导入会破坏按需引入的样式，导致没有样式
type Props = {
  hover?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  hover: true
})
const { hover } = toRefs(props)
type LangMenuType = {
  key: TypeLang,
  label: string
}
const { t: trans } =  useI18n()
const route = useRoute()
const configStore = useConfigStore()
const language = computed(() => {
  return configStore.language
})
const langMenu: LangMenuType[] = [
  { key: 'zh', label: '简体中文' },
  { key: 'en', label: 'English' }
]
const handleChangeLanguage = (t: TypeLang) => {
  configStore.SET_CONFIG({ language: t })
  setI18nLanguage(t)
  document.title = trans(route.meta.title as string)
  ElMessage({type: 'success', message: '语言切换成功'})
}
</script>
<style lang="scss" scoped>
.ep-dropdown {
  height: 100%;
}
.lang-trigger {
  padding: 0 15px;
  height: 100%;
  cursor: pointer;
  font-size: 16px;
  user-select: none;
  display:flex;
  align-items:center;
  justify-content:center;
}
</style>