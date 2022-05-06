<template>
  <el-container w:h="full">
    <el-header w:p="x-0">
      <layout-nav></layout-nav>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <layout-menu></layout-menu>
      </el-aside>
      <el-main class="min-w-1300px overflow-y-auto h-[calc(100vh-60px)]">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import LayoutNav from './layout-nav/layout-nav.vue';
import LayoutMenu from './layout-menu/layout-menu.vue';
</script>

<style lang="scss">
.web-table {
  &.el-table {
    .el-table__row {
      height: 55px;
    }
  }
}
</style>
