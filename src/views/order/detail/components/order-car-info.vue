<template>
  <div class="flex justify-between mt-20px">
    <el-card class="w-full">
      <template #header>
        <div class="flex items-center justify-between">
          <span class="whitespace-nowrap mr-10px kl-card-title">客户信息</span>
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
                  <el-image
                    class="w-50px h-50px rounded-full mr-15px"
                    :src="userUrlPrefix + item.driverAvatar"
                  ></el-image>
                  <div>
                    <p>名称: {{ item.driverName }}</p>
                    <p>电话: {{ item.driverPhone }}</p>
                  </div>
                </div>
              </template>
            </kl-autocomplete>
            <el-button :icon="CirclePlus" plain type="primary" @click="handleAddCustomer">新增客户</el-button>
          </div>
        </div>
      </template>
      <div class="flex items-center">
        <div class="icon">
          {{ params.orderDriverUserName ? params.orderDriverUserName.substring(0, 1) : '' }}
        </div>
        <div class="leading-26px">
          <div>
            <span class="mr-10px">客户名称: </span>
            <span class="text-gray-500">{{ params.orderDriverUserName }}</span>
          </div>
          <div>
            <span class="mr-10px">联系人: </span>
            <span class="text-gray-500">
              {{ params.orderContactsPerson }}
            </span>
          </div>
          <div>
            <span class="mr-10px">电话: </span>
            <el-tooltip v-if="phones.length > 2" effect="dark" placement="right">
              <template #content>
                <p v-for="item in phones.slice(1, phones.length)">{{ item }}</p>
              </template>
              <span class="text-blue-500">
                {{ params.orderContactsPhone }}
              </span>
            </el-tooltip>
            <span v-else class="text-gray-500">
              {{ params.orderContactsPhone }}
            </span>
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
          <span class="whitespace-nowrap mr-10px kl-card-title">车辆信息</span>
          <div class="flex">
            <kl-autocomplete
              v-model="orderDriverUserName"
              placeholder="车牌号"
              :api="driverlApi.getDriverCar"
              :api-params="apiDriverParams"
              :show-more="false"
              @select="handleCarSelect"
            >
              <template #default="{ item }">
                <div
                  class="flex items-center justify-end py-5px"
                  style="border-bottom: 1px dashed var(--el-border-color-light)"
                >
                  <el-image
                    class="w-50px h-50px rounded-full mr-15px"
                    :src="carUrlPrefix + item.carModelsNameTwo + '.png'"
                  >
                  </el-image>

                  <div class="ml-10px leading-24px">
                    <p>
                      <span class="w-70px inline-block">车牌号: </span
                      ><span class="text-gray-400">{{ item.carName }}</span>
                    </p>
                    <p>
                      <span class="w-70px inline-block">车型: </span
                      ><span class="text-gray-400">{{ item.carModelsName }}</span>
                    </p>
                  </div>
                </div>
              </template>
            </kl-autocomplete>
            <el-button :icon="CirclePlus" plain type="primary" @click="handleAddCar">新增车辆</el-button>
          </div>
        </div>
      </template>
      <div class="flex items-center">
        <el-image
          class="w-50px h-50px rounded-full overflow-hidden mr-20px"
          :src="carUrlPrefix + params.orderModelsNameTwo + '.png'"
        >
          <template #error>
            <div class="text-center">
              <img :src="defaultCarImg" alt="" srcset="" />
            </div>
          </template>
        </el-image>
        <div class="leading-26px">
          <div>
            <span class="mr-10px">车牌号: </span>
            <span class="text-gray-500 mr-10px">{{ params.orderDriverUserCarPlateNumber }}</span>
            <el-tag v-if="params.carMileageName">{{ params.carMileageName }}</el-tag>
          </div>
          <div>
            <span class="mr-10px">里程: </span>
            <span v-if="params.orderMileage" class="text-gray-500">{{ params.orderMileage }}km</span>
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
  <kl-add-customer-dialog ref="addCustomerRef"></kl-add-customer-dialog>
  <kl-add-car-dialog ref="addCarRef"></kl-add-car-dialog>
</template>

<script setup lang="ts">
import { CirclePlus, Picture as IconPicture } from '@element-plus/icons-vue';
import { PropType } from 'vue';
import { useRequest } from 'vue-request';
import type { orderDetailType } from '../orderDetailType';
import orderApi from '@/api/modules/order';
import driverlApi from '@/api/modules/driver';
import { useUserStore } from '@/store/modules/login';
import KlAutocomplete from '@/components/kl-autocomplete';
import KlAddCustomerDialog from '@/components/kl-add-customer-dialog';
import KlAddCarDialog from '@/components/kl-add-car-dialog';
import { carListType } from '../type';
import defaultCarImg from '@/assets/images/img_touxiang.png';

const props = defineProps({
  modelValue: {
    type: Object as PropType<orderDetailType>,
    default: () => ({}),
  },
});
const storeInfo = computed(() => useUserStore().storeInfo);
const params = computed<orderDetailType>(() => props.modelValue);
const userUrlPrefix = `${import.meta.env.VITE_PICTRUE_URL}userAvatar/`;
const carUrlPrefix = `${import.meta.env.VITE_PICTRUE_URL}brandImage/`;
const orderDriverUserName = ref('');
const phones = ref([]);
// 客户搜索关键词参数
const apiParams = {
  driverStatus: 1,
  searchKeywords: 1,
  storeId: storeInfo.value.id,
};
// 司机搜索关键词参数
const apiDriverParams = computed(() => ({
  pageNum: 1,
  pageSize: 20,
  searchKeywords: '',
  storeId: storeInfo.value.id,
  driverId: params.value.driverCarId,
}));
const addCustomerRef = ref<InstanceType<typeof KlAddCustomerDialog>>();
const addCarRef = ref<InstanceType<typeof KlAddCarDialog>>();

const handleCarSelect = (item: carListType) => {
  console.log(item);
  params.value.orderDriverUserCarPlateNumber = item.carName;
  params.value.orderMileage = item.carLastMaintenanceMileage;
  params.value.orderCarCode = item.carEngineCode;
  params.value.driverCarRemark = item.remark;
  params.value.carMileageName = item.carModelsName;
  params.value.orderModelsNameTwo = item.carModelsNameTwo;
};
const handleAddCustomer = () => {
  if (addCustomerRef.value) {
    addCustomerRef.value.dialogVisible = true;
  }
};
const handleAddCar = () => {
  if (addCarRef.value) {
    addCarRef.value.dialogVisible = true;
  }
};
const handleSelect = (item: any) => {
  console.log(item);
  params.value.orderDriverUserName = item.driverName;
  params.value.orderContactsPerson = item.driverUserContacts;
  params.value.orderContactsPhone = item.userStandbyPhone.split(',')[0];
  params.value.driverUserRemark = item.remark;
  params.value.driverCarId = item.driverId;
  phones.value = item.userStandbyPhone.split(',');
};
</script>

<style scoped lang="scss">
.icon {
  @apply w-50px h-50px rounded-full overflow-hidden mr-20px bg-blue-400 text-center leading-50px text-white text-1.125rem;
}
</style>
