<template>
  <el-card class="mt-20px">
    <template #header>
      <div class="flex justify-between items-center">
        <span class="kl-card-title">服务信息</span>
        <div>
          <el-switch v-model="value1" active-text="添加作业人员" />
          <el-button :icon="CirclePlus" type="primary" plain class="ml-20px">新增服务</el-button>
        </div>
      </div>
    </template>
    <div class="flex">
      <tisp-tabs v-model="params.orderServiceItems.detailStageAmountType" :tabs="tabs" tab-position="left"></tisp-tabs>
      <div class="w-full">
        <el-table :data="params.orderServiceItems.projectDetails" style="width: 100%">
          <el-table-column prop="date" label="服务名称" align="center">
            <template #default="{ row }">
              <el-autocomplete
                v-model="row.itemName"
                :fetch-suggestions="querySearch"
                popper-class="my-autocomplete"
                placeholder="请输入服务名称"
                @select="handleSelect"
              >
                <template #default="{ item }">
                  <div>{{ item.value }}</div>
                  <span>{{ item.link }}</span>
                </template>
              </el-autocomplete>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="服务价格 / 元" align="center">
            <template #default="{ row }">
              <el-input-number v-model="row.itemUnitPrice" :min="1" :max="10" controls-position="right" />
            </template>
          </el-table-column>
          <el-table-column prop="date" label="服务工时 / 小时" align="center">
            <template #default="{ row }">
              <el-input-number v-model="row.workHour" :min="1" :max="10" controls-position="right" />
            </template>
          </el-table-column>
          <el-table-column prop="date" label="作业人员" align="center">
            <template #default="{ row }">
              <div v-for="item2 in row.workHourServices">
                {{ item2.userName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="工时分成" align="center">
            <template #default="{ row }">
              <div v-for="item2 in row.workHourServices" class="flex items-center">
                <el-slider v-model="item2.allocationProportion" class="!h-28px" />
                <span class="whitespace-nowrap ml-10px">{{ item2.allocationProportion }}%</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="操作" align="center">
            <template #default="{ row }">
              <el-button type="text" :icon="Edit">编辑</el-button>
              <el-button type="text" :icon="Delete">删除</el-button>
            </template>
          </el-table-column>
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
import { CirclePlus, Edit, Delete } from '@element-plus/icons-vue';
import { PropType } from 'vue';
import TispTabs from '@/base-ui/tisp-tabs';
import type { orderDetailType } from '../orderDetailType';

const props = defineProps({
  modelValue: {
    type: Object as PropType<orderDetailType>,
    default: () => ({}),
  },
});
const params = computed<orderDetailType>(() => props.modelValue);

const value1 = ref(true);
const tabs: any[] = [
  { label: '分开结算', value: 0 },
  { label: '合并结算', value: 1 },
];

const querySearch = () => {
  console.log(123);
};
const handleSelect = () => {
  console.log('sousuo');
};
</script>

<style scoped></style>
