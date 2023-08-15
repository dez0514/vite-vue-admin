<template>
  <div class="login-container">
    <div class="lang-wrap">
      <SwitchLanguage :hover="false" />
    </div>
    <el-card class="login-card">
      <template #header>
        <h3 class="login-header">Vite Vue Admin</h3>
      </template>
      <el-form :model="form" :rules="rules" label-width="0" status-icon>
        <el-form-item prop="username">
          <el-input style="height: 40px" v-model="form.username" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input style="height: 40px" type="password" v-model="form.password" show-password clearable @keyup.enter="handleClick" />
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%;height: 40px" type="primary" @click="handleClick" :loading="loading">{{!loading ? t('views.login'):t('views.logining')}}</el-button>
        </el-form-item>
      </el-form>
      
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store'
import SwitchLanguage from '@/layout/switchLanguage/index.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
const loading = ref<boolean>(false)
interface RuleForm {
  username: string
  password: string
}
const form = reactive<RuleForm>({
  username: 'admin',
  password: '111'
})
const rules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur'}]
})
const userStore = useUserStore()
const router = useRouter()
const handleClick = async() => {
  const { username, password } = form
  try {
    loading.value = true
    const token = await userStore.DO_LOGIN({ username, password })
    if(token) {
      await userStore.GET_USER_INFO()
      loading.value = false
      router.push('/')
    }
  } catch (err) {
    loading.value = false
    console.log(err)
  }
}
</script>
<style lang="scss">
.login-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .lang-wrap {
    position: absolute;
    right: 10px;
    top: 10px;
  }
  .login-card {
    width: 460px;
    .login-header {
      text-align: center;
    }
  }
}
</style>