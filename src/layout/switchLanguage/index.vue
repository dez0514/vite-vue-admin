<template>
  <el-dropdown popper-class="lang-switch" trigger="click">
    <div class="lang-trigger">
      <svg-icon icon-class="lang" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in langMenu"
          :key="item.key"
          :class="{ 'active-lang': language === item.key }"
          @click="handleChangeLanguage(item.key)"
        >
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { useConfigStore } from '@/store'
import { TypeLang } from '@/types/store';
import { setI18nLanguage } from '@/locale';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
// import { ElMessage } from 'element-plus' // 直接使用，导入会破坏按需引入的样式，导致没有样式
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
.lang-trigger {
  padding: 0 15px;
  height: 50px;
  line-height: 48px;
  cursor: pointer;
  font-size: 16px;
  user-select: none;
  &:hover {
    background: rgba(0,0,0,0.06);
  }
}
:deep(.el-dropdown-menu__item:not(.is-disabled):focus) {
  background-color: transparent;
  color: var(--el-text-color-regular);
}
:deep(.active-lang) {
  background-color: var(--el-dropdown-menuItem-hover-fill)!important;
  color: var(--el-dropdown-menuItem-hover-color)!important;
}
</style>