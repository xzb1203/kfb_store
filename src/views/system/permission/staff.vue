<template>
  <el-card v-loading="tableLoading">
    <template #header>
      <div class="flex justify-between place-items-center">
        <h1 class="kl-card-title">员工列表</h1>
        <div class="flex items-center justify-end flex-nowrap">
          <el-form ref="formRef" :inline="true" :model="params" class="flex flex-nowrap">
            <el-form-item label="注册时间" class="!mb-0 !mr-0" prop="userRegisterBeginTimeStr">
              <el-date-picker
                v-model="params.userRegisterBeginTimeStr"
                type="date"
                placeholder="开始日期"
                value-format="YYYY-MM-DD"
                class="!w-150px"
              />
              <tisp-svg name="arrow" w:mx="5px" size="14px"></tisp-svg>
            </el-form-item>
            <el-form-item prop="userRegisterEndTimeStr" class="!mb-0">
              <el-date-picker
                v-model="params.userRegisterEndTimeStr"
                type="date"
                placeholder="结束日期"
                value-format="YYYY-MM-DD"
                class="!w-150px"
              />
            </el-form-item>
          </el-form>
          <el-button :icon="Search" type="primary" @click="handleGetTableData">查询</el-button>
          <el-button :icon="Refresh" plain type="primary" @click="handleReset()">重置</el-button>
          <el-button :icon="CirclePlus" plain type="primary">添加员工</el-button>
        </div>
      </div>
    </template>
    <tisp-table
      v-model:params="params"
      v-model:columns="columns"
      :data="tableData"
      :total="total"
      name="permissionStaff"
      @change-page="handleGetTableData"
    >
      <template #userAvatar="{ row }">
        <el-image :src="imgUrl + row.userAvatar" class="w-60px h-60px"></el-image>
      </template>
      <template #userStatus="{ row }">
        <span class="whitespace-nowrap">
          <span v-if="row.userStatus === 1" class="text-green-500">正常</span>
          <span v-else class="text-yellow-500">冻结</span>
        </span>
      </template>
      <template #handle="{ row }">
        <el-dropdown>
          <span class="text-blue-500">
            更多操作
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>服务记录</el-dropdown-item>
              <el-dropdown-item>绩效</el-dropdown-item>
              <el-dropdown-item>编辑</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </tisp-table>
  </el-card>
</template>

<script setup lang="ts">
import { useRequest } from 'vue-request';
import { Search, Refresh, Delete, View, ArrowDown, CirclePlus } from '@element-plus/icons-vue';
import type { ElForm } from 'element-plus';
import { useUserStore } from '@/store/modules/login';
import systemApi from '@/api/modules/system';
import TispTable, { columnsType } from '@/base-ui/tisp-table';
import tispSvg from '@/base-ui/tisp-svg';

type tableDataType = {
  userAddTimeStr: string;
  userAvatar: string;
  userId: string;
  userName: string;
  userPushMoneyPercent: string;
  userRoleName: string;
  userStatus: number;
};
const storeInfo = computed(() => useUserStore().storeInfo);
const imgUrl = `${import.meta.env.VITE_PICTRUE_URL}userAvatar/`;
const tableLoading = ref(false);
const tableData = ref<tableDataType[]>([]);
const total = ref(0);
const formRef = ref<InstanceType<typeof ElForm>>();

const columns = ref<columnsType[]>([
  { label: '头像', slotName: 'userAvatar' },
  { prop: 'userName', label: '员工名称' },
  { prop: 'userRoleName', label: '角色' },
  { prop: 'userLoginAccount', label: '登录账号' },
  { prop: 'userAddTimeStr', label: '注册时间' },
  { prop: 'userLastLoginTime', label: '最后一次登录时间' },
  { label: '状态', slotName: 'userStatus' },
  { prop: 'handle', label: '操作', slotName: 'handle' },
]);

const params = ref({
  userRegisterBeginTimeStr: '',
  userRegisterEndTimeStr: '',
  userStatus: '', //  1正常 3锁定
  pageNum: 1,
  pageSize: 20,
  searchKeywords: '',
  storeId: storeInfo.value.id,
});
const handleClick = () => {
  console.log(1);
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

// 获取列表数据
const handleGetTableData = () => {
  tableLoading.value = true;
  useRequest(systemApi.postStaffList(params.value), {
    onSuccess: (res) => {
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
:deep(.el-form-item__label) {
  font-weight: bold;
}
:deep(.el-dropdown__caret-button) {
  margin-left: 0;
}
</style>
