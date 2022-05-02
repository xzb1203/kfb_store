<template>
  <div class="flex justify-between mt-20px">
    <el-card class="w-full">
      <template #header>
        <div class="flex items-center justify-between">
          <span class="whitespace-nowrap kl-card-title">客户信息</span>
          <div class="flex">
            <kl-autocomplete
              v-model="orderDriverUserName"
              placeholder="客户名称"
              :api="orderApi.postkeywordwithPagingList"
              :api-params="apiParams"
              :show-more="false"
              @select="handleSelect"
            >
              <template #default="{ item }">
                <div class="flex items-center">
                  <el-image class="w-50px h-50px rounded-full mr-15px" :src="imgUrl + item.driverAvatar"></el-image>
                  <div>
                    <p>{{ item.driverName }}</p>
                    <p>{{ item.driverPhone }}</p>
                  </div>
                </div>
              </template>
            </kl-autocomplete>
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
            <span class="text-gray-500">{{ params.orderDriverUserName }}</span>
          </div>
          <div>
            <span class="mr-10px">联系人: </span>
            <span class="text-gray-500">{{ params.orderContactsPerson }}</span>
          </div>
          <div>
            <span class="mr-10px">电话: </span>
            <span class="text-gray-500">{{ params.orderContactsPhone }}</span>
          </div>
          <div>
            <span class="mr-10px">备注: </span>
            <span class="text-gray-500">{{ params.driverUserRemark }}</span>
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
            <span class="text-gray-500">{{ params.orderDriverUserCarPlateNumber }}</span>
          </div>
          <div>
            <span class="mr-10px">里程: </span>
            <span class="text-gray-500">{{ params.orderMileage }}</span>
          </div>
          <div>
            <span class="mr-10px">VIN码: </span>
            <span class="text-gray-500">{{ params.orderCarCode }}</span>
          </div>
          <div>
            <span class="mr-10px">备注: </span>
            <span class="text-gray-500">{{ params.driverCarRemark }}</span>
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
      <el-input v-model="params.orderFaultDescription" type="textarea" rows="5" placeholder="请输入故障描述"></el-input>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { Search, CirclePlus } from '@element-plus/icons-vue';
import { PropType } from 'vue';
import { useRequest } from 'vue-request';
import type { orderDetailType } from '../orderDetailType';
import orderApi from '@/api/modules/order';
import { useUserStore } from '@/store/modules/login';
import KlAutocomplete from '@/components/kl-autocomplete';

const props = defineProps({
  modelValue: {
    type: Object as PropType<orderDetailType>,
    default: () => ({}),
  },
});
const storeInfo = computed(() => useUserStore().storeInfo);
const params = computed(() => props.modelValue);
const imgUrl = `${import.meta.env.VITE_PICTRUE_URL}userAvatar/`;
const orderDriverUserName = ref('');
// 搜索关键词参数
const apiParams = {
  driverStatus: 1,
  storeId: storeInfo.value.id,
};
const handleSelect = (item: any) => {
  console.log(item);
};
</script>

<style scoped lang="scss"></style>
