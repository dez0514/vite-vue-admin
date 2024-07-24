<template>
  <div :class="['header-wrap', set.navType === 't' ? 'top_bg' : '']">
    <div class="header-left">
      <Logo v-if="set.navType !== 'lt' && !set.isHideLogo" :class="set.navType + '_logo'" :is-collpase="false" style="width: 210px; background-color: transparent;" />
      <div v-if="set.navType !== 't'" id="sider-trigger" class="collapse-trigger common_hover_btn" @click="handleTriggerCollapse">
        <el-icon>
          <Expand v-show="set.isCollapse" />
          <Fold v-show="!set.isCollapse" />
        </el-icon>
      </div>
      <Menu v-if="set.navType === 't'" mode="horizontal" />
    </div>
    <div class="header-right">
      <fullscreen id="fullscreen" />
      <switchLanguage id="language-switch" />
      <userAvatar />
      <setTrigger id="system-setting" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import fullscreen from '../fullscreen/index.vue'
import switchLanguage from '../switchLanguage/index.vue'
import setTrigger from '../setting/trigger.vue'
import userAvatar from '../userAvatar/index.vue'
import { Expand, Fold } from '@element-plus/icons-vue'
import Logo from '../Logo/index.vue'
import { computed, reactive } from 'vue';
import { useConfigStore } from '@/store';
import Menu from '../layoutSider/menu.vue'
import variables from '@/styles/variables.module.scss'

const { menuBg } = variables
const configStore = useConfigStore()
const set = reactive({
  isCollapse: computed(() => {
    return configStore.collapse
  }),
  navType: computed(() => {
    return configStore.navType
  }),
  isHideLogo: computed(() => {
    return configStore.hideLogo
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
  &.top_bg {
    background-color: v-bind(menuBg);
  }
}
.header-left {
  height: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  :deep(.logo-wrap.tl_logo .title) {
    color: var(--ep-text-color-regular);
  }
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
<style>
.top_bg div {
  color: #fff;
}
</style>