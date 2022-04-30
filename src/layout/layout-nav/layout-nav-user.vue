<template>
  <div>
    <el-dropdown>
      <span w:cursor="pointer" w:flex="~" w:align="items-center">
        <el-avatar :size="30" :src="avatar" w:m="r-5px" />
        {{ userInfo.userName }}
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="logout" @click="handleExitClick">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/modules/login'
import localCache from '@/utils/cache'

const router = useRouter()
const userInfo = computed(() => useUserStore().userInfo)
const avatar = `${import.meta.env.VITE_PICTRUE_URL}userAvatar/${userInfo.value.userAvatar}`
const handleExitClick = () => {
  localCache.deleteCache('token')
  localCache.deleteCache('userInfo')
  router.push('/login')
}
</script>

<style scoped></style>
