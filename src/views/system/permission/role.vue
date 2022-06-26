<template>
  <el-card v-loading="tableLoading">
    <template #header>
      <div class="flex justify-between items-center">
        <h1 class="kl-card-title">角色列表</h1>
        <el-button :icon="CirclePlus" plain type="primary">添加角色</el-button>
      </div>
    </template>
    <tisp-table v-model:columns="columns" :show-page="false" :data="tableData" :total="total" name="permissionRole">
      <template #roleStatus="{ row }">
        <span class="whitespace-nowrap">
          <span v-if="row.roleStatus === 1" class="text-green-500">正常</span>
          <span v-else class="text-yellow-500">冻结</span>
        </span>
      </template>

      <template #handle="{ row }">
        <span>
          <el-button type="text" :icon="Edit">编辑</el-button>
          <el-button type="text" :icon="Lock">冻结</el-button>
        </span>
      </template>
    </tisp-table>
  </el-card>
</template>

<script setup lang="ts">
import { useRequest } from 'vue-request';
import { Edit, CirclePlus, Lock, Unlock } from '@element-plus/icons-vue';
import { useUserStore } from '@/store/modules/login';
import systemApi from '@/api/modules/system';
import TispTable, { columnsType } from '@/base-ui/tisp-table';

type tableType = {
  addTimeStr: string;
  rightListTwo: any[string];
  roleDescription: '';
  roleId: string;
  roleName: string;
  roleNumber: number;
  roleStatus: string;
};
const storeInfo = computed(() => useUserStore().storeInfo);
const tableLoading = ref(false);
const tableData = ref<tableType[]>([]);
const total = ref(0);

const columns = ref<columnsType[]>([
  { prop: 'roleName', label: '角色名称' },
  { prop: 'roleNumber', label: '账号数量' },
  { prop: 'roleDescription', label: '备注' },
  { slotName: 'roleStatus', label: '状态' },
  { prop: 'handle', label: '操作', slotName: 'handle' },
]);

// 获取列表数据
const handleGetTableData = () => {
  tableLoading.value = true;
  useRequest(systemApi.postRoleList({ roleRelId: storeInfo.value.id }), {
    onSuccess: (res) => {
      console.log(res, '角色列表');
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

<style scoped lang="scss"></style>
