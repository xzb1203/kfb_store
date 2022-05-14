<template>
  <div class="relative pb-70px">
    <order-info v-model="params" :staff-options="staffOptions"></order-info>
    <order-car-info v-model="params"></order-car-info>
    <order-serve-info ref="serveInfoRef" v-model="params" :staff-options="staffOptions"></order-serve-info>
    <order-part-info ref="partInfoRef" v-model="params" :staff-options="staffOptions"></order-part-info>
    <order-remark-info v-model="params.orderRemark"></order-remark-info>

    <div class="footer">
      <span class="kl-card-title mr-30px">
        总计: <span class="text-red-500 text-1.5rem ml-10px">¥ {{ total }}</span>
      </span>
      <el-button type="primary" :icon="Check" @click="handleSave">保存</el-button>
      <el-button type="primary" :icon="CreditCard">结算</el-button>
      <el-button type="primary" :icon="TakeawayBox">打印</el-button>
      <el-button type="info" :icon="Remove" @click="handleCancel">取消工单</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TakeawayBox, CreditCard, Remove, Check } from '@element-plus/icons-vue';
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
const router = useRouter();
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
      orderGoodsItems: data.orderReplacementParts.projectDetails.map((item) => ({
        ...item,
        itemRemark: item.orderGoodsRemark,
      })),
    },
  };
  console.log(queryParams, '保存的参数');
  const feautParams = {
    orderId: route.query.orderId,
    storeId: storeInfo.value.id,
    faultDescription: data.orderFaultDescription,
    faultImages: data.orderFaultImage, // todo
  };
  await useRequest(orderApi.putSaveFault(feautParams));
  useRequest(orderApi.putSaveOrder(queryParams), {
    onSuccess: () => {
      ElMessage.success('保存成功!');
      router.push({ name: 'orderIndex' });
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
      console.log(res, '获取的工单详情');
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
const handleCancel = async () => {
  useRequest(orderApi.deleteOrder({ orderId: route.query.orderId }), {
    onSuccess: () => {
      ElMessage.success('取消成功!');
      router.push({ name: 'orderIndex' });
    },
    onError: () => {
      ElMessage.error('取消工单失败!');
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
