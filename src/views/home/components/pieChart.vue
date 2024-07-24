<template>
    <div ref="pieRef" :style="{ height: '300px', width: '100%' }" />
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
const pieRef = ref<any>(null)
let debounceResizeRef: any = null
let chartRef: any = null
const setOptions = (cht: any) => {
    cht.setOption({
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            left: 'center',
            bottom: '10',
            data: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']
        },
        series: [
            {
                name: 'WEEKLY WRITE ARTICLES',
                type: 'pie',
                roseType: 'radius',
                radius: [15, 95],
                center: ['50%', '38%'],
                data: [
                    { value: 320, name: 'Industries' },
                    { value: 240, name: 'Technology' },
                    { value: 149, name: 'Forex' },
                    { value: 100, name: 'Gold' },
                    { value: 59, name: 'Forecasts' }
                ],
                animationEasing: 'cubicInOut',
                animationDuration: 3000
            }
        ]
    })
}
const initChart = () => {
    if (!pieRef.value) return;
    chartRef = echarts.init(pieRef.value)
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
