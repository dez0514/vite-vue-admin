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
import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark()
const toggleDark = useToggle(isDark)
const handleChangeTheme = () => {
  toggleDark()
}
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
  border: 1px solid var(--ep-border-color);
  background: var(--bg-color-mute);
  cursor: pointer;
  transition: all .3s;
  .switch__action {
    position: absolute;
    top: 1px;
    left: 1px;
    border-radius: 50%;
    background-color: var(--ep-bg-color);
    transform: translate(0);
    color: var(--ep-text-color-regular);
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