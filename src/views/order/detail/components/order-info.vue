<template>
  <el-card>
    <template #header> <span class="kl-card-title">工单信息</span> </template>
    <div class="flex items-center justify-between">
      <div>
        <span class="mr-10px kl-label">工单编号: </span>
        <span>{{ params.orderCode }}</span>
      </div>
      <div>
        <span class="mr-10px kl-label">工单状态: </span>
        <span> {{ params.orderStatusName }}</span>
      </div>
      <div>
        <span class="mr-10px kl-label">创建时间: </span>
        <el-date-picker v-model="params.orderAddTimeStr" type="datetime" />
      </div>
      <div>
        <span class="mr-10px kl-label">预计完成: </span>
        <el-date-picker v-model="params.orderEstimatedFinishTimeStr" type="datetime" />
      </div>
      <div>
        <span class="mr-10px kl-label">总负责人: </span>
        <el-select v-model="params.addUserName" placeholder="请选择负责人">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import type { orderDetailType } from '../orderDetailType';

const props = defineProps({
  modelValue: {
    type: Object as PropType<orderDetailType>,
    default: () => ({}),
  },
});
const params = computed<orderDetailType>(() => props.modelValue);
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
</script>

<style scoped></style>
