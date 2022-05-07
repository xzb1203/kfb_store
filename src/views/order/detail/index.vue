<template>
  <div class="relative pb-70px">
    <order-info v-model="params" :staff-options="staffOptions"></order-info>
    <order-car-info v-model="params"></order-car-info>
    <order-serve-info ref="serveInfoRef" v-model="params" :staff-options="staffOptions"></order-serve-info>
    <order-part-info ref="partInfoRef" v-model="params" :staff-options="staffOptions"></order-part-info>
    <order-remark-info v-model="params.orderRemark"></order-remark-info>

    <div class="footer">
      <span class="kl-card-title mr-10px">
        总计: <span class="text-red-500 ml-10px">¥ {{ total }}</span>
      </span>
      <el-button type="primary">结算</el-button>
      <el-button type="primary" @click="handleSave">保存</el-button>
      <el-button type="primary">打印</el-button>
      <el-button type="primary">取消工单</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRequest } from 'vue-request';
import { ElMessage } from 'element-plus';
import OrderInfo from './components/order-info.vue';
import OrderCarInfo from './components/order-car-info.vue';
import OrderServeInfo from './components/order-serve-info.vue';
import OrderPartInfo from './components/order-part-info.vue';
import OrderRemarkInfo from './components/order-remark-info.vue';
import type { orderDetailType, optionsType, postPersonnelListType } from './orderDetailType';
import orderApi from '@/api/modules/order';
import resultObj from './result.json';
import personnelApi from '@/api/modules/personnel';
import { useUserStore } from '@/store/modules/login';

const route = useRoute();
const storeInfo = computed(() => useUserStore().storeInfo);
const params = ref<orderDetailType>(resultObj as unknown as orderDetailType);
const loading = ref(true);
const staffOptions = ref<optionsType[]>([]);
const serveInfoRef = ref<InstanceType<typeof OrderServeInfo>>();
const partInfoRef = ref<InstanceType<typeof OrderPartInfo>>();

const total = computed(() => {
  if (serveInfoRef.value && partInfoRef.value) {
    return (Number(serveInfoRef.value.totalPrice) + Number(partInfoRef.value.totalPrice)).toFixed(2);
  }
});

const handleSave = () => {
  const data = params.value;
  const queryParams = {
    afterOrderAmountsPayable: 2007,
    isCompulsoryPayment: '11',
    isSendBack: 0,
    isShowOriginalAmount: 0,
    orderType: 0,
    originalAmount: 2007,
    storeName: '测试门店5号',
    updateType: 1,
    faultDescription: '',
    orderId: '0f468477ed1d4dacbb787495651cd39e',
    storeId: '61cf6c6f78924e61a5375a7c3293de0d',
    serviceSwitch: 0,
    goodsSwitch: 0,
    allocationAllState: '',
    orderServiceUpdateInfo: {
      detailStageAmountType: 1,
      orderServiceItems: [],
      detailStageAmount: 0,
    },
    orderGoodsUpdateInfo: {
      detailStageAmountType: 1,
      orderGoodsItems: [
        {
          goodsInventory: 200.5,
          itemCode: '0-9',
          itemId: 'a4bf02ac0c194b10b1158ab4f7d3b4e0',
          itemImage: 'goodsDefault.jpg',
          itemName: '商品12',
          itemNumber: 1,
          itemStandard: 'GE',
          itemTotalAmount: 2007,
          itemType: 2,
          itemUnit: '个',
          itemUnitPrice: 2007,
          orderDetailId: '5f944219f33b44d28a6dcccbc27a1596',
          orderDetailItemId: '816760677d134b86b23159c9a2476973',
          userId: 'e7721b53f53149b383992ed5053ec4de',
          workHourServices: [
            {
              createTime: 1651936013000,
              goodsItemId: 'a4bf02ac0c194b10b1158ab4f7d3b4e0',
              id: 'a03e32d350b441cbb98ea1790fbb3659',
              orderId: '0f468477ed1d4dacbb787495651cd39e',
              serviceId: '816760677d134b86b23159c9a2476973',
              serviceName: '商品12',
              storeId: '61cf6c6f78924e61a5375a7c3293de0d',
              userId: 'e7721b53f53149b383992ed5053ec4de',
            },
          ],
        },
      ],
      detailStageAmount: 0,
    },
    carCode: '23435553434534534',
    carMileage: '0',
    carModels: '41abe4c80ed040f6adcb98a89eaf1ee3',
    carModelsName: '龙腾',
    carPlateNumber: '川A12354',
    driverUserId: '63ff383c11704e5aa1fb733567cadc45',
    driverUserName: '卡卡西',
    driverUserPhone: '18081233333',
    userResponsibleId: 'e7721b53f53149b383992ed5053ec4de',
    userResponsibleName: '王',
    collectMoneyRemark: '',
  };
  console.log(queryParams, '保存的参数');
  useRequest(orderApi.putSaveOrder(queryParams), {
    onSuccess: (res) => {
      const result = res.data.datas;
      console.log(result);
    },
    onError: () => {
      ElMessage.error('保存失败');
    },
  });
};
const handleGetOrderInfo = () => {
  useRequest(orderApi.getOrderDetail(route.query.orderId as string), {
    onSuccess: (res) => {
      const result = res.data.datas;
      result.orderServiceItems.detailStageAmountType = String(result.orderServiceItems.detailStageAmountType);
      result.orderReplacementParts.detailStageAmountType = String(result.orderReplacementParts.detailStageAmountType);
      if (staffOptions.value) {
        result.userResponsibleId = staffOptions.value.filter(
          (item: optionsType) => item.label === result.addUserName,
        )[0].value;
      }
      params.value = result;
      loading.value = false;
      console.log(res, '工单详情');
    },
    onError: () => {
      loading.value = false;
      ElMessage.error('工单详情获取失败');
    },
  });
};
const handleRequestPersonnel = () => {
  useRequest(personnelApi.postPersonnelList({ storeId: storeInfo.value.id, pageSize: 999 }), {
    onSuccess: (res) => {
      staffOptions.value = res.data.datas.map((item: postPersonnelListType) => ({
        label: item.userName,
        value: item.userId,
      }));
      handleGetOrderInfo();
    },
    onError: () => {
      staffOptions.value = [];
    },
  });
};
onMounted(() => {
  handleRequestPersonnel();
});
</script>

<style scoped lang="scss">
.footer {
  @apply flex justify-end items-center  bg-white w-full mt-20px rounded-5px p-20px fixed right-35px bottom-0 w-[calc(100%-255px)];
  border-top: 1px solid var(--el-border-color-light);
  box-shadow: var(--el-box-shadow-light);
  z-index: 999;
}
</style>
