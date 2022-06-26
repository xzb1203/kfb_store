<template>
  <el-card>
    <template #header>
      <h1 class="kl-card-title">价格设置</h1>
    </template>
    <el-row :gutter="20">
      <el-col v-for="item in list" :span="12">
        <div class="flex justify-between items-center mb-20px">
          <div class="leading-24px">
            <p>{{ item.label }}</p>
            <p class="text-12px text-gray-400">{{ item.hint }}</p>
          </div>
          <el-switch
            v-model="params[item.field]"
            :active-value="1"
            :inactive-value="0"
            @change="handleChange"
          ></el-switch>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
import { useRequest } from 'vue-request';
import type { paramsType, listType } from './type';
import { useUserStore } from '@/store/modules/login';
import systemApi from '@/api/modules/system';

const storeInfo = computed(() => useUserStore().storeInfo);
const params = ref<paramsType>({
  averageInventoryPrice: 1, // 库存均价
  customerLastMaintenancePrice: 1, // 客户上次维修价格
  customerLastSalePrice: 1, // 客户上次销售价格
  historyMaintenanceMaxPrice: 1, // 历史维修最高价格
  historyMaintenanceMinPrice: 1, // 历史维修最低价格
  historyPurchaseMaxPrice: 1, // 历史采购最高价格
  historyPurchaseMinPrice: 1, // 历史采购最低价格
  historySaleMaxPrice: 1, // 历史销售最高价格
  historySaleMinPrice: 1, // 历史销售最低价格
  lastMaintenancePrice: 1, // 上次维修价格
  lastSalePrice: 1, // 上次销售价格
  latestPurchasePrice: 1, // 最近采购价格
  salesPrice: 1, // 定价（销售价格）
  storeId: storeInfo.value.id, // 门店ID
});
const list = ref<listType[]>([
  { field: 'averageInventoryPrice', label: '上次维修价格', hint: '上次维修此项目的价格' },
  { field: 'customerLastMaintenancePrice', label: '上次销售价格', hint: '上次销售此配件的价格' },
  { field: 'customerLastSalePrice', label: '客户上次维修价格', hint: '上次维修此项目客户付款价格' },
  { field: 'historyMaintenanceMaxPrice', label: '客户上次销售价格', hint: '上次销售此配件客户付款价格' },
  { field: 'historyMaintenanceMinPrice', label: '历史维修最高价格', hint: '此项目之前维修最高价格' },
  { field: 'historyPurchaseMaxPrice', label: '历史维修最低价', hint: '此项目之前维修最低价格' },
  { field: 'historyPurchaseMinPrice', label: '历史销售最高价', hint: '此配件之前销售最高价格' },
  { field: 'historySaleMaxPrice', label: '历史销售最低价格', hint: '此配件之前销售最低价格' },
  { field: 'historySaleMinPrice', label: '历史采购最高价格', hint: '此配件之前采购最高价格' },
  { field: 'lastMaintenancePrice', label: '历史采购最低价格', hint: '此配件之前采购最低价格' },
  { field: 'lastSalePrice', label: '最近采购价', hint: '此配件最近采购价格' },
  { field: 'latestPurchasePrice', label: '定价（销售价格）', hint: '此配件现在销售价格' },
  { field: 'salesPrice', label: '库存均价(成本价)', hint: '库存此配件平均价格' },
]);

const handleGetPriceSet = () => {
  useRequest(
    systemApi.getPriceSet({
      storeId: storeInfo.value.id,
    }),
    {
      onSuccess: (res) => {
        params.value = res.data.datas;
      },
      onError: () => {
        ElMessage.error('获取失败!');
      },
    },
  );
};
const handleChange = () => {
  useRequest(systemApi.setPrice(params.value), {
    onSuccess: (res) => {
      // ElMessage.success(res.data.kfbSuccessMsg);
    },
    onError: () => {
      ElMessage.error('更新失败!');
    },
  });
};
onMounted(() => {
  handleGetPriceSet();
});
</script>

<style scoped lang="scss"></style>
