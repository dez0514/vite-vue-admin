<template>
    <div ref="barRef" :style="{ height: '300px', width: '100%' }" />
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { debounce } from "@/utils";
import echarts from '@/utils/echart'
import { useConfigStore } from '@/store';
const configStore = useConfigStore()
const isCollapse = computed(() => {
  return configStore.collapse
})
const navType = computed(() => {
    return configStore.navType
})

const barRef = ref<any>(null)
let debounceResizeRef: any = null
let chartRef: any = null
const setOptions = (cht: any) => {
    const animationDuration = 3000
    cht.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            top: 10,
            left: '2%',
            right: '2%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisTick: {
                    show: false
                }
            }
        ],
        series: [
            {
                name: 'pageA',
                type: 'bar',
                stack: 'vistors',
                barWidth: '60%',
                data: [79, 52, 200, 334, 390, 330, 220],
                animationDuration
            },
            {
                name: 'pageB',
                type: 'bar',
                stack: 'vistors',
                barWidth: '60%',
                data: [80, 52, 200, 334, 390, 330, 220],
                animationDuration
            },
            {
                name: 'pageC',
                type: 'bar',
                stack: 'vistors',
                barWidth: '60%',
                data: [30, 52, 200, 334, 390, 330, 220],
                animationDuration
            }
        ]
    })
}
const initChart = () => {
    if (!barRef.value) return;
    chartRef = echarts.init(barRef.value)
    setOptions(chartRef)
    console.log(chartRef)
    debounceResizeRef = debounce(chartRef.resize, 300)
}
const resizeFunc = () => {
    if (debounceResizeRef && typeof debounceResizeRef === 'function') {
        debounceResizeRef()
    }
}
watch([isCollapse, navType], () => {
    resizeFunc()
})
onMounted(() => {
    initChart()
    window.addEventListener("resize", () => resizeFunc())
})
onUnmounted(() => {
    window.removeEventListener("resize", () => resizeFunc())
})
</script>
