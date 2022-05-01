<template>
  <el-card class="mt-20px">
    <template #header>
      <div class="flex justify-between">
        <span class="kl-card-title">配件信息</span>
        <div>
          <el-switch v-model="value1" active-text="添加负责人员" />
          <el-button :icon="CirclePlus" type="primary" plain class="ml-20px">新增商品</el-button>
        </div>
      </div>
    </template>
    <div class="flex">
      <tisp-tabs v-model="current" :tabs="tabs" tab-position="left"></tisp-tabs>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="Date" align="center" />
        <el-table-column prop="name" label="Name" align="center" />
        <el-table-column prop="address" label="Address" align="center" />
      </el-table>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { CirclePlus } from '@element-plus/icons-vue';
import TispTabs from '@/base-ui/tisp-tabs';

const current = ref('0');
const value1 = ref(true);

type tabType = {
  value: string;
  label: string;
};
const tabs: tabType[] = [
  { label: '分开结算', value: '0' },
  { label: '合并结算', value: '1' },
];
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
];
</script>

<style scoped></style>
