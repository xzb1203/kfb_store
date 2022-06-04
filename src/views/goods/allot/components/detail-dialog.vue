<template>
  <el-dialog v-model="dialogVisible" title="调拨详情" width="1200px" destroy-on-close center>
    <el-scrollbar max-height="600px">
      <tisp-table :data="data" :columns="columns" :show-page="false">
        <template #goodsImage="{ row }">
          <el-tooltip effect="light" placement="top">
            <template #content>
              <el-image
                :src="row.goodsImage ? imgUrl + row.goodsImage.split(';')[0] : ''"
                class="max-w-150px max-h-150px"
              ></el-image>
            </template>
            <el-image
              :src="row.goodsImage ? imgUrl + row.goodsImage.split(';')[0] : ''"
              class="w-40px h-40px"
            ></el-image>
          </el-tooltip>
        </template>
      </tisp-table>
    </el-scrollbar>
  </el-dialog>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import TispTable, { columnsType } from '@/base-ui/tisp-table';

defineProps({
  data: {
    type: Array as PropType<any>,
    default: () => [],
  },
});
const dialogVisible = ref(false);
const imgUrl = `${import.meta.env.VITE_PICTRUE_URL}productPicture/`;

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
    prop: 'allotPrice',
    label: '价格',
    slotName: 'allotPrice',
  },

  {
    prop: 'goodsNumber',
    label: '调拨数量',
  },
  {
    prop: 'allotTypeName',
    label: '调拨类型',
  },
  {
    prop: 'createDate',
    label: '调拨时间',
  },
];

defineExpose({
  dialogVisible,
});
</script>

<style scoped></style>
