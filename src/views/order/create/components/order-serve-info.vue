<template>
  <el-card class="mt-20px">
    <template #header>
      <div class="flex justify-between">
        <span class="kl-card-title">服务信息</span>
        <div>
          <el-switch v-model="value1" active-text="添加作业人员" />
          <el-button :icon="CirclePlus" type="primary" plain class="ml-20px">新增服务</el-button>
        </div>
      </div>
    </template>
    <div class="flex">
      <tisp-tabs v-model="current" :tabs="tabs" tab-position="left"></tisp-tabs>
      <div class="w-full">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="服务名称" align="center" />
          <el-table-column prop="date" label="服务价格" align="center" />
          <el-table-column prop="date" label="服务工时" align="center" />
          <el-table-column prop="date" label="作业人员" align="center" />
          <el-table-column prop="date" label="工时分成" align="center" />
          <el-table-column prop="date" label="操作" align="center" />
        </el-table>
        <div class="text-right mt-20px">
          <span class="kl-label">小计:</span>
          <span class="text-red-500 ml-10px">¥ 0.00</span>
        </div>
      </div>
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
