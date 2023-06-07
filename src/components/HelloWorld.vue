<script setup lang="ts">
defineProps<{ msg: string }>()
</script>

<template>
  <h1>{{ msg }}</h1>
  <el-button>按钮</el-button>
</template>

<style lang="scss" scoped>
.read-the-docs {
  color: #888;
  .red {
    color: red;
  }
}
</style>
