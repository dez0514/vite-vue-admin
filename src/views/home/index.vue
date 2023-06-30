<template>
  <div>{{ t('header.home') }}</div>
  <div>{{ $t('header.home') }}</div>
  <div v-t="'header.home'"></div>
  <div>
    <el-date-picker
      v-model="value1"
      type="date"
      placeholder="Pick a day"
    />
  </div>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import { ref } from 'vue'
const value1 = ref('')
</script>