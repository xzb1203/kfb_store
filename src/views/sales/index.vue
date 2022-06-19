<template>
  <kl-top-bar v-loading="amountLoading" :list="topBarList">
    <div class="btn">
      <tisp-svg name="icon_daoru"></tisp-svg>
      <p w:my="5px" w:text="gray-400 space-nowrap">新建销售单</p>
      <p class="kl-label">新建销售单</p>
    </div>
  </kl-top-bar>

  <el-card v-loading="tableLoading">
    <!-- todo 时间字段取值问题 -->
    <kl-table-header
      v-model="params"
      :tabs="tabs"
      :field="{ starTime: 'orderAddBeginTimeStr', endTime: 'orderAddEndTimeStr' }"
      placeholder="商品名称,商品编号,订单号"
      @handle-export="handleExport('open')"
      @handle-search="handleGetTableData"
    >
    </kl-table-header>
    <tisp-table
      v-model:params="params"
      v-model:columns="columns"
      :data="tableData"
      :total="total"
      name="salesIndex"
      @change-page="handleGetTableData"
    >
      <template #salesInfo="{ row }">
        <el-tooltip effect="light" placement="top">
          <template #content>
            <div class="max-w-400px h-86px">
              <el-tabs type="card">
                <el-tab-pane v-for="item in row.orderDetail">
                  <template #label>
                    <el-image :src="imgUrl + item.orderGoodsImage[0]" class="w-80px h-80px ml-10px"> </el-image>
                  </template>
                </el-tab-pane>
              </el-tabs>
            </div>
          </template>
          <el-image :src="imgUrl + row.orderDetail[0].orderGoodsImage[0]" class="w-60px h-60px ml-10px"></el-image>
        </el-tooltip>
      </template>
      <template #handle="{ row }">
        <span class="whitespace-nowrap">
          <el-button type="text" :icon="View" @click="handleDetail(row)">查看详情</el-button>
        </span>
      </template>
    </tisp-table>
  </el-card>
</template>

<script setup lang="ts">
import { useRequest } from 'vue-request';
import { Search, Refresh, Delete, View } from '@element-plus/icons-vue';
import type { topBarListType, iconNamesType, tableDataType, optionsType, GroupType } from './type';
import TispSvg from '@/base-ui/tisp-svg';
import { useUserStore } from '@/store/modules/login';
import customerApi from '@/api/modules/customer';
import goodsApi from '@/api/modules/goods';
import salesApi from '@/api/modules/sales';
import TispTable from '@/base-ui/tisp-table';
import KlTableHeader from '@/components/kl-table-header';

const storeInfo = computed(() => useUserStore().storeInfo);
const imgUrl = `${import.meta.env.VITE_PICTRUE_URL}productPicture/`;
const tabs = ref([
  { label: '全部', value: '' },
  { label: '进行中', value: '1' },
  { label: '已完成', value: '2' },
  { label: '已作废', value: '3' },
]);
const topBarList = ref<topBarListType[]>([
  {
    label: '累计销售单量',
    value: '',
    icon: 'icon_shangpingzhongshu',
  },

  {
    label: '累计销售金额',
    value: '',
    icon: 'icon_xiaoshouzongjiazhi',
    unit: '￥',
  },
]);
const tableLoading = ref(false);
const tableData = ref<tableDataType[]>([]);
const total = ref(0);

const columns = ref([
  { label: '商品信息', slotName: 'salesInfo' },
  { prop: 'orderCode', label: '订单号' },
  { prop: 'driverUserName', label: '客户名称' },
  { prop: 'orderTotalAmount', label: '金额' },
  { prop: 'orderStatusName', label: '订单状态' },
  { prop: 'orderAddTimeStr', label: '时间' },
  { label: '操作', slotName: 'handle' },
]);

const params = ref({
  orderAddBeginTimeStr: '',
  orderAddEndTimeStr: '',
  orderStatus: '',
  searchKeywords: '',
  pageSize: 20,
  pageNum: 1,
  storeId: storeInfo.value.id,
});
const handleExport = (val: string) => {
  console.log(val);
};
// 查看详情
const handleDetail = (row: tableDataType) => {
  console.log(row);
};

// 获取列表数据
const handleGetTableData = () => {
  tableLoading.value = true;
  useRequest(salesApi.postSalesWithPagingList(params.value), {
    onSuccess: (res) => {
      tableData.value = res.data.datas.map((item: any) => ({
        ...item,
        orderDetail: item.orderDetail.map((item2: any) => ({
          ...item2,
          orderGoodsImage: item2.orderGoodsImage.split(';'),
        })),
      }));
      console.log(tableData.value, '销售列表');
      tableLoading.value = false;
      topBarList.value[0].value = res.data.total;
      total.value = res.data.total;
    },
    onError: () => {
      tableData.value = [];
      tableLoading.value = false;
    },
  });
};
// 获取顶部数据 todo
const { loading: amountLoading, run: handleGetTotal } = useRequest(salesApi.postSalesWithPagingListSum, {
  manual: true,
  onSuccess: (res) => {
    topBarList.value[1].value = res.data.datas;
  },
  onError: () => {
    topBarList.value = [];
  },
});
onMounted(() => {
  handleGetTableData();
  handleGetTotal(params.value);
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/el-tabs-tooltip.scss';
.btn {
  @apply bg-white h-full p-20px min-w-120px hover:bg-light-900 rounded-5px cursor-pointer;
}
:deep(.el-form-item__label) {
  font-weight: bold;
}
</style>
