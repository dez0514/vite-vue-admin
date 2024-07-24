<template>
  <div class="page-margin">
    <div class="tw-flex">
      <div v-for="item in cardList" class='tw-flex-1 tw-mr-[20px] tw-cursor-pointer last:tw-mr-0' :key="item.id" @click="handleClickCard(item.id)">
        <Card :cardInfo="item" />
      </div>
    </div>
    <div className='tw-box-border tw-p-[20px] tw-mt-[20px] tw-shadow-card tw-bg-white hover:tw-transition-all hover:tw-duration-300 hover:tw-translate-y-[-6px]'>
      <LineChart :expectedData="lineChartData.expectedData" :actualData="lineChartData.actualData" />
    </div>
    <div className='tw-flex tw-mt-[20px]'>
      <div className='tw-box-border tw-p-[20px] tw-shadow-card tw-flex-1 tw-mr-[20px] tw-bg-white hover:tw-transition-all hover:tw-duration-300 hover:tw-translate-y-[-6px]'>
        <RaddarChart />
      </div>
      <div className='tw-box-border tw-p-[20px] tw-shadow-card tw-flex-1 tw-mr-[20px] tw-bg-white hover:tw-transition-all hover:tw-duration-300 hover:tw-translate-y-[-6px]'>
        <PieChart />
      </div>
      <div className='tw-box-border tw-p-[20px] tw-shadow-card tw-flex-1 tw-bg-white hover:tw-transition-all hover:tw-duration-300 hover:tw-translate-y-[-6px]'>
        <BarChart />
      </div>
    </div>
    <div className='tw-flex tw-mt-[20px]'>
      <div class='tw-overflow-hidden tw-box-border tw-rounded-[8px] tw-shadow-card tw-flex-[2.5] tw-mr-[20px] tw-bg-white tw-h-[fit-content]'>
        <el-table :data="listData" :header-cell-style="{ background:'#f5f7fa' }">
          <el-table-column prop="order_no" label="Order_No" :minWidth="180" />
          <el-table-column prop="price" label="Price" />
          <el-table-column prop="tag" label="Tag">
            <template  #default="{ row }">
              <el-tag :type="row.tag === 'success' ? 'success' : ''" effect="plain">{{ row.tag }}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class='tw-overflow-hidden tw-box-border tw-rounded-[8px] tw-shadow-card tw-flex-1 tw-bg-white tw-h-[fit-content]'>
        <BoxCard />
      </div>
    </div>
   
  </div>
</template>
<script lang="ts" setup>
import BoxCard from './components/boxCard.vue'
import Card from './components/card.vue'
import LineChart from './components/lineChart.vue'
import BarChart from './components/barChart.vue'
import PieChart from './components/pieChart.vue'
import RaddarChart from './components/raddarChart.vue'
import { Aim, Ship, Discount, Setting } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { getOrderList } from '@/api/home'
import { onMounted } from 'vue'
const cardList: any = [
  {
    id: 1,
    end: 6666,
    duration: 3000,
    title: 'Order',
    icon: Aim,
    badge: '+56%',
    badgeBg: '#29bbe3',
    info: 'From previous period',
    prefix: '￥'
  },
  {
    id: 2,
    end: 95270,
    duration: 4000,
    prefix: '￥',
    title: 'Income',
    icon: Ship,
    badge: '+78%',
    badgeBg: '#f5b225',
    info: 'From previous period'
  },
  {
    id: 3,
    end: 666,
    duration: 3500,
    prefix: '￥',
    title: 'Average Price',
    icon: Discount,
    badge: '-5.2%',
    badgeBg: '#ec536c',
    info: 'From previous period'
  },
  {
    id: 4,
    end: 9527,
    duration: 5000,
    title: 'Product Sold',
    icon: Setting,
    badgeBg: '#29bbe3',
    info: 'From previous period'
  }
]
const lineChartDefaultData = { // 与 cardList 的 id 对应
  1: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145],
  },
  2: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130],
  },
  3: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130],
  },
  4: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130],
  },
}
const lineChartData = ref<any>(lineChartDefaultData[1])
const listData = ref<any>([])
const handleClickCard = (id: 1 | 2 | 3 | 4) => {
  lineChartData.value = lineChartDefaultData[id]
}
const getList = () => {
    getOrderList().then((res: any) => {
      if(res.code === 0) {
        const temp = res.data.slice(0, 9).map((item: any, index: number) => {
          return {
            ...item,
            key: String(index)
          }
        })
        listData.value = temp
      }
    })
  }
onMounted(() => {
  getList()
})
</script>