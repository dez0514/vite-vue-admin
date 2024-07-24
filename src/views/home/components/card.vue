<template>
    <div
        class='tw-relative tw-h-[100%] tw-text-white tw-rounded-[8px] tw-mb-[24] tw-bg-[#7a6fbe] tw-text-[16px] hover:tw-transition-all hover:tw-duration-300 hover:tw-translate-y-[-6px] tw-font-hel tw-shadow-card'>
        <div class='tw-p-[20px] tw-h-[100%] tw-bg-[url(@/assets/bg-1.png)] tw-bg-cover'>
            <div v-if="icon"
                class='tw-absolute tw-right-[20px] tw-top-[20px] tw-text-[30px] tw-w-[64px] tw-h-[64px] tw-flex tw-items-center tw-justify-center tw-rounded-full tw-bg-[rgba(255,255,255,0.1)]'>
                <el-icon>
                    <component :is="icon"></component>
                </el-icon>
            </div>
            <div>
                <div class='tw-mb-[16px]'>{{ title }}</div>
                <div class='tw-mb-[24px] tw-h-[28px] tw-leading-[28px]'>
                    {{ prefix || '' }}
                    <CountTo :startVal="start" :endVal="end" :duration="duration" />
                </div>
                <div class='tw-flex tw-items-center'>
                    <el-tag v-if="badge" class='tw-mr-[10px]' :color="badgeBg" :hit="false" effect="dark">{{
                        badge }}</el-tag>
                    <div v-if="info" class='tw-leading-[22px]'>{{ info }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { VNode } from 'vue';
import { CountTo } from 'vue3-count-to';
interface TypeCard {
    start: number
    end: number
    duration: number
    title: string
    prefix: string
    icon?: VNode | undefined
    badge?: string | undefined
    badgeBg: string
    info: string
}
const props = defineProps<{ cardInfo: TypeCard }>()
const { start, end, duration, title, prefix, icon, badge, info, badgeBg } = props.cardInfo
</script>
<style lang="scss" scoped>
:deep(.ep-tag) {
    border-color: white!important;
}
</style>
