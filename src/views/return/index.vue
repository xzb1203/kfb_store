<template>
  <el-card v-loading="tableLoading">
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
      name="returnIndex"
      @change-page="handleGetTableData"
    >
      <template #salesInfo="{ row }">
        <el-tooltip effect="light" placement="top">
          <template #content>
            <div class="max-w-400px h-86px">
              <el-tabs type="card">
                <el-tab-pane v-for="item in row.orderDetail">
                  <template #label>
                    <el-image :src="imgUrl + item.detailGoodsImage" class="w-80px h-80px ml-10px"> </el-image>
                  </template>
                </el-tab-pane>
              </el-tabs>
            </div>
          </template>
          <el-image :src="imgUrl + row.orderDetail[0].detailGoodsImage" class="w-60px h-60px ml-10px"></el-image>
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
import type { tableDataType } from './type';
import { useUserStore } from '@/store/modules/login';
import returnApi from '@/api/modules/return';
import TispTable from '@/base-ui/tisp-table';
import KlTableHeader from '@/components/kl-table-header';

const storeInfo = computed(() => useUserStore().storeInfo);
const imgUrl = `${import.meta.env.VITE_PICTRUE_URL}productPicture/`;
const tabs = ref([
  { label: '全部', value: '' },
  { label: '待确认', value: '1' },
  { label: '已退货', value: '2' },
  { label: '已取消', value: '3' },
  { label: '已拒绝', value: '4' },
]);

const tableLoading = ref(false);
const tableData = ref<tableDataType[]>([]);
const total = ref(0);

const columns = ref([
  { label: '商品信息', slotName: 'salesInfo' },
  { prop: 'orderCode', label: '订单号' },
  { prop: 'orderReturnUserName', label: '负责人' },
  { prop: 'orderSaleName', label: '供应商' },
  { prop: 'orderTotalAmount', label: '商品总额' },
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
  useRequest(returnApi.postReturnWithPagingList(params.value), {
    onSuccess: (res) => {
      tableData.value = res.data.datas;
      console.log(res.data.datas, '退货列表');
      tableLoading.value = false;
      total.value = res.data.total;
    },
    onError: () => {
      tableData.value = [];
      tableLoading.value = false;
    },
  });
};

onMounted(() => {
  handleGetTableData();
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
