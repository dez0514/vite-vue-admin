<template>
  <div v-if="!props.item.meta?.hidden">
    <template v-if="hasOneShowingChild(props.item.children, props.item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !props.item.meta?.alwaysShow">
      <AppLink v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{ 'submenu-title-noDropdown': !props.isNest }">
          <!-- Custom Icon -->
          <el-icon v-if="onlyOneChild.meta.icon || (props.item.meta && props.item.meta.icon)">
            <svg-icon
              class-name="menu-icons"
              :icon-class="onlyOneChild.meta.icon || (props.item.meta && props.item.meta.icon)"
            />
          </el-icon>
          <!-- Element Icon -->
          <el-icon v-if="onlyOneChild.meta.elIcon || (props.item.meta && props.item.meta.elIcon)">
            <component :is="onlyOneChild.meta.elIcon || (props.item.meta && props.item.meta.elIcon)" />
          </el-icon>
          <template #title>
            <span> {{ $t(onlyOneChild.meta.title) }} </span>
          </template>
        </el-menu-item>
      </AppLink>
    </template>
    <el-sub-menu v-else ref="subMenu" popper-class="sub-menu-test" :index="resolvePath(props.item.path)">
      <template #title>
        <!-- Custom Icon -->
        <svg-icon
          v-if="props.item.meta && props.item.meta.icon"
          class-name="menu-icons"
          :icon-class="props.item.meta && props.item.meta.icon"
        />
        <!-- Element Icon -->
        <el-icon v-if="props.item.meta && props.item.meta.elIcon">
          <component :is="props.item.meta && props.item.meta.elIcon" />
        </el-icon>
        <span> {{ $t(props.item.meta.title) }} </span>
      </template>
      <SidebarItem
        class="nest-menu"
        v-for="child in props.item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
      />
    </el-sub-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import path from 'path'
import { isExternal } from '../../utils/validate'
import AppLink from './link.vue'
// eslint-disable-next-line no-undef
const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  isNest: {
    type: Boolean,
    default: false
  },
  basePath: {
    type: String,
    default: ''
  }
})

const onlyOneChild = ref<any>(null)
const subMenu = ref<any>(null)

function hasOneShowingChild(children = [], parent: any) {
  const showingChildren = children.filter((item: any) => {
    if (item.meta?.hidden) {
      return false
    } else {
      onlyOneChild.value = item
      return true
    }
  })
  if (showingChildren.length === 1) {
    return true
  }
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
    return true
  }
  return false
}

const resolvePath = (routePath: string) => {
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(props.basePath)) {
    return props.basePath
  }
  return path.resolve(props.basePath, routePath)
}

defineOptions({
  name: 'SidebarItem'
})
</script>
<style lang="scss" scoped>

</style>