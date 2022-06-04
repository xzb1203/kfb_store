<template>
  <el-card>
    <template #header>
      <div class="flex justify-between items-center">
        <tisp-tabs v-model="state" :tabs="tabs" @handle-tab="handleTab"></tisp-tabs>
        <div class="flex items-start">
          <el-form ref="formRef" :inline="true" :model="params" class="-mr-20px">
            <el-form-item v-if="state === '0'" label="开单时间" class="!mb-0 !mr-0" prop="beginTime">
              <el-date-picker
                v-model="params.beginTime"
                type="date"
                placeholder="开始日期"
                value-format="YYYY-MM-DD"
                class="!w-150px"
              />
              <tisp-svg name="arrow" w:mx="5px" size="14px"></tisp-svg>
            </el-form-item>
            <el-form-item v-if="state === '0'" prop="endTime" class="!mb-0">
              <el-date-picker
                v-model="params.endTime"
                type="date"
                placeholder="结束日期"
                value-format="YYYY-MM-DD"
                class="!w-150px"
              />
            </el-form-item>
            <el-form-item label="关键词" class="!mb-0" prop="searchKeywords">
              <div class="flex items-center">
                <el-tooltip effect="dark" content="商品名称,商品编号,调拨单号" placement="top">
                  <el-icon class="!-ml-10px mr-12px hover:text-blue-500"><chat-line-square /></el-icon>
                </el-tooltip>
                <el-input v-model="params.searchKeywords" clearable placeholder="商品名称,商品编号"> </el-input>
              </div>
            </el-form-item>
          </el-form>
          <el-button :icon="Search" type="primary" @click="handleTab">查询</el-button>
          <el-button :icon="Refresh" plain type="primary" @click="handleReset">重置</el-button>
          <el-button
            v-show="state !== '0'"
            :icon="Switch"
            plain
            type="primary"
            :disabled="!selection.length"
            @click="handleAllot"
            >调拨</el-button
          >
        </div>
      </div>
    </template>
    <tisp-table
      v-if="tableData.length"
      v-model:params="params"
      v-model:columns="columns"
      :data="tableData"
      :total="total"
      :show-select-column="state !== '0'"
      @change-page="handleTab"
      @selection-change="handleSelectionChange"
    >
      <template #goodsImage="{ row }">
        <el-tooltip effect="light" placement="top">
          <template #content>
            <el-image :src="imgUrl + row.goodsImage.split(';')[0]" class="max-w-150px max-h-150px"></el-image>
          </template>
          <el-image :src="imgUrl + row.goodsImage.split(';')[0]" class="w-40px h-40px"></el-image>
        </el-tooltip>
      </template>

      <template #handle="{ row }">
        <el-button type="text" :icon="View" @click="handleDetail(row)">查看详情</el-button>
      </template>
    </tisp-table>
  </el-card>
  <allot-dialog ref="allotDialogRef" :title="title" :data="selection" @handle-submit="handleSubmit"></allot-dialog>
  <detail-dialog ref="detailDialogRef" :data="detailList"></detail-dialog>
</template>

<script setup lang="ts">
import { Search, Refresh, ChatLineSquare, Switch, View } from '@element-plus/icons-vue';
import { useRequest } from 'vue-request';
import type { ElForm } from 'element-plus';
import { ValidateComponentsMap } from 'element-plus/es/utils';
import tispSvg from '@/base-ui/tisp-svg';
import TispTable from '@/base-ui/tisp-table';
import goodsApi from '@/api/modules/goods';
import { useUserStore } from '@/store/modules/login';
import TispTabs from '@/base-ui/tisp-tabs';
import { defaultConfig, otherConfig } from './config';
import AllotDialog from './components/allot-dialog.vue';
import DetailDialog from './components/detail-dialog.vue';

const storeInfo = computed(() => useUserStore().storeInfo);
const userInfo = computed(() => useUserStore().userInfo);
const state = ref('0');
const title = ref('调拨至普通库');
const loading = ref(false);
const params = ref({
  beginTime: '',
  endTime: '',
  goodsType: 2,
  pageNum: 1,
  pageSize: 20,
  searchKey: '',
  searchKeywords: '',
  storeId: storeInfo.value.id,
  type: '',
});
const tableData = ref([]);
const total = ref(0);
const imgUrl = `${import.meta.env.VITE_PICTRUE_URL}productPicture/`;
const tabs = ref([
  { label: '已调拨', value: '0' },
  { label: '普通库', value: '1' },
  { label: '三包库', value: '2' },
]);
const apis: any = {
  '0': goodsApi.queryGoodsAllot,
  '1': goodsApi.postStoreGoods,
  '2': goodsApi.postStoreThreeGoods,
};
const columns: any = ref([]);
const formRef = ref<InstanceType<typeof ElForm>>();
const allotDialogRef = ref<InstanceType<typeof AllotDialog>>();
const detailDialogRef = ref<InstanceType<typeof DetailDialog>>();
const selection: any = ref([]);
const detailList = ref([]);

const handleDetail = (row: any) => {
  console.log(row);
  const data = {
    storeId: storeInfo.value.id,
    allotOrderCode: row.orderCode,
    pageNum: 1,
    pageSize: 999,
  };
  useRequest(goodsApi.getAllotDetail(data), {
    onSuccess: (res) => {
      detailList.value = res.data.datas;
      console.log(detailList.value);
      detailDialogRef.value ? (detailDialogRef.value.dialogVisible = true) : false;
    },
    onError: () => {
      detailList.value = [];
    },
  });
  console.log(row);
};
const handleSubmit = (goodsInfoList: any) => {
  const params = {
    createBy: userInfo.value.userName,
    goodsFrom: state.value === '1' ? 0 : 1,
    goodsInfoList: goodsInfoList.map((item: any) => ({
      allotType: item.goodsType,
      detailTotalAmount: item.storeGoodsSalePrice,
      goodsCode: item.goodsCode,
      goodsCostPrice: item.storeGoodsCostPrice,
      goodsName: item.goodsName,
      purchaseQuantity: item.purchaseQuantity,
      storeGoodsId: item.storeGoodsId,
      goodsImage: item.goodsImage,
    })),
    storeId: storeInfo.value.id,
  };
  useRequest(goodsApi.postGoodsAllot(params), {
    onSuccess: () => {
      ElMessage.success('调拨成功!');
    },
    onError: () => {
      ElMessage.success('调拨失败!');
    },
  });
};
const handleAllot = () => {
  title.value = state.value === '1' ? '调拨至普通库' : '调拨至三包库';
  allotDialogRef.value ? (allotDialogRef.value.dialogVisible = true) : false;
};
const handleSelectionChange = (val: any) => {
  selection.value = val.map((item: any) => ({
    ...item,
    storeGoodsCostPrice: Number(item.storeGoodsCostPrice),
    purchaseQuantity: 1,
  }));
};
const handleReset = () => {
  formRef.value?.resetFields();
  handleTab();
};
const handleTab = () => {
  loading.value = true;
  const api = apis[state.value];
  useRequest(api(params.value), {
    onSuccess: (res: any) => {
      if (res.data.kfbCode === '200') {
        tableData.value = res.data.datas;
        total.value = res.data.total;
        columns.value = state.value !== '0' ? otherConfig : defaultConfig;
        loading.value = false;
      }
    },
    onError: () => {
      tableData.value = [];
      total.value = 0;
      loading.value = false;
    },
  });
};

onMounted(() => {
  handleTab();
});
</script>

<style scoped lang="scss">
:deep(.el-form-item) {
  @apply font-bold text-gray-600;
}
</style>
