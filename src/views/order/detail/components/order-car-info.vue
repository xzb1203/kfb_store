<template>
  <div class="flex justify-between mt-20px">
    <el-card class="w-full">
      <template #header>
        <div class="flex items-center justify-between">
          <span class="whitespace-nowrap kl-card-title">客户信息</span>
          <div class="flex">
            <el-autocomplete
              v-model="orderDriverUserName"
              :fetch-suggestions="querySearch"
              popper-class="w-275px  relative"
              placeholder="客户名称"
              @select="handleSelect"
            >
              <template #default="{ item }">
                <div :class="['flex', 'items-center', item.driverId === first ? 'mt-40px' : '']">
                  <div v-if="item.driverId === first" class="title">
                    搜索到 <span class="text-blue-500">{{ total }}</span> 个相关客户
                  </div>
                  <el-image
                    class="w-50px h-50px rounded-full mr-15px mb-10px"
                    src="https://kfbnet2019.obs.cn-north-1.myhuaweicloud.com/userAvatar/userAvatar.jpg"
                  ></el-image>
                  <div>
                    <p>{{ item.driverName }}</p>
                    <p>{{ item.driverPhone }}</p>
                  </div>
                </div>
              </template>
            </el-autocomplete>
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

const props = defineProps({
  modelValue: {
    type: Object as PropType<orderDetailType>,
    default: () => ({}),
  },
});
const params = computed(() => props.modelValue);
const storeInfo = computed(() => useUserStore().storeInfo);
const orderDriverUserName = ref('');
const total = ref(0);
const first = ref('');
const querySearch = (searchKeywords: string, cb) => {
  console.log(searchKeywords);
  const data = {
    driverStatus: 1,
    searchKeywords: searchKeywords || 1,
    storeId: storeInfo.value.id,
  };
  useRequest(orderApi.postkeywordwithPagingList(data), {
    onSuccess: (res) => {
      total.value = res.data.total;
      first.value = res.data.datas[0].driverId;
      cb(res.data.datas);
      console.log(res, '司机详情');
    },
    onError: () => {
      console.log(123);
    },
  });
  console.log(1);
};
const handleSelect = () => {
  console.log(1);
};
</script>

<style scoped lang="scss">
.title {
  @apply absolute top-0 left-0 w-full z-50 bg-white py-2px pl-10px text-gray-500;
  border-bottom: 1px solid var(--el-border-color-light);
}
</style>
