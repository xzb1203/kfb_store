<template>
  <el-card v-loading="loading">
    <template #header>
      <div class="flex justify-between place-items-center">
        <h1 class="kl-card-title">服务列表</h1>
        <div class="flex items-center justify-end flex-nowrap">
          <el-button :icon="CirclePlus" plain type="primary" @click="handleAddServe">新增服务</el-button>
          <el-button :icon="Menu" plain type="primary">分组管理</el-button>
        </div>
      </div>
    </template>
    <div w:mb="15px">
      共 <span w:text="blue-500">{{ tableData.length }}</span> 项服务
    </div>
    <tisp-table v-model:columns="columns" name="orderIndexSercve" :data="tableData" :total="total" :show-page="false">
      <template #handle="{ row }">
        <el-button :icon="Edit" type="text" @click="handleEdit(row)">编辑</el-button>
        <el-button :icon="Delete" type="text" @click="handleDelete(row)">删除</el-button>
      </template>
    </tisp-table>
  </el-card>
  <kl-dialog
    ref="addServeDialogRef"
    v-model="formData"
    width="400px"
    :title="title"
    :form-config="formConfig"
    @handle-confim="handleConfirm"
  >
  </kl-dialog>
</template>

<script setup lang="ts">
import { useRequest } from 'vue-request';
import { Menu, CirclePlus, Edit, Delete } from '@element-plus/icons-vue';
import TispTable from '@/base-ui/tisp-table';
import goodsApi from '@/api/modules/goods';
import { useUserStore } from '@/store/modules/login';
import KlDialog from '@/components/kl-dialog';

const total = ref(0);
const storeInfo = computed(() => useUserStore().storeInfo);
const tableData = ref([]);
const columns = ref([
  { prop: 'serviceName', label: '名称' },
  { prop: 'serviceAmount', label: '价格' },
  { prop: 'serviceWorkHour', label: '工时' },
  { prop: 'serviceGroupId', label: '分组' },
  { prop: 'handle', label: '操作', slotName: 'handle' },
]);
const title = ref('新增');
const loading = ref(false);
const formData = ref({
  serviceName: '',
  serviceAmount: undefined,
  serviceUnit: '',
  serviceGroupId: '',
  serviceWorkHour: undefined,
  storeId: storeInfo.value.id,
});
const formConfig = {
  formItems: [
    {
      field: 'serviceName',
      type: 'input',
      label: '服务名称',
      placeholder: '请输入服务名称',
    },
    {
      field: 'serviceAmount',
      type: 'input',
      label: '服务价格',
      placeholder: '请输入服务价格',
      otherOptions: { type: 'number' },
    },
    {
      field: 'serviceWorkHour',
      type: 'input',
      label: '服务工时',
      placeholder: '请输入服务工时',
      otherOptions: { type: 'number' },
    },
    {
      field: 'serviceGroupId',
      type: 'select',
      label: '服务分组',
      placeholder: '请选择服务分组',
      options: [],
    },
  ],
  colLayout: { span: 24 },
};
const addServeDialogRef = ref<InstanceType<typeof KlDialog>>();

const handleEdit = (row: any) => {
  title.value = '编辑';
  if (addServeDialogRef.value) {
    addServeDialogRef.value.dialogVisible = true;
  }
  delete row.sort;
  delete row.sortname;
  delete row.sortorder;
  formData.value = { ...row, storeId: storeInfo.value.id };
};
const handleConfirm = () => {
  useRequest(goodsApi.postServeChange(formData.value), {
    onSuccess: (res) => {
      if (res.data.kfbCode === '200') {
        handleGetTableList();
        ElMessage.success(`${title.value}成功!`);
      }
    },
    onError: () => {
      ElMessage.warning('新增失败!');
    },
  });
};
const handleAddServe = () => {
  title.value = '新增';
  formData.value = {
    serviceName: '',
    serviceAmount: undefined,
    serviceUnit: '',
    serviceGroupId: '',
    serviceWorkHour: undefined,
    storeId: storeInfo.value.id,
  };
  if (addServeDialogRef.value) {
    addServeDialogRef.value.dialogVisible = true;
  }
};
const handleDelete = (row: any) => {
  ElMessageBox.confirm('确认删除该服务吗?', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      const params = { ...row, serviceStatus: 2, storeId: storeInfo.value.id };
      useRequest(goodsApi.postServeChange(params), {
        onSuccess: () => {
          handleGetTableList();
          ElMessage.success('删除成功!');
        },
        onError: () => {
          ElMessage.warning('删除失败!');
        },
      });
    })
    .catch(() => {
      return false;
    });
};
const handleGetTableList = () => {
  loading.value = true;
  useRequest(goodsApi.postServiceList({ storeId: storeInfo.value.id }), {
    onSuccess: (res) => {
      tableData.value = res.data.datas;
      loading.value = false;
    },
    onError: () => {
      tableData.value = [];
      loading.value = false;
    },
  });
};

onMounted(() => {
  handleGetTableList();
});
</script>

<style scoped></style>
