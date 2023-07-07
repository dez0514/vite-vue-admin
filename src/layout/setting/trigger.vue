<template>
  <div class="setting-trigger common_hover_btn" @click="handleClickDrawer">
    <el-icon>
      <setting />
    </el-icon>
  </div>
</template>
<script lang="ts" setup>
import { Setting } from '@element-plus/icons-vue'
import { useConfigStore } from '@/store/index'
import { computed, reactive } from 'vue';
const configStore = useConfigStore()
const set = reactive({
  isShowDraw: computed(() => configStore.isShowRightDraw)
})
const handleClickDrawer = () => {
  configStore.SET_DRAW_ISSHOW(!set.isShowDraw)
}
</script>
<style lang="scss" scoped>
.setting-trigger {
  padding: 0 15px;
  height: 100%;
  cursor: pointer;
  font-size: 18px;
  user-select: none;
  display:flex;
  align-items:center;
  justify-content:center;
}
</style>