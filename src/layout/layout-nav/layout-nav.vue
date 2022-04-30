<template>
  <div
    w:p="x-20px"
    w:flex="~"
    w:w="full"
    w:h="full"
    w:align="items-center"
    w:justify="between"
    style="box-shadow: 0 1px 4px rgb(0 21 41 / 8%)"
  >
    <img :src="logo" alt="" w:h="25px" />
    <layout-nav-user></layout-nav-user>
  </div>
</template>

<script setup lang="ts">
import logo from '@/assets/images/store_logo.png'
import LayoutNavUser from './layout-nav-user.vue'
</script>

<style scoped></style>
