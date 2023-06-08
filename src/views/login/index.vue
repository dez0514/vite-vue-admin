<template>
  <div>login</div>
  <el-input v-model="username"></el-input>
  <el-button @click="handleClick">登录</el-button>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store'
const username = ref<string>('admin')
const userStore = useUserStore()
const router = useRouter()
const handleClick = async() => {
  const token = await userStore.DO_LOGIN({ username: username.value, password: '111' })
  if(token) {
    const { roles } = await userStore.GET_USER_INFO()
    // setRoutes
    if(roles) {
      router.replace('/')
    }
  }
}
</script>