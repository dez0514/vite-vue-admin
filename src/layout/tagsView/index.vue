<template>
  <div class="tags-view-wrapper">
    <el-scrollbar>
      <div class="scrollbar-content">
        <router-link v-for="tag in tagsViewArr" :key="tag.path"
          :class="['tags-view-item', isActive(tag) ? 'active' : '']" :to="{ path: tag.path, query: tag.query }" tag="span">
          {{ tag.title }}
          <el-icon class="icon-close" v-if="!isAffix(tag)">
            <Close />
          </el-icon>
        </router-link>
      </div>
    </el-scrollbar>
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { Close } from '@element-plus/icons-vue'
import { useTagsViewStore } from '@/store/index'
import { useRoute } from 'vue-router';
const tagsViewStore = useTagsViewStore()
const tagsViewArr = computed(() => {
  return tagsViewStore.tagsViewArr || []
})
const route = useRoute()
const isActive = (tag: any) => {
  return tag.path === route.path;
}
const isAffix = (tag: any) => {
  return tag.meta && tag.meta.affix;
}
</script>
<style lang="scss" scoped>
.tags-view-wrapper {
  overflow: hidden;
  box-sizing: border-box;
  height: 40px;
  width: 100%;
  border-bottom: 1px solid var(--header-border-color);
  box-shadow: var(--header-shadow);
}

.tags-view-wrapper :deep(.ep-scrollbar__view) {
  height: 100%;
}

.scrollbar-content {
  display: flex;
  align-items: center;
  height: 100%;

  .tags-view-item {
    flex-shrink: 0;
    display: block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 14px;
    margin-left: 5px;
    text-decoration: none;

    &:first-of-type {
      margin-left: 15px;
    }

    &:last-of-type {
      margin-right: 15px;
    }

    &.active {
      background-color: #42b983;
      color: #fff;
      border-color: #42b983;

      &::before {
        content: '';
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 2px;
      }
    }
  }
}

.icon-close {
  position: relative;
  top: 4px;
  width: 16px;
  height: 16px;
  vertical-align: 2px;
  border-radius: 50%;
  text-align: center;
  transition: all .3s cubic-bezier(.645, .045, .355, 1);
  transform-origin: 100% 50%;

  &:before {
    transform: scale(.6);
    display: inline-block;
    vertical-align: -3px;
  }

  &:hover {
    background-color: #b4bccc;
    color: #fff;
  }
}
</style>