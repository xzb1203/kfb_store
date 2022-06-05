<template>
  <kl-top-bar v-loading="amountLoading" :list="topBarList">
    <div class="btn">
      <tisp-svg name="icon_daoru"></tisp-svg>
      <p w:my="5px" w:text="gray-400 space-nowrap">录入客户信息</p>
      <p class="kl-label">新增客户</p>
    </div>
    <div class="btn ml-20px">
      <tisp-svg name="icon_piliangdaoru"></tisp-svg>
      <p w:my="5px" w:text="gray-400 space-nowrap">新增/编辑客户分组</p>
      <p class="kl-label">分组管理</p>
    </div>
  </kl-top-bar>

  <el-card v-loading="tableLoading">
    <template #header>
      <div class="flex justify-between place-items-center">
        <h1 class="kl-card-title">客户列表</h1>
        <div class="flex items-center justify-end flex-nowrap">
          <el-form ref="formRef" :inline="true" :model="params" class="flex flex-nowrap">
            <el-form-item label="分组" class="!mb-0" prop="goodsGroupId">
              <el-select v-model="params.groupId" placeholder="请选择">
                <el-option v-for="item in groupOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>

            <el-form-item label="关键词" class="!mb-0" prop="searchKeywords">
              <el-input v-model.trim="params.searchKeywords" placeholder="商品名称,编号" />
            </el-form-item>
          </el-form>
          <el-button :icon="Search" type="primary" @click="handleGetTableData">查询</el-button>
          <el-button :icon="Refresh" plain type="primary" @click="handleReset()">重置</el-button>
        </div>
      </div>
    </template>
    <tisp-table
      v-model:params="params"
      v-model:columns="columns"
      :data="tableData"
      :total="total"
      name="customerIndex"
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
  { prop: 'driverName', label: '头像', slotName: 'driverName' },
  { prop: 'driverName', label: '客户名称' },
  { prop: 'driverPhone', label: '联系方式' },
  { prop: 'driverUserContacts', label: '联系人' },
  { prop: 'driverAddress', label: '地址' },
  { prop: 'driverGroupName', label: '分组', slotName: 'driverGroupName' },
  { prop: 'driverTotalCar', label: '车辆数' },
  { prop: 'driverTotalOrder', label: '本店消费次数' },
  { prop: 'driverTotalOrderAmount', label: '本店总消费' },
  { prop: 'driverUnpaidTotalOrderAmount', label: '挂账金额' },
  { prop: 'cumulativeRefundAmount', label: '退款金额' },
  { prop: 'driverLoginTimeStr', label: '最后登录时间' },
  { prop: 'handle', label: '操作', slotName: 'handle' },
]);

const params = ref({
  driverUserPhone: '',
  driverRegisterBeginTimeStr: '',
  driverRegisterEndTimeStr: '',
  driverStatus: 1,
  searchKeywords: '',
  groupId: '',
  pageSize: 20,
  pageNum: 1,
  storeId: storeInfo.value.id,
});

// 查看详情
const handleDetail = (row: tableDataType) => {
  console.log(row);
};

// 重置
const handleReset = () => {
  if (!formRef.value) return;
  formRef.value.resetFields();
  handleGetTableData();
};
// 获取分组
const { run: handleGroup } = useRequest(customerApi.postUserGroupList, {
  manual: true,
  onSuccess: (res) => {
    groupOptions.value = res.data.datas.map((item: GroupType) => ({
      label: item.groupName,
      value: item.groupId,
    }));
  },
  onError: () => {
    groupOptions.value = [];
  },
});

// 获取列表数据
const handleGetTableData = () => {
  tableLoading.value = true;
  useRequest(customerApi.postUserWithPagingList(params.value), {
    onSuccess: (res) => {
      console.log(res, '用户列表');
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
  handleGroup({ storeId: storeInfo.value.id });
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
