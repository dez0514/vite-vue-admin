<template>
  <div id='fullscreen' class="fullscreen common_hover_btn" @click="handleFullScreen">
    <svg-icon v-show="!fullScreen" icon-class="fullscreen-open" />
    <svg-icon v-show="fullScreen" icon-class="fullscreen-exit" />
  </div>
</template>

<script lang="ts" setup>
import screenfull from 'screenfull'
import { ElMessage } from 'element-plus'
import { onMounted, onUnmounted, ref } from 'vue'
const fullScreen = ref<boolean>(false)
const handleFullScreen = () => {
  if (!screenfull.isEnabled) ElMessage('当前您的浏览器不支持全屏 ❌')
  screenfull.toggle()
}
onMounted(() => {
  screenfull.on('change', () => {
    if (screenfull.isFullscreen) fullScreen.value = true
    else fullScreen.value = false
  })
})
onUnmounted(() => {
  screenfull.off('change', () => {})
})
</script>
<style lang="scss" scoped>
.fullscreen {
  font-size: 20px;
  padding: 0 15px;
  height: 100%;
  cursor: pointer;
  user-select: none;
  display:flex;
  align-items:center;
  justify-content:center;
}
</style>