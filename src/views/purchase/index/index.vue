<template>
  <kl-top-bar v-loading="topLoading" :list="topBarList">
    <div class="btn">
      <router-link to="/purchase/offline/index">
        <tisp-svg name="icon_daoru"></tisp-svg>
        <p w:my="5px" w:text="gray-400 space-nowrap">从线下采购商品</p>
        <p class="kl-label">线下采购</p>
      </router-link>
    </div>
    <div class="btn ml-20px">
      <router-link to="/purchase/online/index">
        <tisp-svg name="icon_piliangdaoru"></tisp-svg>
        <p w:my="5px" w:text="gray-400 space-nowrap">从平台采购商品</p>
        <p class="kl-label">平台采购</p>
      </router-link>
    </div>
    <div class="btn ml-20px">
      <tisp-svg name="icon_piliangdaoru"></tisp-svg>
      <p w:my="5px" w:text="gray-400 space-nowrap">编辑/设置地址</p>
      <p class="kl-label">地址管理</p>
    </div>
  </kl-top-bar>
  <el-tabs v-model="activeName" @tab-change="handleTableList">
    <el-tab-pane label="线下采购" name="线下采购"></el-tab-pane>
    <el-tab-pane label="平台采购" name="平台采购"></el-tab-pane>
  </el-tabs>
  <el-card>
    <kl-table-header
      v-model="params"
      :tabs="tabs"
      placeholder="采购单号,供应商,商品,商品编号"
      @handle-export="handleExport('open')"
      @handle-search="handleTableList"
    >
    </kl-table-header>
    <tisp-table
      v-model:params="params"
      v-model:columns="columns"
      :total="total"
      :data="tableData"
      @change-page="handleTableList"
    >
      <template #orderDetail="{ row }">
        <div class="flex">
          <div v-for="item in row.orderDetail">
            <el-tooltip effect="light" placement="top">
              <template #content>
                <div class="max-w-400px h-86px">
                  <el-tabs type="card">
                    <el-tab-pane v-for="item2 in row.orderDetail" :key="item2.orderCode">
                      <template #label>
                        <el-image :src="imgUrl + item2.detailGoodsImage" class="w-80px h-80px ml-10px"></el-image>
                      </template>
                    </el-tab-pane>
                  </el-tabs>
                </div>
              </template>
              <el-image :src="imgUrl + item.detailGoodsImage" class="w-60px h-60px ml-10px"></el-image>
            </el-tooltip>
          </div>
        </div>
      </template>
      <template #handle="{ row }">
        <span v-show="activeName === '线下采购'">
          <el-button
            v-if="row.orderStatus === '已完成' || row.orderStatus === '已作废'"
            type="text"
            :icon="View"
            @click="handleDetail('线下采购')"
          >
            查看详情
          </el-button>
          <el-button v-else type="text" :icon="Goods" @click="handleShopping(row)">继续采购</el-button>
        </span>
        <span v-show="activeName === '平台采购'">
          <el-button type="text" :icon="View" @click="handleDetail('平台采购')">查看详情</el-button>
          <el-button v-if="row.orderStatus === '已完成'" type="text" :icon="Remove">发起退货</el-button>
          <el-button v-else type="text" :icon="Close">取消订单</el-button>
        </span>
      </template>
    </tisp-table>
  </el-card>
</template>

<script setup lang="ts">
import { useRequest } from 'vue-request';
import { View, Delete, Goods, Close, Remove } from '@element-plus/icons-vue';
import TispSvg from '@/base-ui/tisp-svg';
import TispTable, { columnsType } from '@/base-ui/tisp-table';
import { useUserStore } from '@/store/modules/login';
import orderApi from '@/api/modules/order';
import type { tableListType } from './type';
import KlTableHeader from '@/components/kl-table-header';

const router = useRouter();
const storeInfo = computed(() => useUserStore().storeInfo);
const imgUrl = `${import.meta.env.VITE_PICTRUE_URL}productPicture/`;
const topLoading = ref(false);
const activeName = ref('线下采购');
const topBarList = ref([
  {
    label: '商品种数',
    value: '34',
    icon: 'icon_shangpingzhongshu',
  },
  {
    label: '销售总价值',
    value: '34',
    icon: 'icon_xiaoshouzongjiazhi',
    unit: '￥',
  },
  {
    label: '销售总价值',
    value: '34',
    icon: 'icon_xiaoshouzongjiazhi',
    unit: '￥',
  },
]);
const offlineTabs = ref([
  { label: '全部', value: '' },
  { label: '进行中', value: '1' },
  { label: '已完成', value: '2' },
  { label: '已作废', value: '3' },
]);
const onlineTabs = ref([
  { label: '全部', value: '' },
  { label: '待确认', value: '1' },
  { label: '待发货', value: '2' },
  { label: '待收货', value: '3' },
  { label: '已完成', value: '4' },
  { label: '采购方已取消', value: '5' },
  { label: '销售方已取消', value: '6' },
]);
const tabs = computed(() => (activeName.value === '线下采购' ? offlineTabs.value : onlineTabs.value));
const params = ref({
  storeId: storeInfo.value.id,
  orderStatus: '',
  orderBeginTimeStr: '',
  orderEndTimeStr: '',
  searchKeywords: '',
  pageNum: 1,
  pageSize: 20,
  type: '',
});
const tableData = ref<tableListType[]>([]);
const columns = ref<columnsType[]>([
  { label: '商品', slotName: 'orderDetail' },
  { prop: 'orderCode', label: '订单编号' },
  { prop: 'orderUserName', label: '负责人' },
  { prop: 'orderSaleName', label: '供应商' },
  { prop: 'orderTotalAmount', label: '金额' },
  { prop: 'orderStatus', label: '订单状态' },
  { prop: 'orderAddTimeStr', label: '时间' },
  { label: '操作', slotName: 'handle' },
]);
const total = ref(0);

const handleExport = (val: string) => {
  console.log(val);
};
const currentApi = computed(() => (activeName.value === '线下采购' ? orderApi.postOfflineList : orderApi.postLineList));
const handleShopping = (row: any) => {
  console.log(row);
  router.push({ name: 'purchaseOfflineIndex' });
};
const handleDetail = (val: string) => {
  if (val === '线下采购') {
    console.log(val);
    router.push({ name: 'purchaseOfflineDetail' });
  } else {
    router.push({ name: 'purchaseOnlineDetail' });
  }
};
const handleTableList = () => {
  useRequest(currentApi.value(params.value), {
    onSuccess: (res) => {
      const currentTabs = activeName.value === '线下采购' ? offlineTabs.value : onlineTabs.value;
      tableData.value = res.data.datas.map((item: tableListType) => ({
        ...item,
        orderStatus: currentTabs.find((tab: any) => tab.value === item.orderStatus)?.label,
      }));
      total.value = res.data.total;
      console.log(res.data.datas, 'res.data.datasres.data.datas');
    },
    onError: () => {
      tableData.value = [];
    },
  });
};
onMounted(() => {
  handleTableList();
});
</script>

<style scoped lang="scss">
@import '@/assets/styles/el-tabs-tooltip.scss';

.btn {
  @apply bg-white h-full p-20px min-w-120px hover:bg-light-900 rounded-5px cursor-pointer;
}

:deep(.el-form-item__label) {
  font-weight: bold;
}
</style>
