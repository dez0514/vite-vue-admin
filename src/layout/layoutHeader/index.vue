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
    <div class="header-right">
      <fullscreen />
      <switchLanguage />
      <userAvatar />
      <setTrigger />
    </div>
  </div>
</template>
<script lang="ts" setup>
import fullscreen from '../fullscreen/index.vue'
import switchLanguage from '../switchLanguage/index.vue'
import setTrigger from '../setting/trigger.vue'
import userAvatar from '../userAvatar/index.vue'
import { Expand, Fold } from '@element-plus/icons-vue'
import { computed, reactive } from 'vue';
import { useConfigStore } from '@/store'
const configStore = useConfigStore()
const set = reactive({
  isCollapse: computed(() => {
    return configStore.collapse
  })
})
const handleTriggerCollapse = () => {
  // configStore.SET_COLLAPSE(!set.isCollapse)
  configStore.SET_CONFIG({ collapse: !set.isCollapse })
}
</script>
<style lang="scss" scoped>
.header-wrap {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  box-shadow: 0 1px 4px #00152914;
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

.header-right {
  display: flex;
  align-items: center;
}
</style>