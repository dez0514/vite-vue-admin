<template>
  <div>login</div>
  <el-input v-model="username"></el-input>
  <el-button @click="handleClick">登录</el-button>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { loginPost } from '@/api/user';
const username = ref<string>('admin')
const handleClick = () => {
  loginPost({ username: username.value }).then(res => {
    console.log(res)
  })
}
</script>