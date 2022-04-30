<template>
  <el-container w:h="full">
    <el-header w:p="x-0">
      <layout-nav></layout-nav>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <layout-menu></layout-menu>
      </el-aside>
      <el-main>
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
.el-main {
  background: #f5f8fd;
}

.el-card {
  border: none !important;
  &.is-always-shadow {
    box-shadow: none !important;
  }
}
.web-table {
  &.el-table {
    .el-table__row {
      height: 55px;
    }
  }
}
.el-table__header {
  display: none !important;
}
</style>
