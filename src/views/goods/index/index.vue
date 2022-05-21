<template>
  <kl-top-bar v-loading="amountLoading" :list="topBarList">
    <div class="btn">
      <tisp-svg name="icon_daoru"></tisp-svg>
      <p w:my="5px" w:text="gray-400 space-nowrap">单个导入商品</p>
      <p class="kl-label">单个导入</p>
    </div>
    <div class="btn ml-20px">
      <tisp-svg name="icon_piliangdaoru"></tisp-svg>
      <p w:my="5px" w:text="gray-400 space-nowrap">批量导入商品</p>
      <p class="kl-label">批量导入/下载</p>
    </div>
  </kl-top-bar>

  <el-card v-loading="tableLoading">
    <template #header>
      <div class="flex justify-between place-items-center">
        <h1 class="kl-card-title">商品列表</h1>
        <div class="flex items-center justify-end flex-nowrap">
          <el-form ref="formRef" :inline="true" :model="params" class="flex flex-nowrap">
            <el-form-item label="库存筛选" class="!mb-0" prop="isShowInventoryNull">
              <el-tooltip content="开启后将筛选库存大于0的商品" placement="top">
                <el-switch
                  v-model="params.isShowInventoryNull"
                  active-value="exist"
                  inactive-value=""
                  @change="handleSwitch"
                />
              </el-tooltip>
            </el-form-item>
            <el-form-item label="分组" class="!mb-0" prop="goodsGroupId">
              <el-select v-model="params.goodsGroupId" placeholder="请选择">
                <el-option v-for="item in groupOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="商品类型" class="!mb-0" prop="cascader">
              <el-cascader v-model="cascader" :props="props" clearable @change="handleCascader" />
            </el-form-item>
            <el-form-item label="商品来源" class="!mb-0" prop="goodsType">
              <el-select v-model="params.goodsType" placeholder="请选择" @change="handleGetGoodsList">
                <el-option v-for="item in sourceOptions" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="关键词" class="!mb-0" prop="searchKeywords">
              <el-input v-model.trim="params.searchKeywords" placeholder="商品名称,编号" />
            </el-form-item>
          </el-form>
          <el-button :icon="Search" type="primary" @click="handleGetGoodsList">查询</el-button>
          <el-button :icon="Refresh" plain type="primary" @click="handleReset()">重置</el-button>
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
      <template #storeGoodsMaintenanceType="{ row }">
        <span>{{ sourceOptions.find((item) => item.value == row.storeGoodsMaintenanceType)?.label }}</span>
      </template>
      <template #goodsImage="{ row }">
        <el-image :src="imgUrl + row.goodsImage.split(';')[0]" class="w-40px h-40px"></el-image>
      </template>
      <template #handle="{ row }">
        <el-button type="text" :icon="View">详情</el-button>
        <el-button type="text" :icon="Delete" danger>删除</el-button>
      </template>
    </tisp-table>
  </el-card>
</template>

<script setup lang="ts">
import { useRequest } from 'vue-request';
import { Search, Refresh, Switch, Delete, View, Menu } from '@element-plus/icons-vue';
import type { ElForm } from 'element-plus';
import type { topBarListType, iconNamesType, optionsType, queryGoodsGroupType } from './type';
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
const formRef = ref<InstanceType<typeof ElForm>>();
const groupOptions = ref<optionsType[]>([]);
const sourceOptions: optionsType[] = [
  { value: '1', label: '平台商品' },
  { value: '2', label: '自有商品' },
  { value: '', label: '全部' },
];
const columns = ref([
  { prop: 'goodsImage', label: '图片', slotName: 'goodsImage' },
  { prop: 'goodsName', label: '商品名称' },
  { prop: 'goodsCode', label: '商品编号' },
  { prop: 'storeGoodsSalePrice', label: '零售价' },
  { prop: 'storeGoodsInventory', label: '库存' },
  { prop: 'storeGoodsMaintenanceType', label: '商品来源', slotName: 'storeGoodsMaintenanceType' },
  { prop: 'goodsWarrantyPeriod', label: '维保期' },
  { prop: 'goodsPositionNumber', label: '库存仓位' },
  { prop: 'storeGoodsTotalSales', label: '总销量' },
  { prop: 'goodsGroupName', label: '分组' },
  { prop: 'goodsStandard', label: '规格' },
  { prop: 'goodsUnit', label: '单位' },
  { prop: 'handle', label: '操作', slotName: 'handle' },
]);
const cascader = ref<string[]>([]); // 级联数据

const params = ref({
  sortname: '', // 排序字段名称
  sortorder: '', // 排序顺序
  isShowInventoryNull: '', // 筛选大于0
  storeId: storeInfo.value.id,
  goodsClassOne: '', // 商品一级分类
  goodsClassTwo: '', // 商品二级分类
  goodsClassThree: '', // 商品三级分类
  goodsType: '', // 商品来源 1线上商品 2线下商品
  searchKeywords: '', // 搜索关键字
  goodsGroupId: '', // 商品分组id
  pageSize: 20,
  pageNum: 1,
});
const props = reactive({
  lazy: true,
  async lazyLoad(node: any, resolve: any) {
    const selectParams = {
      parentId: node.level === 0 ? 0 : node.value,
      level: node.level === 0 ? 1 : node.level + 1,
      parentName: node.value,
    };
    let res = await goodsApi.queryGoodsClass(selectParams);
    res = res.data.datas.map((item: any) => ({
      label: item.goodsClassName,
      value: item.goodsClassName,
      leaf: node.level === 2,
    }));
    resolve(res);
  },
});
// 改变级联
const handleCascader = (val: string[]) => {
  if (val) {
    params.value.goodsClassOne = val[0];
    params.value.goodsClassTwo = val[1];
    params.value.goodsClassThree = val[2];
  } else {
    params.value.goodsClassOne = '';
    params.value.goodsClassTwo = '';
    params.value.goodsClassThree = '';
  }
};
// 重置
const handleReset = () => {
  if (!formRef.value) return;
  formRef.value.resetFields();
  cascader.value = [];
  params.value.goodsClassOne = '';
  params.value.goodsClassTwo = '';
  params.value.goodsClassThree = '';
  handleGetGoodsList();
};
// 获取分组
const { run: handleGoodsGroup } = useRequest(goodsApi.queryGoodsGroup, {
  manual: true,
  onSuccess: (res) => {
    groupOptions.value = res.data.datas.map((item: queryGoodsGroupType) => ({
      label: item.groupName,
      value: item.groupId,
    }));
  },
  onError: () => {
    groupOptions.value = [];
  },
});
// 筛选库存
const handleSwitch = (val: string | number | boolean) => {
  params.value.isShowInventoryNull = val === 'exist' ? 'exist' : '';
  handleGetGoodsList();
};
// 获取列表数据
const handleGetGoodsList = () => {
  tableLoading.value = true;
  useRequest(goodsApi.postStoreGoods(params.value), {
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
// 获取顶部数据
const { loading: amountLoading, run: handleGetGoodsTotal } = useRequest(goodsApi.queryGoodsCountList, {
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
  handleGetGoodsTotal(storeInfo.value.id);
  handleGoodsGroup({ storeId: storeInfo.value.id });
  handleGetGoodsList();
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
