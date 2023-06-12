<template>
  <div :class="['logo-wrap', props.isCollpase ? 'collapse-logo' : '']">
    <transition name="logoTitleFade">
      <router-link v-if="props.isCollpase" key="collapse" :title="title" class="logo-link" to="/">
        <img v-if="logo" :src="logo" class="logo" />
        <div v-else class="title">{{ title }}</div>
      </router-link>
      <router-link v-else key="expand" :title="title" class="logo-link" to="/">
        <img v-if="logo" :src="logo" class="logo" />
        <div class="title">{{ title }}</div>
      </router-link>
    </transition>
  </div>
</template>
<script lang="ts" setup>
import logo from '@/assets/logo.png'
const props = defineProps({
  isCollpase: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: 'Vue Admin'
  }
})
</script>
<style lang="scss" scoped>
.logo-wrap {
  width: 100%;
  height: 50px;
  background: #2b2f3a;
  a, a:active {
    text-decoration: none!important;
  }
  .logo-link {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: inline-flex;
    align-items: center;
    padding: 0 12px 0 20px;
  }
  .logo {
    width: 26px;
    height: 26px;
    margin-right: 12px;
    display: block;
  }
  &.collapse-logo .logo-link {
    justify-content: center;
    padding: 0;
    .logo {
      margin-right: 0;
    }
  }
  .title {
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: #fff;
  }
}
.logoTitleFade-enter-active {
  transition: opacity 1.5s;
}
.logoTitleFade-enter-from,
.logoTitleFade-leave-to {
  opacity: 0;
}
</style>