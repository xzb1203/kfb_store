<template>
  <div w:flex="~ center" w:justify="center" w:h="full" w:align="items-center">
    <div w:w="400px" w:flex="~ col center">
      <h1 class="font-bold mb-20px text-center text-1.8rem">卡服邦门店管理系统</h1>
      <el-input v-model="account" placeholder="请输入账号" class="mb-10px"></el-input>
      <el-input v-model="password" placeholder="请输入密码" class="mb-10px"></el-input>
      <el-button type="primary" @click="handleLogin">登录</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getRsaKeys } from '@/utils/jsrsasign';
import { useUserStore } from '@/store/modules/login';

const account = ref('testmd01');
const password = ref('123456');
const { handlePostLogin } = useUserStore();
function handleLogin() {
  const data = {
    userLoginAccount: account.value,
    userLoginPassword: password.value,
    userLongitude: '0000',
    userLatitude: '0000',
  };
  handlePostLogin(data);
}
onMounted(() => {
  getRsaKeys();
});
</script>

<style scoped></style>
