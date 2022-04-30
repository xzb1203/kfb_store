<template>
  <div>
    <kl-top-bar :list="topBarList">
      <div class="btn">
        <tisp-svg name="icon_fuwu"></tisp-svg>
        <p w:my="5px" w:text="gray-400 space-nowrap">新建工单服务</p>
        <p>创建工单</p>
      </div>
      <div class="btn" w:ml="20px">
        <tisp-svg name="icon_guanli"></tisp-svg>
        <p w:my="5px" w:text="gray-400 space-nowrap">管理服务项目</p>
        <p>服务管理</p>
      </div>
    </kl-top-bar>
    <el-card>
      <kl-table-header :tabs="tabs">
        <template #handle>
          <el-button type="primary" plain>导出工单记录</el-button>
        </template>
      </kl-table-header>
      <kl-custom-table :header-columns="headerColumns" :table-list="tableList">
        <template #user="{ scope }">
          <div w:flex="~ col" w:justify="center" w:text="left" w:w="130px">
            <p>客户:{{ scope.driverUserName }}</p>
            <p>电话：{{ scope.orderContactsPhone }}</p>
            <p>车牌或设备：{{ scope.orderCarPlateNumber }}</p>
            <p>车型：{{ scope.orderModelsName || '暂未选择' }}</p>
            <p>vin码: {{ scope.vIN }}</p>
          </div>
        </template>
        <template #fault="{ scope }">
          <div w:flex="~" w:align="items-center" w:justify="center" w:w="130px">
            <div>{{ scope.orderFaultDescription || '暂无故障描述' }}</div>
          </div>
        </template>
        <template #handle="{ scope }">
          <div w:w="130px">
            <el-button plain type="text">
              <el-icon>
                <Edit></Edit>
              </el-icon>
              继续做单
            </el-button>
            <el-button plain type="text" class="!ml-0">
              <el-icon>
                <Wallet></Wallet>
              </el-icon>
              工单结算
            </el-button>
          </div>
        </template>
      </kl-custom-table>
    </el-card>
  </div>
</template>

<script setup lang="tsx">
import { useRequest } from 'vue-request';
import { Edit, Wallet } from '@element-plus/icons-vue';
import KlTopBar from '@/components/kl-top-bar';
import KlTableHeader from '@/components/kl-table-header';
import KlCustomTable from '@/components/kl-custom-table';
import TispSvg from '@/base-ui/tisp-svg';
import orderApi from '@/api/modules/order';
import { useUserStore } from '@/store/modules/login';
import type { orderTableListType } from './type';

const userInfo = computed(() => useUserStore().userInfo);
const topBarList = ref([
  { name: '当月累计完成工单', value: 63, icon: 'icon_gongdan' },
  { name: '待处理', value: 9342254, icon: 'icon_daichuli' },
  { name: '进行中', value: 9342254, icon: 'icon_jinxingzhong' },
  { name: '已完成', value: 2471380, icon: 'icon_yiwancheng' },
  { name: '已作废', value: 63, icon: 'icon_yizuofei' },
  { name: '已取消(司机)', value: 63, icon: 'icon_yiquxiao' },
]);
const tabs = ref([
  { label: '全部', value: '' },
  { label: '待处理', value: '4' },
  { label: '进行中', value: '1' },
  { label: '已完成', value: '2' },
  { label: '已作废', value: '3' },
  { label: '已取消', value: '5' },
]);
const headerColumns = ref([
  { label: '收费项目' },
  { label: '客户信息' },
  { label: '故障描述' },
  { label: '费用信息' },
  { label: '订单状态' },
  { label: '操作' },
]);
const orderListParameter = reactive({
  orderAddBeginTimeStr: '',
  orderAddEndTimeStr: '',
  orderStatus: '',
  orderNodeStatus: '',
  searchKeywords: '',
  pageNum: 1,
  pageSize: 20,
  storeId: userInfo.value.userParentId,
});

const tableList = ref<orderTableListType[]>([]);
const total = ref(0);
const loading = ref(true);

const handleTableList = () => {
  loading.value = true;
  useRequest(orderApi.postOrderWithPagingList(orderListParameter), {
    onSuccess: (res) => {
      tableList.value = res.data.datas;
      loading.value = false;
      total.value = res.data.total;
      console.log(res.data, '工单列表');
    },
    onError: () => {
      loading.value = false;
      tableList.value = [];
      total.value = 0;
    },
  });
};
onMounted(() => {
  handleTableList();
});
</script>

<style scoped lang="scss">
.btn {
  @apply bg-white h-full p-20px min-w-120px hover:bg-light-900 rounded-5px cursor-pointer;
}
</style>
