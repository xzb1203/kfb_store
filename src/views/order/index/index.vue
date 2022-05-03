<template>
  <div>
    <kl-top-bar v-loading="amountLoading" :list="topBarList">
      <div class="btn" @click="handleCreatedOrder">
        <tisp-svg name="icon_fuwu"></tisp-svg>
        <p w:my="5px" w:text="gray-400 space-nowrap">新建工单服务</p>
        <p class="kl-label">创建工单</p>
      </div>
      <div class="btn" w:ml="20px">
        <tisp-svg name="icon_guanli"></tisp-svg>
        <p w:my="5px" w:text="gray-400 space-nowrap">管理服务项目</p>
        <p class="kl-label">服务管理</p>
      </div>
    </kl-top-bar>
    <el-card>
      <kl-table-header
        v-model="orderListParameter"
        :tabs="tabs"
        @handle-export="handleExport('open')"
        @handle-search="handleTableList(1)"
      >
      </kl-table-header>
      <el-scrollbar :height="height">
        <kl-custom-table
          v-model="orderListParameter"
          v-loading="loading"
          :total="total"
          :header-columns="headerColumns"
          :table-list="tableList"
          @handle-page="handleTableList"
        >
          <template #handle="{ scope }">
            <div w:w="130px">
              <el-button plain type="text" @click="handleGoOrderInfo(scope)">
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
      </el-scrollbar>
      <div w:flex="~" w:justify="end" w:mt="10px">
        <el-pagination
          v-model:currentPage="orderListParameter.pageNum"
          v-model:page-size="orderListParameter.pageSize"
          layout="total,sizes, prev, pager, next"
          background
          :total="total"
          @size-change="handleTableList"
          @current-change="handleTableList"
        >
        </el-pagination>
      </div>
    </el-card>
    <kl-export-dialog
      ref="exportRef"
      v-model="orderListParameter"
      :down-loading="downLoading"
      @handle-export="handleExport('close')"
    ></kl-export-dialog>
  </div>
</template>

<script setup lang="tsx">
import { useRequest } from 'vue-request';
import { Edit, Wallet } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import KlTopBar from '@/components/kl-top-bar';
import KlTableHeader from '@/components/kl-table-header';
import KlCustomTable from '@/components/kl-custom-table';
import TispSvg from '@/base-ui/tisp-svg';
import orderApi from '@/api/modules/order';
import { useUserStore } from '@/store/modules/login';
import type { orderTableListType, iconNamesType, topBarListType } from './type';
import KlExportDialog from '@/components/kl-export-dialog';
import { downloadFile } from '@/utils/download-file';

const router = useRouter();
const userInfo = computed(() => useUserStore().userInfo);
const storeInfo = computed(() => useUserStore().storeInfo);
const topBarList = ref<topBarListType[]>([]);
const exportRef = ref();
const iconNames: iconNamesType = {
  '1': 'icon_jinxingzhong',
  '2': 'icon_yiwancheng',
  '3': 'icon_yizuofei',
  '4': 'icon_daichuli',
  '5': 'icon_yiquxiao',
};
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
const downLoading = ref(false);
const height = ref(`${document.documentElement.clientHeight - 380}px`);

const handleGoOrderInfo = (scope: orderTableListType) => {
  router.push({ name: 'orderDetail', query: { orderId: scope.orderId } });
};
const handleCreatedOrder = () => {
  useRequest(orderApi.postCreateOrder({ storeId: storeInfo.value.id, orderType: 0 }), {
    onSuccess: (res) => {
      const orderId = res.data.datas;
      router.push({ name: 'orderDetail', query: { orderId } });
    },
    onError: () => {
      router.push({ name: '404' });
    },
  });
};
const handleExport = (val: string) => {
  if (val === 'open') {
    exportRef.value.dialogVisible = true;
  } else {
    downLoading.value = true;
    useRequest(orderApi.postDownOrderExcel(orderListParameter), {
      onSuccess: (res) => {
        downloadFile('卡服邦工单明细 ', 'xlsx', res);
        ElMessage.success('导出成功!');
        exportRef.value.dialogVisible = false;
        downLoading.value = false;
        orderListParameter.orderAddBeginTimeStr = '';
        orderListParameter.orderAddEndTimeStr = '';
      },
    });
  }
};

const handleTableList = (val: number) => {
  loading.value = true;
  const params = { ...orderListParameter };
  params.pageNum = val || params.pageNum;
  params.orderStatus = params.orderStatus === '0' ? '' : params.orderStatus;
  useRequest(orderApi.postOrderWithPagingList(params), {
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
const { loading: amountLoading, run: handleGetOrderTotal } = useRequest(orderApi.getOrderTotal, {
  onSuccess: (res) => {
    topBarList.value = res.data.datas.map((item: any) => ({
      label: item.orderStatusName,
      value: item.orderStatusNumber,
      icon: iconNames[item.orderStatus],
    }));
  },
  onError: () => {
    topBarList.value = [];
  },
});
const handleResize = () => {
  height.value = `${document.documentElement.clientHeight - 380}px`;
};
onMounted(() => {
  handleTableList(1);
  handleGetOrderTotal(userInfo.value.userParentId);
  window.addEventListener('resize', handleResize);
});
</script>

<style scoped lang="scss">
.btn {
  @apply bg-white h-full p-20px min-w-120px hover:bg-light-900 rounded-5px cursor-pointer;
}
</style>
