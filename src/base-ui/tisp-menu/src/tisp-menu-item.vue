<template>
  <el-sub-menu :index="menu.name">
    <template #title>
      <el-icon v-if="menu.icon"><component :is="menu.icon"></component></el-icon>
      <span>{{ menu.title }}</span>
    </template>
    <template v-for="child in menu.children">
      <tisp-menu-item v-if="child.children && child.children.length > 0" :menu="menu"></tisp-menu-item>
      <el-menu-item v-else :index="child.name">
        <el-icon v-if="child.icon"><component :is="child.icon"></component></el-icon>
        <span>{{ child.title }}</span>
      </el-menu-item>
    </template>
  </el-sub-menu>
</template>
<script lang="ts" setup>
import { PropType } from 'vue'
import { MenuType } from './tisp-menu.type'

defineProps({
  menu: {
    type: Object as PropType<MenuType>,
    default: () => ({}),
  },
})
</script>
