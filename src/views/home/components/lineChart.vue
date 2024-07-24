<template>
    <div ref="lineRef" :style="{ height: '300px' , width: '100%'}" />
</template>

<script lang="ts" setup>
import { ref, computed, toRefs,  watch, onMounted, onUnmounted } from 'vue'
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
const props = defineProps({
    expectedData: {
        type: Array,
        default: () => []
    },
    actualData: {
        type: Array,
        default: () => []  
    }
})
const { expectedData, actualData } = toRefs(props)
const lineRef = ref<any>(null)
let debounceResizeRef: any = null
let chartRef: any = null
const setOptions = (cht: any) => {
    cht.setOption({
        backgroundColor: "#fff",
        xAxis: {
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            boundaryGap: false,
            axisTick: {
                show: false,
            },
        },
        grid: {
            left: 10,
            right: 10,
            bottom: 10,
            top: 30,
            containLabel: true,
        },
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "cross",
            },
            padding: [5, 10],
        },
        yAxis: {
            axisTick: {
                show: false,
            },
        },
        legend: {
            data: ["expected", "actual"],
        },
        series: [
            {
                name: "expected",
                itemStyle: {
                    color: "#FF005A",
                },
                lineStyle: {
                    color: "#FF005A",
                    width: 2,
                },
                smooth: true,
                type: "line",
                data: expectedData.value,
                animationDuration: 2800,
                animationEasing: "cubicInOut",
            },
            {
                name: "actual",
                smooth: true,
                type: "line",
                itemStyle: {
                    color: "#3888fa",
                },
                areaStyle: {
                    color: "#f3f8ff",
                },
                lineStyle: {
                    color: "#3888fa",
                    width: 2,
                },
                data: actualData.value,
                animationDuration: 2800,
                animationEasing: "quadraticOut",
            },
        ],
    })
}
const initChart = () => {
    if (!lineRef.value) return;
    chartRef = echarts.init(lineRef.value)
    setOptions(chartRef)
    console.log(chartRef)
    debounceResizeRef = debounce(chartRef.resize, 300)
}
const resizeFunc = () => {
    if (debounceResizeRef && typeof debounceResizeRef === 'function') {
        debounceResizeRef()
    }
}
watch([expectedData, actualData], () => {
    setOptions(chartRef)
})
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
