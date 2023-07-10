<template>
  <div class="tags-view-wrapper" ref="tagsviewConRef">
    <el-scrollbar ref="tagsviewRef" @wheel.native.prevent="handleScroll">
      <div class="scrollbar-content">
        <router-link v-for="tag in tagsViewArr" :key="tag.path"
          :class="['tags-view-item', isActive(tag) ? 'active' : '']"
          :to="{ path: tag.path, query: tag.query }" tag="span"
          @contextmenu.prevent.native="openMenu(tag, $event)"
        >
          {{ tag.title }}
          <el-icon class="icon-close" v-if="!isAffix(tag)">
            <Close />
          </el-icon>
        </router-link>
      </div>
    </el-scrollbar>
    <ul v-show="visibleMenu" :style="{ left: `${curLeft}px`, top: `${curTop}px`}" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">{{ '刷新' }}</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">{{ '关闭' }}</li>
      <li @click="closeOthersTags">{{ '关闭其他' }}</li>
      <li @click="closeAllTags(selectedTag)">{{ '关闭所有' }}</li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
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
const visibleMenu = ref<boolean>(false)
const curLeft = ref<number>(0)
const curTop = ref<number>(0)
const tagsviewRef = ref<any>(null)
const tagsviewConRef = ref<any>(null)
const selectedTag = ref<any>({})
const scrollWrapper = computed(() => {
  return tagsviewRef?.value?.wrapRef
})
const handleScroll = (e: any) => {
  const eventDelta = e.wheelDelta || -e.deltaY * 40
  const $scrollWrapper = scrollWrapper.value
  $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4
}

const openMenu = (tag: any, e: any) => {
	const menuMinWidth = 105;
	const offsetLeft = tagsviewConRef.value.getBoundingClientRect().left; // container margin left
	const offsetWidth = tagsviewConRef.value.offsetWidth; // container width
  const maxLeft = offsetWidth - menuMinWidth; // left boundary
	const left = e.clientX - offsetLeft + 15; // 15: margin right
	if (left > maxLeft) {
		curLeft.value = maxLeft;
	} else {
		curLeft.value = left;
	}
	curTop.value = e.clientY;
  selectedTag.value = tag;
	visibleMenu.value = true
}
const closeMenu = () => {
	visibleMenu.value = false
}
const refreshSelectedTag = (tag: any) => {
  console.log(tag)
}
const closeSelectedTag = (tag: any) => {
  console.log(tag)
}
const closeOthersTags = () => {

}
const closeAllTags = (tag: any) => {
  console.log(tag)
}
watch(visibleMenu, (val) => {
  if (val) {
		document.body.addEventListener('click', closeMenu);
	} else {
		document.body.removeEventListener('click', closeMenu);
	}
})
</script>
<style lang="scss" scoped>
.tags-view-wrapper {
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
  width: max-content;

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

.contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
</style>