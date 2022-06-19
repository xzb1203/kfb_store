<template>
  <kl-top-bar v-loading="amountLoading" :list="topBarList">
    <div class="btn">
      <tisp-svg name="icon_daoru"></tisp-svg>
      <p w:my="5px" w:text="gray-400 space-nowrap">新增线下供应商</p>
      <p class="kl-label">新增线下供应商</p>
    </div>
    <div class="btn ml-20px">
      <tisp-svg name="icon_piliangdaoru"></tisp-svg>
      <p w:my="5px" w:text="gray-400 space-nowrap">新增三包主机厂</p>
      <p class="kl-label">新增三包主机厂</p>
    </div>
  </kl-top-bar>

  <el-card v-loading="tableLoading">
    <template #header>
      <div class="flex justify-between place-items-center">
        <tisp-tabs v-model="current" :tabs="tabs" @handle-tab="handleGetTableData"></tisp-tabs>
        <div class="flex items-center justify-end flex-nowrap">
          <el-form ref="formRef" :inline="true" :model="paramsMap[current]" class="flex flex-nowrap">
            <el-form-item label="地区" class="!mb-0" prop="goodsGroupId">
              <el-select v-model="paramsMap[current].supplierCity" placeholder="请选择">
                <el-option v-for="item in groupOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="关键词" class="!mb-0" prop="searchKeywords">
              <el-input v-model.trim="paramsMap[current].searchKeywords" placeholder="供货商、联系人、电话" />
            </el-form-item>
          </el-form>
          <el-button :icon="Search" type="primary" @click="handleGetTableData">查询</el-button>
          <el-button :icon="Refresh" plain type="primary" @click="handleReset()">重置</el-button>
        </div>
      </div>
    </template>
    <tisp-table
      v-model:params="paramsMap[current]"
      v-model:columns="columnsMap[current]"
      :data="tableData"
      :total="total"
      name="customerIndex"
      @change-page="handleGetTableData"
    >
      <template #avatar="{ row }">
        <div class="w-40px h-40px rounded-full bg-blue-500 text-center leading-40px text-white mx-auto">
          {{ row[current === 'offline' ? 'supplierName' : 'mainEnginePlantsName']?.substr(0, 1) }}
        </div>
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
import type { ElForm } from 'element-plus';
import type { topBarListType, offlineTableDataType, threeType } from './type';
import TispSvg from '@/base-ui/tisp-svg';
import { useUserStore } from '@/store/modules/login';
import supplyApi from '@/api/modules/supply';
import customerApi from '@/api/modules/customer';
import TispTable from '@/base-ui/tisp-table';
import TispTabs from '@/base-ui/tisp-tabs';

const storeInfo = computed(() => useUserStore().storeInfo);
const topBarList = ref<topBarListType[]>([
  {
    label: '客户总数',
    value: '',
    icon: 'icon_shangpingzhongshu',
  },
  {
    label: '累计消费金额',
    value: '',
    icon: 'icon_xiaoshouzongjiazhi',
    unit: '￥',
  },
  {
    label: '挂账金额',
    value: '',
    icon: 'icon_leijicaigoue',
    unit: '￥',
  },
  {
    label: '挂账金额',
    value: '',
    icon: 'icon_leijicaigoue',
    unit: '￥',
  },
]);
const current = ref('online');
const tabs = ref([
  { label: '平台供应商', value: 'online' },
  { label: '线下供应商', value: 'offline' },
  { label: '三包供应商', value: 'three' },
]);
const tableLoading = ref(false);
const tableData: any = ref([]);
// const offlineTableData = ref<offlineTableDataType[]>([]);
const total = ref(0);
const formRef = ref<InstanceType<typeof ElForm>>();
const groupOptions: any = ref([]);
const columnsMap: any = reactive({
  online: [],
  offline: [
    { label: '头像', slotName: 'avatar' },
    { prop: 'supplierName', label: '名称' },
    { prop: 'supplierContacts', label: '联系人' },
    { prop: 'supplierContactsPhone', label: '联系电话' },
    { prop: 'totalOrderNumber', label: '总采购单量' },
    { prop: 'totalOrderAmount', label: '采购金额' },
    { prop: 'totalOrderBookkeepingAmount', label: '挂账金额' },
    { prop: 'salesLastTimeStr', label: '最近一次采购时间' },
    { label: '地址', slotName: 'address' },
    { label: '操作', slotName: 'handle' },
  ],
  three: [
    { label: '头像', slotName: 'avatar' },
    { prop: 'mainEnginePlantsName', label: '名称' },
    { prop: 'supplierContacts', label: '联系人' },
    { prop: 'mainEnginePlantsPhone', label: '联系电话' },
    { prop: 'arearAmount', label: '挂账金额' },
    { prop: 'createTime', label: '最近一次采购时间' },
    { label: '地址', slotName: 'address' },
    { label: '操作', slotName: 'handle' },
  ],
});
// apiMap
const apiMap: any = {
  online: supplyApi.postOnlineSupplyList,
  offline: supplyApi.postPrivateList,
  three: supplyApi.postMainEnginePlantsList,
};
const paramsMap: any = reactive({
  online: {
    storeId: storeInfo.value.id,
    mainBusiness: false, // 是否需要查询主营业务 默认不需要(true 需要 false 不需要)
    province: '', // 供应商省
    city: '', // 供应商市
    county: '', // 供应商县
    searchKeywords: '', // 搜索关键字
    pageSize: 20,
    pageNum: 1,
  },
  offline: {
    pageNum: 1,
    pageSize: 20,
    searchKeywords: '',
    supplierCity: '',
    supplierCounty: '',
    supplierProvince: '',
    storeId: storeInfo.value.id,
  },
  three: {
    storeId: storeInfo.value.id,
    searchKeywords: '',
    pageSize: 20,
    pageNum: 1,
    mainEnginePlantsRegisterBeginTimeStr: '',
    mainEnginePlantsRegisterEndTimeStr: '',
    mainEnginePlantsName: '',
    mainEnginePlantsPhone: '',
    mainEnginePlantsStatus: '',
  },
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
  useRequest(apiMap[current.value](paramsMap[current.value]), {
    onSuccess: (res: any) => {
      console.log(res, '供应商列表');
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
// 获取顶部数据 todo
const { loading: amountLoading, run: handleGetTotal } = useRequest(customerApi.getUserTotal, {
  manual: true,
  onSuccess: (res) => {
    const countList = Object.values(res.data.datas);
    topBarList.value.forEach((item: topBarListType, index: number) => {
      item.value = countList[index] as string;
    });
  },
  onError: () => {
    topBarList.value = [];
  },
});
onMounted(() => {
  handleGetTotal(storeInfo.value.id);
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
