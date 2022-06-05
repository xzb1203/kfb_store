<template>
  <kl-top-bar v-loading="topLoading" :list="topBarList">
    <div class="btn">
      <tisp-svg name="icon_daoru"></tisp-svg>
      <p w:my="5px" w:text="gray-400 space-nowrap">从线下采购商品</p>
      <p class="kl-label">线下采购</p>
    </div>
    <div class="btn ml-20px">
      <tisp-svg name="icon_piliangdaoru"></tisp-svg>
      <p w:my="5px" w:text="gray-400 space-nowrap">从平台采购商品</p>
      <p class="kl-label">平台采购</p>
    </div>
    <div class="btn ml-20px">
      <tisp-svg name="icon_piliangdaoru"></tisp-svg>
      <p w:my="5px" w:text="gray-400 space-nowrap">编辑/设置地址</p>
      <p class="kl-label">地址管理</p>
    </div>
  </kl-top-bar>
  <el-tabs v-model="activeName" @tab-change="handleTabChange">
    <el-tab-pane label="线下采购" name="线下采购"></el-tab-pane>
    <el-tab-pane label="平台采购" name="平台采购"></el-tab-pane>
  </el-tabs>
  <el-card>
    <kl-table-header
      v-model="params"
      :tabs="tabs"
      @handle-export="handleExport('open')"
      @handle-search="handleTableList(1)"
    >
    </kl-table-header>
    <tisp-table v-model:params="params" v-model:columns="columns" :total="total" :data="tableData">
      <template #orderDetail="{ row }">
        <div class="flex">
          <div v-for="item in row.orderDetail.slice(0, 3)">
            <el-tooltip effect="light" placement="top">
              <template #content>
                <div class="max-w-400px h-86px">
                  <el-tabs type="card">
                    <el-tab-pane v-for="item2 in row.orderDetail" :key="item2.orderCode">
                      <template #label>
                        <el-image :src="imgUrl + item2.detailGoodsImage" class="w-80px h-80px ml-10px"></el-image>
                      </template>
                    </el-tab-pane>
                  </el-tabs>
                </div>
              </template>
              <el-image :src="imgUrl + item.detailGoodsImage" class="w-40px h-40px ml-10px"></el-image>
            </el-tooltip>
          </div>
        </div>
      </template>
      <template #handle="{ row }">
        <el-button type="text" :icon="View">查看详情</el-button>
        <el-button type="text" :icon="Delete">取消订单</el-button>
      </template>
    </tisp-table>
  </el-card>
</template>

<script setup lang="ts">
import type { TabPanelName } from 'element-plus';
import { useRequest } from 'vue-request';
import { View, Delete } from '@element-plus/icons-vue';
import TispSvg from '@/base-ui/tisp-svg';
import TispTable, { columnsType } from '@/base-ui/tisp-table';
import { useUserStore } from '@/store/modules/login';
import orderApi from '@/api/modules/order';

const storeInfo = computed(() => useUserStore().storeInfo);
const imgUrl = `${import.meta.env.VITE_PICTRUE_URL}productPicture/`;
const topLoading = ref(false);
const activeName = ref('线下采购');
const topBarList = ref([
  {
    label: '商品种数',
    value: '34',
    icon: 'icon_shangpingzhongshu',
  },
  {
    label: '销售总价值',
    value: '34',
    icon: 'icon_xiaoshouzongjiazhi',
    unit: '￥',
  },
  {
    label: '销售总价值',
    value: '34',
    icon: 'icon_xiaoshouzongjiazhi',
    unit: '￥',
  },
]);
const offlineTabs = ref([
  { label: '全部', value: '' },
  { label: '进行中', value: '1' },
  { label: '已完成', value: '2' },
  { label: '已作废', value: '3' },
]);
const onlineTabs = ref([
  { label: '全部', value: '' },
  { label: '待确认', value: '1' },
  { label: '待发货', value: '2' },
  { label: '待收货', value: '3' },
  { label: '已完成', value: '4' },
  { label: '采购方已取消', value: '5' },
  { label: '销售方已取消', value: '6' },
]);
const tabs = computed(() => (activeName.value === '线下采购' ? offlineTabs.value : onlineTabs.value));
const params = ref({
  storeId: storeInfo.value.id,
  orderStatus: '',
  orderBeginTimeStr: '',
  orderEndTimeStr: '',
  searchKeywords: '',
  pageNum: 1,
  pageSize: 20,
});
const tableData = ref([]);
const columns = ref<columnsType[]>([
  { label: '商品', slotName: 'orderDetail' },
  { prop: 'orderCode', label: '订单编号' },
  { prop: 'orderUserName', label: '负责人' },
  { prop: 'orderSaleName', label: '供应商' },
  { prop: 'orderTotalAmount', label: '金额' },
  { prop: 'orderStatus', label: '订单状态' },
  { label: '操作', slotName: 'handle' },
]);
const total = ref(0);

const handleTabChange = (val: TabPanelName) => {
  console.log(val);
};
const handleExport = (val: string) => {
  console.log(val);
};
const handleTableList = (val: number) => {
  console.log(val);
};
const getTableData = () => {
  useRequest(orderApi.postOfflineList(params.value), {
    onSuccess: (res) => {
      tableData.value = res.data.datas;
      total.value = res.data.total;
      console.log(res);
    },
    onError: () => {
      tableData.value = [];
    },
  });
};
onMounted(() => {
  getTableData();
});
</script>

<style scoped lang="scss">
.btn {
  @apply bg-white h-full p-20px min-w-120px hover:bg-light-900 rounded-5px cursor-pointer;
}

:deep(.el-form-item__label),
:deep(.el-tabs__item) {
  font-weight: bold;
}
:deep(.el-tabs__nav-wrap) {
  display: flex;
  align-items: center;
  border: none !important;
}
:deep(.el-tabs__nav),
:deep(.el-tabs__header),
:deep(.el-tabs__item) {
  border: none !important;
}
</style>
