<template>
    <div ref="radarRef" :style="{ height: '300px', width: '100%' }" />
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
const radarRef = ref<any>(null)
let debounceResizeRef: any = null
let chartRef: any = null
const setOptions = (cht: any) => {
    cht.setOption({
        tooltip: {
            trigger: "axis",
            axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
            },
        },
        radar: {
            alignTicks: false,
            radius: "66%",
            center: ["50%", "42%"],
            splitNumber: 8,
            splitArea: {
                areaStyle: {
                    color: "rgba(127,95,132,.3)",
                    opacity: 1,
                    shadowBlur: 45,
                    shadowColor: "rgba(0,0,0,.5)",
                    shadowOffsetX: 0,
                    shadowOffsetY: 15,
                },
            },
            indicator: [
                { name: "Sales" },
                { name: "Administration" },
                { name: "Information Techology" },
                { name: "Customer Support" },
                { name: "Development" },
                { name: "Marketing" },
            ],
        },
        legend: {
            left: "center",
            bottom: "10",
            data: ["Allocated Budget", "Expected Spending", "Actual Spending"],
        },
        series: [
            {
                type: "radar",
                symbolSize: 0,
                areaStyle: {
                    shadowBlur: 13,
                    shadowColor: "rgba(0,0,0,.2)",
                    shadowOffsetX: 0,
                    shadowOffsetY: 10,
                    opacity: 1
                },
                data: [
                    {
                        value: [5000, 7000, 12000, 11000, 15000, 14000],
                        name: "Allocated Budget",
                    },
                    {
                        value: [4000, 9000, 15000, 15000, 13000, 11000],
                        name: "Expected Spending",
                    },
                    {
                        value: [5500, 11000, 12000, 15000, 12000, 12000],
                        name: "Actual Spending",
                    },
                ],
                animationDuration: 3000
            }
        ]
    })
}
const initChart = () => {
    if (!radarRef.value) return;
    chartRef = echarts.init(radarRef.value)
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
