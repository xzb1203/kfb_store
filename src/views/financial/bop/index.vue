<template>
  <kl-top-bar v-loading="amountLoading" :list="topBarList">
    <div class="btn">
      <tisp-svg name="icon_daoru"></tisp-svg>
      <p w:my="5px" w:text="gray-400 space-nowrap">新增收支</p>
      <p class="kl-label">新增收支</p>
    </div>
    <div class="btn ml-20px">
      <tisp-svg name="icon_piliangdaoru"></tisp-svg>
      <p w:my="5px" w:text="gray-400 space-nowrap">收支项目类型管理</p>
      <p class="kl-label">收支项目类型管理</p>
    </div>
  </kl-top-bar>

  <el-card v-loading="tableLoading">
    <template #header>
      <div class="flex justify-between place-items-center">
        <h1 class="kl-card-title">收支列表</h1>
        <div class="flex items-center justify-end flex-nowrap">
          <el-form ref="formRef" :inline="true" :model="params" class="flex flex-nowrap">
            <el-form-item label="收支类型" class="!mb-0" prop="incomeExpendType">
              <el-select v-model="params.incomeExpendType" placeholder="请选择">
                <el-option
                  v-for="item in INCOME_EXPEND_TYPE"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="支付方式" class="!mb-0" prop="payType">
              <el-select v-model="params.payType" placeholder="请选择">
                <el-option v-for="item in PAY_TYPE" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="开单时间" class="!mb-0 !mr-0" prop="beginTimeStr">
              <el-date-picker
                v-model="params.beginTimeStr"
                type="date"
                placeholder="开始日期"
                value-format="YYYY-MM-DD"
                class="!w-150px"
              />
              <tisp-svg name="arrow" w:mx="5px" size="14px"></tisp-svg>
            </el-form-item>
            <el-form-item class="!mb-0" prop="endTimeStr">
              <el-date-picker
                v-model="params.endTimeStr"
                type="date"
                placeholder="结束日期"
                value-format="YYYY-MM-DD"
                class="!w-150px"
              />
            </el-form-item>
            <el-form-item label="关键词" class="!mb-0" prop="searchKeywords">
              <el-input v-model.trim="params.searchKeywords" placeholder="商品名称,编号" />
            </el-form-item>
          </el-form>
          <el-button :icon="Search" type="primary" @click="handleGetTableData">查询</el-button>
          <el-button :icon="Refresh" plain type="primary" @click="handleReset()">重置</el-button>
          <el-button :icon="Download" type="primary" plain @click="handleExport">导出</el-button>
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
import { Search, Refresh, Download, View } from '@element-plus/icons-vue';
import type { ElForm } from 'element-plus';
import type { topBarListType, iconNamesType, tableDataType, GroupType } from './type';
import TispSvg from '@/base-ui/tisp-svg';
import { useUserStore } from '@/store/modules/login';
import customerApi from '@/api/modules/customer';
import goodsApi from '@/api/modules/goods';
import financialApi from '@/api/modules/financial';
import TispTable, { columnsType } from '@/base-ui/tisp-table';
import { INCOME_EXPEND_TYPE, PAY_TYPE } from '@/utils/constant';

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
]);
const tableLoading = ref(false);
const tableData = ref<tableDataType[]>([]);
const total = ref(0);
const formRef = ref<InstanceType<typeof ElForm>>();
const groupOptions = ref<optionsType[]>([]);

const columns = ref<columnsType[]>([
  { prop: 'incomeExpendCode', label: '流水单号' },
  { prop: 'orderCode', label: '关联单号' },
  { prop: 'incomeExpendType', label: '收支类型' },
  { prop: 'incomeExpendItem', label: '收支项目' },
  { prop: 'incomeExpendPayType', label: '支付方式' },
  { prop: 'incomeExpendAmount', label: '金额' },
  { prop: 'incomeExpendTransactionHour', label: '时间' },
  { prop: 'incomeExpendRelName', label: '付款方' },
  { prop: 'incomeExpendIncomeUserName', label: '收款方' },
  { prop: 'incomeExpendType', label: '备注' },
  { prop: 'handle', label: '操作', slotName: 'handle' },
]);

const params = ref({
  // 选填参数:
  incomeExpendType: '', // 收支记录类型（1 采购支出 2 销售收入 3 退款支出 4 退款收入 5 其它支出 6 其它收入）
  payType: '', // 支付方式
  beginTimeStr: '', // 开始时间
  endTimeStr: '', // 结束时间
  searchKeywords: '', // 搜索关键字
  pageSize: 20,
  pageNum: 1,
  sortname: '',
  sortorder: '',
  storeId: storeInfo.value.id,
});
// 导出
const handleExport = () => {
  console.log('导出');
};
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
  useRequest(financialApi.postFinancialBopList(params.value), {
    onSuccess: (res) => {
      console.log(res, '收支列表');
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
