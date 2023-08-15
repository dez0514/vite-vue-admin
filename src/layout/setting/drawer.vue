<template>
  <el-drawer v-model="isShowDraw" title="系统设置">
    <div>
      <div class="set-item">
        <div class="set-tit">主题模式</div>
        <div>
          <switchTheme />
        </div>
      </div>
      <div class="set-item">
        <div class="set-tit">主题颜色</div>
        <div>
          <el-color-picker v-model="primaryColor"></el-color-picker>
        </div>
      </div>
      <div class="set-item">
        <div class="set-tit">是否显示Logo</div>
        <div>
          <el-switch v-model="isHideLogo" :active-value="false" :inactive-value="true"></el-switch>
        </div>
      </div>
      <div v-if="navType !== 'tl'" class="set-item">
        <div class="set-tit">固定Header</div>
        <div>
          <el-switch v-model="nofixHeader" :active-value="false" :inactive-value="true"></el-switch>
        </div>
      </div>
      <div class="set-item">
        <div class="set-tit">是否显示TagsView</div>
        <div>
          <el-switch v-model="isHideTagView" :active-value="false" :inactive-value="true"></el-switch>
        </div>
      </div>
      <div class="set-item nav">
        <div class="set-tit">导航模式</div>
        <div class="set_nav">
          <div class="nav_box type_lt" @click="handleNavType('lt')">
            <div class="left"></div>
            <div class="top"></div>
            <div v-if="navType === 'lt'" class="anchor">✔</div>
          </div>
          <div class="nav_box type_tl" @click="handleNavType('tl')">
            <div class="top"></div>
            <div class="left"></div>
            <div v-if="navType === 'tl'" class="anchor">✔</div>
          </div>
          <div class="nav_box type_t" @click="handleNavType('t')">
            <div class="top"></div>
            <div v-if="navType === 't'" class="anchor">✔</div>
          </div>
        </div>
      </div>
    </div>
  </el-drawer>
</template>
<script lang="ts" setup>
import switchTheme from '../switchTheme/index.vue'
import { useConfigStore } from '@/store/index'
import { computed } from 'vue';
import { ElMessage } from 'element-plus'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const configStore = useConfigStore()
const primaryColor = computed({
  get() {
    return configStore.primaryColor
  },
  set(v: string) {
    if(!v) {
      ElMessage({
        message: t('setting.primaryColorValid'),
        type: 'warning',
      })
      return
    }
    configStore.SET_PRIMARYCOLOR(v)
  }
})
const isHideLogo = computed({
  get() {
    return configStore.hideLogo || false
  },
  set(v: boolean) {
    configStore.SET_LOGO_ISSHOW(v)
  }
})
const nofixHeader = computed({
  get() {
    return configStore.nofixHeader || false
  },
  set(v: boolean) {
    configStore.SET_ISNOFIXHEAD(v)
  }
})
const isHideTagView = computed({
  get() {
    return configStore.hideTagsView || false
  },
  set(v: boolean) {
    configStore.SET_TAGVIEW_ISSHOW(v)
  }
}) 
const isShowDraw = computed({
  get() {
    return configStore.isShowRightDraw || false
  },
  set(v:boolean) {
    configStore.SET_DRAW_ISSHOW(v)
  }
})
const navType = computed(() => {
  return configStore.navType
})
const handleNavType = (v:string) => {
  if(v === 'tl') {
    configStore.SET_ISNOFIXHEAD(false)
  }
  configStore.SET_NAVTYPE(v)
}
</script>

<style lang="scss" scoped>
.set-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  &.nav {
    align-items: start;
  }
}
.set_nav {
  display: flex;
  justify-content: center;
  align-items: center;
}
.nav_box {
  position: relative;
  overflow: hidden;
  margin-left: 10px;
  width: 50px;
  height: 50px;
  background-color: #f0f2f5;
  border: 1px solid #d3d3d3;
  box-shadow: 0px 1px 4px #d3d3d3;
  border-radius: 5px;
  cursor: pointer;
  .anchor {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  &.type_lt {
    display: flex;
    .left {
      width: 20px;
      height: 48px;
      border-right: 1px solid #d3d3d3;
      background-color: #fff;
    }
    .top {
      flex: 1;
      height: 12px;
      border-bottom: 1px solid #d3d3d3;
      background-color: #fff;
    }
  }
  &.type_tl {
    .top {
      width: 100%;
      height: 12px;
      border-bottom: 1px solid #d3d3d3;
      background-color: #fff;
    }
    .left {
      width: 20px;
      height: 36px;
      border-right: 1px solid #d3d3d3;
      background-color: #fff;
    }
  }
  &.type_t .top {
    width: 100%;
    height: 12px;
    border-bottom: 1px solid #d3d3d3;
    background-color: #fff;
  }
}
</style>