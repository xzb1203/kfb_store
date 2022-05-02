<template>
  <el-card class="mt-20px">
    <template #header>
      <div class="flex justify-between items-center">
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
        <el-table-column prop="date" label="配件图片" align="center">
          <template #default="{ row }">
            <el-image></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="配件信息" align="center">
          <template #default="{ row }">
            <div class="text-left">
              <div><span class="mr-10px inline-block w-50px text-right">名称: </span> <span>很好的配件</span></div>
              <div><span class="mr-10px inline-block w-50px text-right">编号: </span> <span>BH1099</span></div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="配件数量" align="center">
          <template #default="{ row }">
            <el-input-number v-model="row.workHour" :min="1" :max="10" controls-position="right" />
          </template>
        </el-table-column>
        <el-table-column prop="date" label="配件价格" align="center">
          <template #default="{ row }">
            <el-input-number v-model="row.workHour" :min="1" :max="10" controls-position="right" />
          </template>
        </el-table-column>
        <el-table-column prop="date" label="金额" align="center">
          <template #default="{ row }">
            <el-input-number v-model="row.workHour" :min="1" :max="10" controls-position="right" />
          </template>
        </el-table-column>
        <el-table-column prop="date" label="配件备注" align="center">
          <template #default="{ row }">
            <el-input placeholder="请输入备注信息"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="配件负责人" align="center">
          <template #default="{ row }">
            <el-select v-model="value" class="m-2" placeholder="请选择负责人">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="操作" align="center">
          <template #default="{ row }">
            <el-button type="text" :icon="Delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { CirclePlus, Delete } from '@element-plus/icons-vue';
import TispTabs from '@/base-ui/tisp-tabs';

const current = ref('0');
const value1 = ref(true);
const value = ref('');
type tabType = {
  value: string;
  label: string;
};
const tabs: tabType[] = [
  { label: '分开结算', value: '0' },
  { label: '合并结算', value: '1' },
];
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
];
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    workHour: 12,
    address: 'No. 189, Grove St, Los Angeles',
  },
];
</script>

<style scoped></style>
