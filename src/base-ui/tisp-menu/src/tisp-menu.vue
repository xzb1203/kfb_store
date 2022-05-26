<template>
  <el-menu
    :default-active="defaultActive"
    :default-openeds="defaultOpeneds"
    :unique-opened="uniqueOpened"
    :mode="model"
    :background-color="bgColor"
    :text-color="textColor"
    :active-text-color="activeTextColor"
    class="w-full justify-center"
    @select="handleSelect"
  >
    <template v-for="menu in menus">
      <tisp-menu-item v-if="menu.children && menu.children.length > 0" :menu="menu"></tisp-menu-item>
      <el-menu-item v-else :index="menu.name">
        <el-icon v-if="menu.icon"><component :is="menu.icon"></component></el-icon>
        <span>{{ menu.title }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { MenuType } from './tisp-menu.type';
import TispMenuItem from './tisp-menu-item.vue';

const props = defineProps({
  menus: {
    type: Array as PropType<MenuType[]>,
    default: () => [],
  },
  model: {
    type: String,
    default: 'vertical',
  },
  defaultActive: {
    type: String,
    default: '',
  },
  bgColor: {
    type: String,
    default: '',
  },
  textColor: {
    type: String,
    default: '',
  },
  activeTextColor: {
    type: String,
    default: '',
  },
  defaultOpeneds: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  uniqueOpened: {
    type: Boolean,
    default: true,
  },
});

const emits = defineEmits(['select']);

const handleSelect = (index: string, indexPath: string[]) => {
  console.log(index, indexPath);
  emits('select', { index, indexPath });
};
</script>
<style lang="scss" scoped>
.el-menu--horizontal {
  border: none;
}
.el-menu--horizontal > .el-menu-item {
  border-bottom: none;
}
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: none;
}
</style>
