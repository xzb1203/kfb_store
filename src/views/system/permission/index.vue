<template>
  <el-card>
    <el-tabs v-model="activeName">
      <el-tab-pane label="员工管理" name="staff"></el-tab-pane>
      <el-tab-pane label="角色管理" name="role"></el-tab-pane>
    </el-tabs>
    <component :is="activeName === 'staff' ? Staff : Role"></component>
  </el-card>
</template>

<script setup lang="ts">
import Staff from './staff.vue';
import Role from './role.vue';

const activeName = ref('staff');
</script>

<style scoped></style>
