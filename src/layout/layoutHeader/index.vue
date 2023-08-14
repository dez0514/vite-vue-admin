<template>
  <div class="header-wrap">
    <div class="header-left">
      <div class="collapse-trigger common_hover_btn" @click="handleTriggerCollapse">
        <el-icon>
          <Expand v-show="set.isCollapse" />
          <Fold v-show="!set.isCollapse" />
        </el-icon>
      </div>
      <Menu mode="horizontal" />
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
import { useConfigStore } from '@/store';
import Menu from '../layoutSider/menu.vue'
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
  box-sizing: border-box;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background: #fff; */
  border-bottom: 1px solid var(--header-border-color);
  box-shadow: var(--header-shadow);
}
.header-left {
  height: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.collapse-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 15px;
  font-size: 16px;
  cursor: pointer;
}

.header-right {
  display: flex;
  align-items: center;
  height: 100%;
}
</style>