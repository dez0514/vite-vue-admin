<template>
  <el-dropdown trigger="click">
    <div class="lang-trigger">
      <svg-icon icon-class="lang" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item in langMenu" :key="item.key">{{ item.label }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<script lang="ts" setup>
const langMenu = [
  {
    key: 'zh',
    label: '简体中文'
  },
  {
    key: 'en',
    label: 'English'
  }
]
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
</style>