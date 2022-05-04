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
      <el-tabs v-model="orderReplacementParts.detailStageAmountType" tab-position="left">
        <el-tab-pane name="1" label="分开结算"></el-tab-pane>
        <el-tab-pane name="0" label="合并结算"></el-tab-pane>
      </el-tabs>
      <el-table :data="orderReplacementParts.projectDetails" style="width: 100%">
        <el-table-column prop="date" label="配件图片" align="center">
          <template #default="{ row }">
            <!-- <el-image></el-image> -->
            <kl-autocomplete
              v-model="emptyValue"
              placeholder="配件名称,编号"
              :api="goodsApi.postStoreGoods"
              :api-params="apiParams"
              :show-more="true"
              @select="handleSelect"
            >
              <template #default="{ item }">
                <div class="flex flex-col w-full" style="border-bottom: 1px dashed var(--el-border-color-light)">
                  <div class="flex items-center">
                    <el-image class="w-50px h-50px" :src="imgUrl + item.goodsImage"></el-image>
                    <div class="ml-10px leading-24px">
                      <p>
                        <span class="font-bold w-70px inline-block">商品名称: </span><span>{{ item.goodsName }}</span>
                      </p>
                      <!-- <p><span class="font-bold">编号: </span> <span>{{item.goodsCode}}</span></p> -->
                      <p>
                        <span class="font-bold w-70px inline-block">库<span class="invisible">占位</span>存: </span>
                        <span>{{ item.storeGoodsInventory }}</span>
                      </p>
                      <!-- <p><span class="font-bold">仓位号: </span> <span>{{item.goodsPositionNumber}}</span></span></p> -->
                      <p>
                        <span class="font-bold w-70px inline-block">￥: </span>
                        <span>{{ item.storeGoodsSalePrice }}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </template>
            </kl-autocomplete>
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
    <div class="text-right mt-20px">
      <span class="kl-label">小计:</span>
      <span class="text-red-500 ml-10px text-1.125rem font-bold">¥ 0.00</span>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { CirclePlus, Delete } from '@element-plus/icons-vue';
import { PropType } from 'vue';
import type { orderReplacementPartsType, optionsType } from '../orderDetailType';
import KlAutocomplete from '@/components/kl-autocomplete';
import goodsApi from '@/api/modules/goods';
import { useUserStore } from '@/store/modules/login';

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
const storeInfo = computed(() => useUserStore().storeInfo);

const orderReplacementParts = computed<orderReplacementPartsType>(() => props.modelValue);
const imgUrl = `${import.meta.env.VITE_PICTRUE_URL}productPicture/`;

const emptyValue = ref('');
// 搜索关键词参数
const apiParams = {
  sortname: 'storeGoodsInventory',
  sortorder: 'desc',
  searchKeywords: '',
  storeId: storeInfo.value.id,
  pageSize: 999,
};
const value1 = ref(true);
const handleSelect = (item: any) => {
  console.log(item);
};
</script>

<style scoped></style>
