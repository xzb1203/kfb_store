<template>
  <div class="relative">
    <order-info v-model="params"></order-info>
    <order-car-info v-model="params"></order-car-info>
    <!-- <order-serve-info v-model="params.orderServiceUpdateInfo"></order-serve-info> -->
    <order-part-info></order-part-info>
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
import type { orderDetailType } from './orderDetailType';
import orderApi from '@/api/modules/order';

const route = useRoute();
const params = ref<orderDetailType>();
const loading = ref(true);
const handleGetOrderInfo = async () => {
  useRequest(orderApi.getOrderDetail(route.query.orderId as string), {
    onSuccess: (res) => {
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
onMounted(() => {
  handleGetOrderInfo();
});
</script>

<style scoped></style>
