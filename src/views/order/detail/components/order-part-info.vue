<template>
  <el-card class="mt-20px">
    <template #header>
      <div class="flex justify-between items-center">
        <span class="kl-card-title">配件信息</span>
        <div>
          <el-switch v-model="value1" active-text="添加负责人员" />
          <el-button :icon="CirclePlus" type="primary" plain class="ml-20px">新增商品</el-button>
        </div>
      </div>
    </template>
    <div class="flex">
      {{ orderReplacementParts.detailStageAmountType }}
      <el-tabs v-model="orderReplacementParts.detailStageAmountType" tab-position="left">
        <el-tab-pane name="1" label="分开结算"></el-tab-pane>
        <el-tab-pane name="0" label="合并结算"></el-tab-pane>
      </el-tabs>
      <el-table :data="orderReplacementParts.projectDetails" style="width: 100%">
        <el-table-column prop="date" label="配件图片" align="center">
          <template #default="{ row }">
            <el-image></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="配件信息" align="center">
          <template #default="{ row }">
            <div class="text-left">
              <div>
                <span class="mr-10px inline-block w-50px text-right">名称: </span> <span>{{ row.itemName }}</span>
              </div>
              <div>
                <span class="mr-10px inline-block w-50px text-right">编号: </span> <span>{{ row.itemCode }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="配件数量" align="center">
          <template #default="{ row }">
            <el-input-number v-model="row.itemNumber" :min="0" controls-position="right" />
          </template>
        </el-table-column>
        <el-table-column prop="date" label="配件价格" align="center">
          <template #default="{ row }">
            <el-input-number v-model="row.itemUnitPrice" :min="0" controls-position="right" />
          </template>
        </el-table-column>
        <el-table-column prop="date" label="金额" align="center">
          <template #default="{ row }">
            <el-input-number v-model="row.itemTotalAmount" :min="0" controls-position="right" />
          </template>
        </el-table-column>
        <el-table-column prop="date" label="配件备注" align="center">
          <template #default="{ row }">
            <el-input v-model="row.orderGoodsRemark" placeholder="请输入备注信息"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="配件负责人" align="center">
          <template #default="{ row }">
            <el-select v-model="row.userId" class="m-2" placeholder="请选择负责人">
              <el-option v-for="item in staffOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="操作" align="center">
          <template #default="{ row }">
            <el-button type="text" :icon="Delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { CirclePlus, Delete } from '@element-plus/icons-vue';
import { PropType } from 'vue';
import type { orderReplacementPartsType, optionsType } from '../orderDetailType';

const props = defineProps({
  modelValue: {
    type: Object as PropType<orderReplacementPartsType>,
    default: () => ({}),
  },
  staffOptions: {
    type: Array as PropType<optionsType[]>,
    default: () => [],
  },
});
const orderReplacementParts = computed<orderReplacementPartsType>(() => props.modelValue);
const current = ref('1');
const value1 = ref(true);
</script>

<style scoped></style>
