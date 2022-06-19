<template>
  <kl-top-bar v-loading="amountLoading" :list="topBarList"> </kl-top-bar>

  <el-card v-loading="tableLoading">
    <template #header>
      <h1 class="kl-card-title">积分列表</h1>
    </template>
    <tisp-table
      v-model:params="params"
      v-model:columns="columns"
      :data="tableData"
      :total="total"
      name="financialIntegral"
      @change-page="handleGetTableData"
    >
      <template #driverName="{ row }">
        <div class="w-40px h-40px rounded-full bg-blue-500 text-center leading-40px text-white mx-auto">
          {{ row.driverName.substr(0, 1) }}
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
import type { topBarListType, iconNamesType, tableDataType, optionsType, GroupType } from './type';
import TispSvg from '@/base-ui/tisp-svg';
import { useUserStore } from '@/store/modules/login';
import customerApi from '@/api/modules/customer';
import financialApi from '@/api/modules/financial';
import goodsApi from '@/api/modules/goods';
import TispTable from '@/base-ui/tisp-table';

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
]);
const tableLoading = ref(false);
const tableData = ref<tableDataType[]>([]);
const total = ref(0);
const formRef = ref<InstanceType<typeof ElForm>>();
const groupOptions = ref<optionsType[]>([]);

const columns = ref([
  { prop: 'detailValue', label: '积分数量' },
  { prop: 'modelName', label: '积分项目' },
  { prop: 'detailAddTime', label: '积分时间' },
  { prop: 'detailRemark', label: '备注' },
]);

const params = ref({
  pageSize: 20,
  pageNum: 1,
  sortname: '',
  sortorder: '',
  storeId: storeInfo.value.id,
});

// 查看详情
const handleDetail = (row: tableDataType) => {
  console.log(row);
};

// 获取列表数据
const handleGetTableData = () => {
  tableLoading.value = true;
  useRequest(financialApi.postIntegralList(params.value), {
    onSuccess: (res) => {
      console.log(res.data, '积分列表');
      tableData.value = res.data.list;
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
