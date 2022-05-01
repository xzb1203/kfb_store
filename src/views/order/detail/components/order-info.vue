<template>
  <el-card>
    <template #header> <span class="kl-card-title">工单信息</span> </template>
    <div class="flex items-center justify-between">
      <div>
        <span class="mr-10px kl-label">工单编号: </span>
        <span>{{ 5343546466776 }}</span>
      </div>
      <div>
        <span class="mr-10px kl-label">工单状态: </span>
        <span> 进行中</span>
      </div>
      <div>
        <span class="mr-10px kl-label">创建时间: </span>
        <el-date-picker v-model="value1" type="datetime" />
      </div>
      <div>
        <span class="mr-10px kl-label">预计完成: </span>
        <el-date-picker v-model="value1" type="datetime" />
      </div>
      <div>
        <span class="mr-10px kl-label">总负责人: </span>
        <el-select v-model="value" placeholder="请选择负责人">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
const value1 = ref('');
const value = ref('');
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
