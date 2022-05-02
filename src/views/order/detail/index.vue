<template>
  <div class="relative">
    <order-info v-model="params" :staff-options="staffOptions"></order-info>
    <order-car-info v-model="params"></order-car-info>
    <order-serve-info v-model="params.orderServiceItems" :staff-options="staffOptions"></order-serve-info>
    <order-part-info v-model="params.orderReplacementParts" :staff-options="staffOptions"></order-part-info>
    <order-remark-info></order-remark-info>
    <div class="flex justify-end bg-white mt-20px rounded-5px p-20px">
      <el-button type="primary">结算</el-button>
      <el-button type="primary">保存</el-button>
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
import result from './result.json';
import personnelApi from '@/api/modules/personnel';
import { useUserStore } from '@/store/modules/login';

const route = useRoute();
const storeInfo = computed(() => useUserStore().storeInfo);
const params = ref<orderDetailType>(result as unknown as orderDetailType);
const loading = ref(true);
const staffOptions = ref<optionsType[]>([]);

const handleGetOrderInfo = () => {
  useRequest(orderApi.getOrderDetail(route.query.orderId as string), {
    onSuccess: (res) => {
      res.data.datas.orderServiceItems.detailStageAmountType = String(
        res.data.datas.orderServiceItems.detailStageAmountType,
      );
      res.data.datas.orderReplacementParts.detailStageAmountType = String(
        res.data.datas.orderReplacementParts.detailStageAmountType,
      );
      params.value = res.data.datas;
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
    },
    onError: () => {
      staffOptions.value = [];
    },
  });
};
onMounted(() => {
  handleGetOrderInfo();
  handleRequestPersonnel();
});
</script>

<style scoped></style>