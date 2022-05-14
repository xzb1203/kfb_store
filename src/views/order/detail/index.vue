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

const handleSave = async () => {
  const data = params.value;
  const queryParams = {
    afterOrderAmountsPayable: total.value,
    carCode: data.orderCarCode,
    carMileage: data.orderMileage,
    carModels: '',
    carModelsName: data.carMileageName,
    carPlateNumber: data.orderDriverUserCarPlateNumber,
    collectMoneyRemark: '',
    compulsoryPayment: '',
    driverUserId: data.driverCarId,
    driverUserName: data.orderDriverUserName,
    driverUserPhone: data.orderContactsPhone,
    faultDescription: data.orderFaultDescription,
    goodsSwitch: data.goodsSwitch,
    serviceSwitch: data.serviceSwitch,
    isCompulsoryPayment: '11',
    isSendBack: 0,
    isShowOriginalAmount: 0,
    orderDiscountAmount: '',
    orderId: route.query.orderId,
    originalAmount: total.value,
    payType: '',
    receiptAmount: '',
    remark: data.orderRemark,
    storeId: storeInfo.value.id,
    storeName: storeInfo.value.storeName,
    updateType: 1,
    userResponsibleId: data.userResponsibleId, // todo
    userResponsibleName: data.addUserName,
    orderServiceUpdateInfo: {
      detailStageAmount: data.orderServiceItems.detailStageAmount,
      detailStageAmountType: data.orderServiceItems.detailStageAmountType,
      orderServiceItems: data.orderServiceItems.projectDetails,
    },
    orderGoodsUpdateInfo: {
      detailStageAmount: data.orderReplacementParts.detailStageAmount,
      detailStageAmountType: data.orderReplacementParts.detailStageAmountType,
      orderGoodsItems: data.orderReplacementParts.projectDetails,
    },
  };
  const abc = {
    orderId: 'f8870ffb6e5d4761a79f3f590ba4ab73',
    storeId: '61cf6c6f78924e61a5375a7c3293de0d',
    serviceSwitch: 0,
    goodsSwitch: 0,
    allocationAllState: '',
    orderServiceUpdateInfo: {
      detailStageAmountType: 1,
      orderServiceItems: [
        {
          itemId: '3b3c6f0bbf5344b08f679d20495e9269',
          itemName: '我爱秀秀',
          itemNumber: 1,
          workHour: 1,
          itemTotalAmount: 88,
          itemUnitPrice: 88,
          orderGoodsCostPrice: 0,
          workHourServices: [
            {
              allocationProportion: 0,
              goodsItemId: '3b3c6f0bbf5344b08f679d20495e9269',
              serviceName: '',
              userId: '',
              workHour: 1,
            },
          ],
        },
      ],
      detailStageAmount: 0,
    },
    orderGoodsUpdateInfo: {
      detailStageAmountType: 1,
      orderGoodsItems: [],
      detailStageAmount: 0,
    },
  };

  useRequest(orderApi.putSaveOrder(abc), {
    onSuccess: (res) => {
      const result = res.data.datas;
      // console.log(res.config, '返回结果');
    },
    onError: () => {
      ElMessage.error('保存失败');
    },
  });
  console.log(params.value, '保存的工单信息');
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
