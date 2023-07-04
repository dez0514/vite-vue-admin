<template>
  <div class="theme-trigger">
    <button :class="['switch', isDark ? 'dark' : '']" @click="handleChangeTheme">
      <div class="switch__action">
        <div class="switch__icon">
          <svg-icon v-show="isDark" class="dark-icon" icon-class="dark" />
          <svg-icon v-show="!isDark" class="light-icon" icon-class="light" />
        </div>
      </div>
    </button>
  </div>
</template>
<script lang="ts" setup>
import { computed, watch } from 'vue';
import { useConfigStore } from '@/store'
const configStore = useConfigStore()
const isDark = computed(() => {
  return configStore.theme === 'dark'
})
const handleChangeTheme = () => {
  let newTheme = ''
  if(isDark.value) {
    newTheme = 'light'
  } else {
    newTheme = 'dark'
  }
  configStore.SET_CONFIG({ theme: newTheme })
}
const setThemeClass = (isdark: boolean) => {
  if(isdark) {
    document.documentElement.setAttribute('class', 'dark')
  } else {
    document.documentElement.setAttribute('class', '')
  }
}
// 立即执行，初始化就给class
watch(isDark, (val) => {
  setThemeClass(val)
}, { immediate: true })

</script>
<style lang="scss" scoped>
.theme-trigger {
  display: flex;
  align-items: center;
  transition: border-color .3s, background-color 0.3s;
  background-color: transparent;
  border-radius: 50%;
  height: 24px;
  padding: 0 12px;
}

.switch {
  margin: 0;
  display: block;
  position: relative;
  width: 40px;
  height: 20px;
  outline: none;
  border-radius: 10px;
  box-sizing: border-box;
  border: 1px solid #dcdfe6;
  background: #f2f2f2;
  cursor: pointer;
  transition: all .3s;
  .switch__action {
    position: absolute;
    top: 1px;
    left: 1px;
    border-radius: 50%;
    background-color: #fff;
    transform: translate(0);
    color: #606266;
    transition: all .3s;
  }
  &.dark .switch__action {
    transform: translate(20px);
  }
}

.switch__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  font-size:12px;
}
</style>