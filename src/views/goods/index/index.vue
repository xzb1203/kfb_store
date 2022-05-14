<template>
  <kl-top-bar v-loading="amountLoading" :list="topBarList">
    <div class="btn">
      <tisp-svg name="icon_fuwu"></tisp-svg>
      <p w:my="5px" w:text="gray-400 space-nowrap">单个导入商品</p>
      <p class="kl-label">单个导入</p>
    </div>
    <div class="btn ml-20px">
      <tisp-svg name="icon_guanli"></tisp-svg>
      <p w:my="5px" w:text="gray-400 space-nowrap">批量导入商品</p>
      <p class="kl-label">批量导入/下载</p>
    </div>
  </kl-top-bar>

  <el-card v-loading="tableLoading">
    <template #header>
      <div class="flex justify-between place-items-center">
        <h1 class="kl-card-title">商品列表</h1>
        <div class="flex items-center justify-end flex-nowrap">
          <el-form :inline="true" :model="params" class="flex flex-nowrap">
            <el-form-item label="库存筛选" class="!mb-0">
              <el-tooltip content="开启后将筛选库存大于0的商品" placement="top">
                <el-switch v-model="params.sortname" />
              </el-tooltip>
            </el-form-item>
            <el-form-item label="分组" class="!mb-0">
              <el-select v-model="params.sortname" placeholder="请选择">
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
              </el-select>
            </el-form-item>
            <el-form-item label="商品类型" class="!mb-0">
              <el-select v-model="params.sortname" placeholder="请选择">
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
              </el-select>
            </el-form-item>
            <el-form-item label="商品来源" class="!mb-0">
              <el-select v-model="params.sortname" placeholder="请选择">
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
              </el-select>
            </el-form-item>
            <el-form-item label="关键词" class="!mb-0">
              <el-input v-model="params.sortname" placeholder="商品名称,编号" />
            </el-form-item>
          </el-form>
          <el-button :icon="Search" type="primary">查询</el-button>
          <el-button :icon="Refresh" plain type="primary">重置</el-button>
          <el-button :icon="Switch" plain type="primary">调拨</el-button>
          <el-button :icon="Menu" plain type="primary">分组管理</el-button>
        </div>
      </div>
    </template>
    <tisp-table
      v-model="params"
      :columns="columns"
      :data="tableData"
      :total="total"
      :show-select-column="true"
      @change-page="handleGetGoodsList"
    >
      <template #goodsImage="{ row }">
        <el-image :src="imgUrl + row.goodsImage" class="w-40px h-40px"></el-image>
      </template>
      <template #handle>
        <el-button type="text" :icon="View">详情</el-button>
        <el-button type="text" :icon="Delete" danger>删除</el-button>
      </template>
    </tisp-table>
  </el-card>
</template>

<script setup lang="ts">
import { useRequest } from 'vue-request';
import { Search, Refresh, Switch, Delete, View, Menu } from '@element-plus/icons-vue';
import type { topBarListType, iconNamesType } from './type';
import TispSvg from '@/base-ui/tisp-svg';
import { useUserStore } from '@/store/modules/login';
import goodsApi from '@/api/modules/goods';
import TispTable from '@/base-ui/tisp-table';

const storeInfo = computed(() => useUserStore().storeInfo);
const topBarList = ref<topBarListType[]>([
  {
    label: '商品种数',
    value: '',
    icon: 'icon_shangpingzhongshu',
  },
  {
    label: '销售总价值',
    value: '',
    icon: 'icon_xiaoshouzongjiazhi',
    unit: '￥',
  },
  {
    label: '累计采购额',
    value: '',
    icon: 'icon_leijicaigoue',
    unit: '￥',
  },
  {
    label: '累计销售额',
    value: '',
    icon: 'icon_shangpingzhongshu',
    unit: '￥',
  },
]);
const imgUrl = `${import.meta.env.VITE_PICTRUE_URL}productPicture/`;
const tableLoading = ref(false);
const tableData = ref([]);
const total = ref(0);
const columns = ref([
  { prop: 'goodsImage', label: '图片', slotName: 'goodsImage' },
  { prop: 'goodsName', label: '商品名称' },
  { prop: 'goodsCode', label: '商品编号' },
  { prop: 'storeGoodsSalePrice', label: '零售价' },
  { prop: 'storeGoodsInventory', label: '库存' },
  { prop: 'storeGoodsMaintenanceType', label: '商品来源' },
  { prop: 'goodsWarrantyPeriod', label: '维保期' },
  { prop: 'goodsPositionNumber', label: '库存仓位' },
  { prop: 'storeGoodsTotalSales', label: '总销量' },
  { prop: 'goodsGroupName', label: '分组' },
  { prop: 'goodsStandard', label: '规格' },
  { prop: 'goodsUnit', label: '单位' },
  { prop: 'handle', label: '操作', slotName: 'handle' },
]);
const params = ref({
  sortname: '', // 排序字段名称
  sortorder: '', // 排序顺序
  storeId: storeInfo.value.id,
  goodsClassOne: '', // 商品一级分类
  goodsClassTwo: '', // 商品二级分类
  goodsClassThree: '', // 商品三级分类
  goodsType: '', // 商品类型 1线上商品 2线下商品
  searchKeywords: '', // 搜索关键字
  goodsGroupId: '', // 商品分组id
  pageSize: 20,
  pageNum: 1,
});
const handleGetGoodsList = () => {
  tableLoading.value = true;
  useRequest(goodsApi.postStoreGoods(params.value), {
    onSuccess: (res) => {
      tableData.value = res.data.datas;
      tableLoading.value = false;
      total.value = res.data.total;
      console.log(res.data, '商品数据');
    },
    onError: () => {
      tableData.value = [];
      tableLoading.value = false;
    },
  });
};
const { loading: amountLoading, run: handleGetGoodsTotal } = useRequest(goodsApi.queryGoodsCountList, {
  onSuccess: (res) => {
    const countList = Object.values(res.data.datas);
    topBarList.value.forEach((item: topBarListType, index: number) => {
      item.value = countList[index] as string;
    });
    console.log(res.data.datas);
  },
  onError: () => {
    topBarList.value = [];
  },
});
onMounted(() => {
  handleGetGoodsTotal(storeInfo.value.id);
  handleGetGoodsList();
});
</script>

<style scoped lang="scss">
.btn {
  @apply bg-white h-full p-20px min-w-120px hover:bg-light-900 rounded-5px cursor-pointer;
}
</style>
