<template>
  <div class="header-wrap">
    <div>
      <div class="collapse-trigger" @click="handleTriggerCollapse">
        <el-icon>
          <Expand v-show="set.isCollapse" />
          <Fold v-show="!set.isCollapse" />
        </el-icon>
      </div>
    </div>
    <div>
      <el-dropdown>
        <el-icon style="margin-right: 8px; margin-top: 1px">
          <setting />
        </el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>View</el-dropdown-item>
            <el-dropdown-item>Add</el-dropdown-item>
            <el-dropdown-item>Delete</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <span>Tom</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Expand, Fold, Setting } from '@element-plus/icons-vue'
import { useConfigStore } from '@/store'
import { computed, reactive } from 'vue';
const configStore = useConfigStore()
const set = reactive({
  isCollapse: computed(() => {
    return configStore.collapse
  })
})
const handleTriggerCollapse = () => {
  configStore.SET_COLLAPSE(!set.isCollapse)
}
</script>
<style lang="scss" scoped>
.header-wrap {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.collapse-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background: rgba(0,0,0,0.06);
  }
}
</style>