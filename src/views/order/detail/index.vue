<template>
  <div class="relative pb-70px">
    <order-info v-model="params" :staff-options="staffOptions"></order-info>
    <order-car-info v-model="params"></order-car-info>
    <order-serve-info v-model="params" :staff-options="staffOptions"></order-serve-info>
    <order-part-info v-model="params" :staff-options="staffOptions"></order-part-info>
    <order-remark-info v-model="params.orderRemark"></order-remark-info>

    <div class="footer">
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

const handleSave = () => {
  console.log(params.value, '保存的工单信息');
};
const handleGetOrderInfo = () => {
  useRequest(orderApi.getOrderDetail(route.query.orderId as string), {
    onSuccess: (res) => {
      const result = res.data.datas;
      result.orderServiceItems.detailStageAmountType = String(result.orderServiceItems.detailStageAmountType);
      result.orderReplacementParts.detailStageAmountType = String(result.orderReplacementParts.detailStageAmountType);
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

<style scoped lang="scss">
.footer {
  @apply flex justify-end bg-white w-full mt-20px rounded-5px p-20px fixed right-35px bottom-0 w-[calc(100%-255px)];
  border-top: 1px solid var(--el-border-color-light);
  box-shadow: var(--el-box-shadow-light);
}
</style>
