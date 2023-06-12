<template>
  <div class="setting-trigger" @click="handleClickDrawer">
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
  height: 50px;
  line-height: 52px;
  cursor: pointer;
  font-size: 18px;
  user-select: none;
  &:hover {
    background: rgba(0,0,0,0.06);
  }
}
</style>