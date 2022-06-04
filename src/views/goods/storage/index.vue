<template>
  <el-card>
    <template #header>
      <div class="flex justify-between place-items-center">
        <h1 class="kl-card-title">商品列表</h1>
        <div class="flex items-center justify-end flex-nowrap">
          <el-form ref="formRef" :inline="true" :model="params" class="flex flex-nowrap">
            <el-form-item label="来源" class="!mb-0" prop="type">
              <el-select v-model="params.type" placeholder="请选择">
                <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="出入库类型" class="!mb-0" prop="locationType">
              <el-select v-model="params.locationType" placeholder="请选择">
                <el-option
                  v-for="item in locationTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="开单时间" class="!mb-0 !mr-0" prop="beginTime">
              <el-date-picker
                v-model="params.beginTime"
                type="date"
                placeholder="开始日期"
                value-format="YYYY-MM-DD"
                class="!w-150px"
              />
              <tisp-svg name="arrow" w:mx="5px" size="14px"></tisp-svg>
            </el-form-item>
            <el-form-item prop="endTime" class="!mb-0">
              <el-date-picker
                v-model="params.endTime"
                type="date"
                placeholder="结束日期"
                value-format="YYYY-MM-DD"
                class="!w-150px"
              />
            </el-form-item>
            <el-form-item label="关键词" class="!mb-0" prop="searchKeyWords">
              <el-input v-model.trim="params.searchKeyWords" placeholder="商品名称,编号" />
            </el-form-item>
          </el-form>
          <el-button :icon="Search" type="primary" @click="handleGetTableData">查询</el-button>
          <el-button :icon="Refresh" plain type="primary" @click="handleReset">重置</el-button>
          <el-button plain type="primary" :icon="Van">出库</el-button>
          <el-button :icon="Download" type="primary" plain @click="handleExport('open')">导出</el-button>
        </div>
      </div>
    </template>
    <tisp-table
      v-model:params="params"
      v-model:columns="columns"
      v-loading="loading"
      :total="total"
      name="goodsStorage"
      :data="tableData"
      @change-page="handleGetTableData"
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
  <kl-export-dialog
    ref="exportRef"
    v-model="params"
    :down-loading="downLoading"
    @handle-export="handleExport('close')"
  ></kl-export-dialog>
</template>

<script setup lang="ts">
import { useRequest } from 'vue-request';
import { Search, Refresh, View, Download, Van } from '@element-plus/icons-vue';
import type { ElForm } from 'element-plus';
import TispTable, { columnsType } from '@/base-ui/tisp-table';
import { useUserStore } from '@/store/modules/login';
import goodsApi from '@/api/modules/goods';
import { tableDataType } from './type';
import tispSvg from '@/base-ui/tisp-svg';
import KlExportDialog from '@/components/kl-export-dialog';
import { downloadFile } from '@/utils/download-file';

const storeInfo = computed(() => useUserStore().storeInfo);
const tableData = ref<tableDataType[]>([]);
const imgUrl = `${import.meta.env.VITE_PICTRUE_URL}productPicture/`;
const formRef = ref<InstanceType<typeof ElForm>>();
const exportRef = ref<InstanceType<typeof KlExportDialog>>();
const total = ref(0);
const loading = ref(false);
const downLoading = ref(false);
const typeOptions = ref([
  { label: '全部', value: '' },
  { label: '出库', value: '1' },
  { label: '入库', value: '2' },
]);
const locationTypeOptions = ref([
  { label: '全部', value: '' },
  { label: '普通库', value: '1' },
  { label: '三包库', value: '2' },
]);
const columns = ref<columnsType[]>([
  {
    prop: 'goodsImage',
    label: '图片',
    slotName: 'goodsImage',
  },
  {
    prop: 'goodsName',
    label: '商品名称',
  },
  {
    prop: 'goodsCode',
    label: '商品编号',
  },
  {
    prop: 'goodsType',
    label: '商品来源',
  },
  {
    prop: 'goodsInAndOutType',
    label: '出/入库',
  },
  {
    prop: 'location',
    label: '进/出库位置',
  },
  {
    prop: 'goodsNumber',
    label: '数量',
  },
  {
    prop: 'operationTime',
    label: '时间',
  },
  {
    prop: 'handle',
    label: '操作',
    slotName: 'handle',
  },
]);
const params = ref({
  beginTime: '',
  endTime: '',
  type: '',
  locationType: '',
  pageNum: 1,
  pageSize: 20,
  searchKeyWords: '',
  storeId: storeInfo.value.id,
});
const handleExport = (val: string) => {
  if (val === 'open') {
    exportRef.value ? (exportRef.value.dialogVisible = true) : false;
  } else {
    downLoading.value = true;
    useRequest(goodsApi.getDownloadRecordsExport(params.value), {
      onSuccess: (res) => {
        downloadFile('进出库商品列表 ', 'xlsx', res);
        ElMessage.success('导出成功!');
        exportRef.value ? (exportRef.value.dialogVisible = false) : false;
        downLoading.value = false;
        params.value.beginTime = '';
        params.value.endTime = '';
      },
    });
  }
};
const handleDetail = (row: tableDataType) => {
  console.log(row);
};
const handleReset = () => {
  formRef.value?.resetFields();
  handleGetTableData();
};
const handleGetTableData = () => {
  loading.value = true;
  useRequest(goodsApi.getRecordsWithPagingList(params.value), {
    onSuccess: (res) => {
      tableData.value = res.data.datas.map((item: tableDataType) => ({
        ...item,
        goodsType: item.goodsType === '1' ? '平台商品' : '自有商品',
        goodsInAndOutType: item.goodsInAndOutType === 1 ? '出库' : '入库',
        location: item.location === 1 ? '普通库' : '三包库',
      }));
      total.value = res.data.total;
      loading.value = false;
    },
    onError: () => {
      tableData.value = [];
      loading.value = false;
    },
  });
};
onMounted(() => {
  handleGetTableData();
});
</script>

<style scoped lang="scss">
:deep(.el-form-item) {
  @apply font-bold text-gray-600;
}
</style>
