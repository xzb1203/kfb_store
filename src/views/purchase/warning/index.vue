<template>
  <el-card>
    <div class="flex items-center justify-between">
      <el-tabs v-model="activeName" @tab-change="handleTableList">
        <el-tab-pane label="普通商品" name="普通商品"></el-tab-pane>
        <el-tab-pane label="三包商品" name="三包商品"></el-tab-pane>
        <el-tab-pane label="平台商品" name="平台商品"></el-tab-pane>
      </el-tabs>
      <el-button type="primary">批量补货</el-button>
    </div>
    <tisp-table
      v-model:params="params"
      v-model:columns="columns"
      show-select-column
      :data="tableData"
      :total="total"
      @selection-change="handleSelectionChange"
      @change-page="handleTableList"
    >
      <template #goodsInfo="{ row }">
        <div class="flex items-center">
          <el-image :src="imgUrl + row.goodsImage" class="w-40px h-40px ml-10px"></el-image>
          <div class="flex flex-col text-left ml-10px">
            <span>{{ row.goodsName }}</span>
            <span>{{ row.goodsCode }}</span>
          </div>
        </div>
      </template>
      <template #handle="{ row }">
        <el-button type="text" @click="handleSupply(row)">补货</el-button>
      </template>
    </tisp-table>
  </el-card>
</template>

<script setup lang="ts">
import type { TabPanelName } from 'element-plus';
import { useRequest } from 'vue-request';
import TispTable, { columnsType } from '@/base-ui/tisp-table';
import { useUserStore } from '@/store/modules/login';
import purchaseApi from '@/api/modules/purchase';
import type { tableDataType } from './type';

const storeInfo = computed(() => useUserStore().storeInfo);
const imgUrl = `${import.meta.env.VITE_PICTRUE_URL}productPicture/`;
const activeName = ref('普通商品');
const params = ref({
  storeId: storeInfo.value.id,
  pageNum: 1,
  pageSize: 20,
  goodsType: 2, // 1-平台商品 2线下/普通商品 3三包商品
});
const columns = ref<columnsType[]>([
  {
    label: '商品信息',
    slotName: 'goodsInfo',
  },

  {
    label: '预警库存',
    prop: 'goodsWarningInventory',
  },
  {
    label: '当前库存',
    prop: 'storeGoodsInventory',
  },
  {
    label: '价格',
    prop: 'storeGoodsCostPrice',
  },
  {
    label: '操作',
    slotName: 'handle',
  },
]);
const tableData = ref<tableDataType[]>([]);
const total = ref(0);
type goodsTypeT = { [key: string]: number };

const handleSupply = (row: tableDataType) => {
  console.log(row);
};
const handleSelectionChange = (selection: tableDataType[]) => {
  console.log(selection);
};
const handleTableList = (val: TabPanelName) => {
  const goodsType: goodsTypeT = {
    平台商品: 1,
    普通商品: 2,
    三包商品: 3,
  };
  params.value.goodsType = goodsType[val];
  useRequest(purchaseApi.postWarningInventory(params.value), {
    onSuccess: (res) => {
      console.log(res.data, '哈哈');
      tableData.value = res.data.datas.map((item: tableDataType) => ({
        ...item,
        storeGoodsCostPrice: Number(item.storeGoodsCostPrice).toFixed(2),
        storeGoodsInventory: item.storeGoodsInventory || 0,
        goodsWarningInventory: item.goodsWarningInventory || 0,
      }));
      total.value = res.data.total;
    },
    onError: () => {
      tableData.value = [];
    },
  });
};
onMounted(() => {
  handleTableList('普通商品');
});
</script>

<style scoped></style>
