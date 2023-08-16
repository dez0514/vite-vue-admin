<template>
  <div>{{ t('header.home') }}</div>
  <!-- <div>{{ $t('header.home') }}</div> -->
  <div v-t="'header.home'"></div>
  <div>
    <el-date-picker
      v-model="value1"
      type="date"
      placeholder="Pick a day"
    />
  </div>
  <div v-for="i in 100" :key="i">{{ i }}</div>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router';
import { ref } from 'vue'
const router = useRouter()
const route = useRoute()
const { t } = useI18n()
const value1 = ref('')
console.log(route)
console.log(router)
</script>