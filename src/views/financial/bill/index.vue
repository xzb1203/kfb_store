<template>
  <el-card v-loading="tableLoading">
    <template #header>
      <div class="flex justify-between place-items-center">
        <tisp-tabs v-model="current" :tabs="tabs" @handle-tab="handleGetTableData"></tisp-tabs>
        <div class="flex items-center justify-end flex-nowrap">
          <el-form ref="formRef" :inline="true" :model="params" class="flex flex-nowrap">
            <el-form-item label="关键词" class="!mb-0" prop="searchKeywords">
              <el-input v-model.trim="params.searchKeywords" placeholder="供货商、联系人、电话" />
            </el-form-item>
          </el-form>
          <el-button :icon="Search" type="primary" @click="handleGetTableData">查询</el-button>
          <el-button :icon="Refresh" plain type="primary" @click="handleReset()">重置</el-button>
          <el-button :icon="Download" type="primary" plain>导出</el-button>
        </div>
      </div>
    </template>
    <tisp-table
      v-model:params="params"
      v-model:columns="columnsMap[current]"
      :data="tableData"
      :total="total"
      name="financialBill"
      @change-page="handleGetTableData"
    >
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
import { Search, Refresh, Delete, View, Download } from '@element-plus/icons-vue';
import type { ElForm } from 'element-plus';
import type { topBarListType } from './type';
import TispSvg from '@/base-ui/tisp-svg';
import { useUserStore } from '@/store/modules/login';
import supplyApi from '@/api/modules/supply';
import customerApi from '@/api/modules/customer';
import financialApi from '@/api/modules/financial';
import TispTable from '@/base-ui/tisp-table';
import TispTabs from '@/base-ui/tisp-tabs';

const storeInfo = computed(() => useUserStore().storeInfo);

const current = ref('user');
const tabs = ref([
  { label: '客户账单', value: 'user' },
  { label: '供应商账单', value: 'supplier' },
  { label: '主机厂账单', value: 'main' },
]);
const tableLoading = ref(false);
const tableData: any = ref([]);
const total = ref(0);
const formRef = ref<InstanceType<typeof ElForm>>();
const columnsMap: any = reactive({
  user: [
    { prop: 'driverName', label: '客户名称' },
    { prop: 'driverUserContacts', label: '联系人' },
    { prop: 'driverTotalOrder', label: '工单量' },
    { prop: 'driverTotalSaleOrder', label: '销售单量' },
    { prop: 'cumulativeConsumptionAmount', label: '累计消费金额' },
    { prop: 'cumulativeReliefAmount', label: '累计减免金额' },
    { prop: 'cumulativePaymentAmount', label: '累计收款金额' },
    { prop: 'cumulativeRefundAmount', label: '累计退款金额' },
    { prop: 'formatterReceivable', label: '应收款' },
    { prop: 'updateTimeStr', label: '更新时间' },
    { label: '操作', slotName: 'handle' },
  ],
  supplier: [
    { prop: 'supplierName', label: '供应商名称' },
    { prop: 'supplierContacts', label: '联系人' },
    { prop: 'supplierPhone', label: '手机号' },
    // todo
    // { prop: 'supplierTotalOrder', label: '平台采购单' },
    // todo
    // { prop: 'supplierTotalOrder', label: '线下采购单' },
    { prop: 'accountBalance', label: '应付款' },
    { prop: 'updateTimeStr', label: '更新时间' },
    { label: '操作', slotName: 'handle' },
  ],
  main: [
    { prop: 'mainEnginePlantsName', label: '主机厂名称' },
    { prop: 'mainEnginePlantsLinkMan', label: '联系人' },
    { prop: 'mainEnginePlantsTotalOrder', label: '工单量' },
    { prop: 'mainEnginePlantsTotalSaleOrder', label: '销售单量' },
    { prop: 'cumulativeConsumptionAmount', label: '累计消费金额' },
    { prop: 'cumulativeReliefAmount', label: '累计减免金额' },
    { prop: 'cumulativePaymentAmount', label: '累计收款金额' },
    { prop: 'cumulativeRefundAmount', label: '累计退款金额' },
    { prop: 'arearAmount', label: '应收款' },
    { prop: 'updateTime', label: '时间' },
    { label: '操作', slotName: 'handle' },
  ],
});
// apiMap
const apiMap: any = {
  user: financialApi.postUserBillList,
  supplier: financialApi.postSupplierList,
  main: financialApi.postMainengineplantsList,
};
const params = reactive({
  storeId: storeInfo.value.id,
  pageNum: 1,
  pageSize: 20,
  sortname: '',
  sortorder: '',
  searchKeywords: '',
});

// 查看详情
const handleDetail = (row: any) => {
  console.log(row);
};

// 重置
const handleReset = () => {
  if (!formRef.value) return;
  formRef.value.resetFields();
  handleGetTableData();
};

// 获取列表数据
const handleGetTableData = () => {
  tableLoading.value = true;
  useRequest(apiMap[current.value](params), {
    onSuccess: (res: any) => {
      console.log(res, '看看比比');
      tableData.value = res.data.datas;
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
.btn {
  @apply bg-white h-full p-20px min-w-120px hover:bg-light-900 rounded-5px cursor-pointer;
}
:deep(.el-form-item__label) {
  font-weight: bold;
}
</style>
