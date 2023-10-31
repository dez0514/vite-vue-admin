<template>
    <div>
        <div
            class='tw-h-[240px] tw-bg-[url(https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png)] tw-bg-no-repeat tw-bg-cover tw-transition-all tw-duration-200 tw-linear hover:tw-scale-[1.1] hover:tw-contrast-[1.3]'>
        </div>
        <div class='tw-relative tw-px-[20px] tw-pt-[52px] tw-pb-[20px]'>
            <div class='tw-absolute tw-w-[70px] tw-h-[70px] tw-top-[-25px] tw-left-[20px]'>
                <Thumb :image="avatar" :text="name" />
            </div>
            <TextHover class="tw-absolute tw-right-[20px] tw-top-[20px] tw-text-[25px] tw-font-bold" text="Vue3 ElementPlus Admin" style="position: absolute" />
            <div>
                <div>
                    <div>Vue3</div>
                    <el-progress :percentage="90" />
                </div>
                <div>
                    <div>JavaScript</div>
                    <el-progress :percentage="95" />
                </div>
                <div>
                    <div>Pinia</div>
                    <el-progress :percentage="30" />
                </div>
                <div>
                    <div>TypeScript</div>
                    <el-progress :percentage="85" />
                </div>
                <div>
                    <div>Vue Router</div>
                    <el-progress :percentage="70" />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import TextHover from '@/components/TextHover.vue'
import Thumb from '@/components/Thumb.vue'
import { useUserStore } from '@/store'
const userStore = useUserStore()
const { avatar, name } = userStore
</script>