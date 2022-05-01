<template>
  <div class="flex justify-between mt-20px">
    <el-card class="w-full">
      <template #header>
        <div class="flex items-center justify-between">
          <span class="whitespace-nowrap">客户信息</span>
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
            <span>测试</span>
          </div>
          <div>
            <span class="mr-10px">联系人: </span>
            <span>源妹儿</span>
          </div>
          <div>
            <span class="mr-10px">电话: </span>
            <span>18081234850</span>
          </div>
          <div>
            <span class="mr-10px">备注: </span>
            <span>今天天气不错</span>
          </div>
        </div>
      </div>
    </el-card>
    <el-card class="w-full ml-20px">
      <template #header>
        <div class="flex items-center justify-between">
          <span class="whitespace-nowrap">车辆信息</span>
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
            <span>测试</span>
          </div>
          <div>
            <span class="mr-10px">里程: </span>
            <span>源妹儿</span>
          </div>
          <div>
            <span class="mr-10px">VIN码: </span>
            <span>18081234850</span>
          </div>
          <div>
            <span class="mr-10px">备注: </span>
            <span>今天天气不错</span>
          </div>
        </div>
      </div>
    </el-card>
    <el-card class="w-full ml-20px">
      <template #header>
        <div class="flex items-center justify-between">
          <span class="whitespace-nowrap">故障信息</span>
          <el-button :icon="CirclePlus" plain type="primary">查看故障图片</el-button>
        </div>
      </template>
      <el-input type="textarea" rows="5" placeholder="请输入故障描述"></el-input>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { Search, CirclePlus } from '@element-plus/icons-vue';

const val = ref('');
</script>

<style scoped></style>
