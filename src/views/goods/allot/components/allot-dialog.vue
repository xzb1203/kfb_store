<template>
  <el-dialog v-model="dialogVisible" :title="title" width="1200px" destroy-on-close center>
    <p class="text-yellow-500 mb-20px">*已为您过滤掉库存小于0的商品</p>
    <el-scrollbar max-height="600px">
      <tisp-table :data="tableList" :columns="columns" :show-page="false">
        <template #goodsImage="{ row }">
          <el-tooltip effect="light" placement="top">
            <template #content>
              <el-image :src="imgUrl + row.goodsImage.split(';')[0]" class="max-w-150px max-h-150px"></el-image>
            </template>
            <el-image :src="imgUrl + row.goodsImage.split(';')[0]" class="w-40px h-40px"></el-image>
          </el-tooltip>
        </template>

        <template #storeGoodsCostPrice="{ row }">
          <el-input-number v-model="row.storeGoodsCostPrice" :min="1" class="!w-100px" controls-position="right" />
        </template>
        <template #purchaseQuantity="{ row }">
          <el-input-number v-model="row.purchaseQuantity" :min="1" class="!w-100px" controls-position="right" />
        </template>

        <template #delete="{ row }">
          <el-button type="text" :icon="Delete" danger @click="handleRemove(row)">删除</el-button>
        </template>
      </tisp-table>
    </el-scrollbar>
    <template #footer>
      <span>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { Delete } from '@element-plus/icons-vue';
import TispTable, { columnsType } from '@/base-ui/tisp-table';

const props = defineProps({
  data: {
    type: Array as PropType<any>,
    default: () => [],
  },
  title: {
    type: String,
    default: '',
  },
});
const emits = defineEmits(['handle-submit']);
const dialogVisible = ref(false);
const columns: columnsType[] = [
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
    prop: 'storeGoodsCostPrice',
    label: '成本价',
    slotName: 'storeGoodsCostPrice',
  },
  {
    prop: 'storeGoodsInventory',
    label: '库存',
  },
  {
    prop: 'purchaseQuantity',
    label: '调拨数量',
    slotName: 'purchaseQuantity',
  },
  {
    prop: 'delete',
    label: '删除',
    slotName: 'delete',
  },
];
const imgUrl = `${import.meta.env.VITE_PICTRUE_URL}productPicture/`;
const tableList: any = ref([]);

const handleRemove = (row: any) => {
  tableList.value = tableList.value.filter((item: any) => item.storeGoodsId !== row.storeGoodsId);
};
const handleConfirm = () => {
  emits('handle-submit', tableList.value);
  dialogVisible.value = false;
};
watch(
  () => props.data,
  (val) => {
    val ? (tableList.value = val.filter((item: any) => item.storeGoodsInventory > 0)) : false;
  },
);
watch(
  () => dialogVisible.value,
  (val: boolean) => {
    val ? (tableList.value = props.data.filter((item: any) => item.storeGoodsInventory > 0)) : false;
  },
);
defineExpose({
  dialogVisible,
});
</script>

<style scoped></style>
