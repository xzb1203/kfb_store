<template>
  <div class="flex justify-between mt-20px">
    <el-card class="w-full">
      <template #header>
        <div class="flex items-center justify-between">
          <span class="whitespace-nowrap kl-card-title">客户信息</span>
          <div class="flex">
            <el-input v-model="val" placeholder="客户名称" clearable></el-input>
            <el-button type="primary" :icon="Search">搜索</el-button>
            <el-button :icon="CirclePlus" plain type="primary">新增客户</el-button>
          </div>
        </div>
      </template>
      <div class="flex items-center">
        <img class="w-50px h-50px rounded-full overflow-hidden mr-20px bg-blue-100" />
        <div class="leading-26px">
          <div>
            <span class="mr-10px">客户名称: </span>
            <span class="text-gray-500">测试</span>
          </div>
          <div>
            <span class="mr-10px">联系人: </span>
            <span class="text-gray-500">源妹儿</span>
          </div>
          <div>
            <span class="mr-10px">电话: </span>
            <span class="text-gray-500">18081234850</span>
          </div>
          <div>
            <span class="mr-10px">备注: </span>
            <span class="text-gray-500">今天天气不错</span>
          </div>
        </div>
      </div>
    </el-card>
    <el-card class="w-full ml-20px">
      <template #header>
        <div class="flex items-center justify-between">
          <span class="whitespace-nowrap kl-card-title">车辆信息</span>
          <div class="flex">
            <el-button :icon="CirclePlus" plain type="primary">新增车辆</el-button>
            <el-button :icon="CirclePlus" plain type="primary">选择车辆</el-button>
          </div>
        </div>
      </template>
      <div class="flex items-center">
        <img class="w-50px h-50px rounded-full overflow-hidden mr-20px bg-blue-100" />
        <div class="leading-26px">
          <div>
            <span class="mr-10px">车牌号: </span>
            <span class="text-gray-500">测试</span>
          </div>
          <div>
            <span class="mr-10px">里程: </span>
            <span class="text-gray-500">源妹儿</span>
          </div>
          <div>
            <span class="mr-10px">VIN码: </span>
            <span class="text-gray-500">18081234850</span>
          </div>
          <div>
            <span class="mr-10px">备注: </span>
            <span class="text-gray-500">今天天气不错</span>
          </div>
        </div>
      </div>
    </el-card>
    <el-card class="w-full ml-20px">
      <template #header>
        <div class="flex items-center justify-between">
          <span class="whitespace-nowrap kl-card-title">故障信息</span>
          <el-button :icon="CirclePlus" plain type="primary">查看故障图片</el-button>
        </div>
      </template>
      <el-input v-model="params.faultDescription" type="textarea" rows="5" placeholder="请输入故障描述"></el-input>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { Search, CirclePlus } from '@element-plus/icons-vue';
import { PropType } from 'vue';
import type { orderDetailType } from '../orderDetailType';

const props = defineProps({
  modelValue: {
    type: Object as PropType<orderDetailType>,
    default: () => ({}),
  },
});
const val = ref('');
const params = ref<orderDetailType>(props.modelValue);
</script>

<style scoped></style>
