<template>
  <div>
    <Logo />
    <el-scrollbar>
      <Menu />
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
// import { computed, reactive } from 'vue'
// import { useConfigStore } from '../../store'
import Logo from '../Logo/index.vue'
import Menu from './menu.vue'

// const configStore = useConfigStore()

// const set = reactive({
//   isCollapse: computed(() => {
//     return !configStore.collapse
//   })
// })
</script>

<style scoped lang="scss">
</style>