<template>
  <el-card class="mt-20px">
    <template #header>
      <div class="flex justify-between items-center">
        <span class="kl-card-title">配件信息</span>
        <div>
          <el-switch
            v-model="params.goodsSwitch"
            active-value="1"
            inactive-value="0"
            active-text="添加负责人员"
            @change="handleSwitch"
          />
          <el-button :icon="CirclePlus" type="primary" plain class="ml-20px" @click="handleAddGoods"
            >新增商品</el-button
          >
        </div>
      </div>
    </template>
    <div class="flex">
      <el-tabs v-model="params.orderReplacementParts.detailStageAmountType" tab-position="left">
        <el-tab-pane name="1" label="分开结算"></el-tab-pane>
        <el-tab-pane v-if="params.goodsSwitch === '0'" name="0" label="合并结算"></el-tab-pane>
      </el-tabs>
      <div class="flex-1 relative" style="width: calc(100% - 140px)">
        <div :class="['absolute', 'z-60', 'bottom-0']">
          <kl-autocomplete
            v-model="emptyValue"
            placeholder="配件名称,编号"
            :api="goodsApi.postStoreGoods"
            :api-params="apiParams"
            :show-more="true"
            @select="handleSelect"
          >
            <template #default="{ item }">
              <div class="flex flex-col w-full py-5px" style="border-bottom: 1px dashed var(--el-border-color-light)">
                <div class="flex items-center">
                  <el-image class="w-50px h-50px" :src="imgUrl + item.goodsImage"></el-image>
                  <div class="ml-10px leading-24px">
                    <p>
                      <span class="w-70px inline-block">商品名称: </span
                      ><span class="text-gray-400">{{ item.goodsName }}</span>
                    </p>
                    <!-- <p><span class="font-bold">编号: </span> <span>{{item.goodsCode}}</span></p> -->
                    <p>
                      <span class="w-70px inline-block">库<span class="invisible">占位</span>存: </span>
                      <span class="text-gray-400">{{ item.storeGoodsInventory }}</span>
                    </p>
                    <!-- <p><span class="font-bold">仓位号: </span> <span>{{item.goodsPositionNumber}}</span></span></p> -->
                    <p>
                      <span class="w-70px inline-block">单<span class="invisible">占位</span>价: </span>
                      <span class="text-gray-400">¥ {{ item.storeGoodsSalePrice }} </span>
                    </p>
                  </div>
                </div>
              </div>
            </template>
          </kl-autocomplete>
        </div>
        <el-table :data="params.orderReplacementParts.projectDetails" style="width: 100%">
          <el-table-column label="配件图片" align="center">
            <template #default="{ row }">
              <el-image :src="imgUrl + row.itemImage" class="w-50px h-50px"></el-image>
            </template>
          </el-table-column>
          <el-table-column label="配件信息" align="center" width="200px">
            <template #default="{ row }">
              <div class="text-left whitespace-normal">
                <div>
                  <span class="mr-10px inline-block w-50px text-right">名称: </span>
                  <span class="whitespace-normal">{{ row.itemName }}</span>
                </div>
                <div>
                  <span class="mr-10px inline-block w-50px text-right whitespace-normal">编号: </span>
                  <span class="whitespace-normal">{{ row.itemCode }}</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="配件数量" align="center">
            <template #default="{ row }">
              <el-input-number
                v-model="row.itemNumber"
                class="!w-100px"
                :min="0"
                controls-position="right"
                @change="handleItemUnitPrice"
              />
            </template>
          </el-table-column>
          <el-table-column
            v-if="params.orderReplacementParts.detailStageAmountType === '1'"
            label="配件单价"
            align="center"
          >
            <template #default="{ row }">
              <el-input-number
                v-model="row.itemUnitPrice"
                :min="0"
                class="!w-100px"
                controls-position="right"
                @change="handleItemUnitPrice"
              />
            </template>
          </el-table-column>
          <el-table-column
            v-if="params.orderReplacementParts.detailStageAmountType === '1'"
            label="配件总额"
            align="center"
          >
            <template #default="{ row }">
              <el-input-number
                v-model="row.itemTotalAmount"
                :min="0"
                class="!w-100px"
                controls-position="right"
                @change="handleTotalAmount"
              />
            </template>
          </el-table-column>
          <el-table-column label="配件备注" align="center">
            <template #default="{ row }">
              <el-input v-model="row.orderGoodsRemark" type="textarea" rows="1" placeholder="请输入备注信息"></el-input>
            </template>
          </el-table-column>
          <el-table-column v-if="params.goodsSwitch === '1'" label="配件负责人" align="center">
            <template #default="{ row }">
              <el-select v-model="row.userId" class="m-2" placeholder="请选择负责人">
                <el-option v-for="item in staffOptions" :label="item.label" :value="item.value" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template #default="{ $index }">
              <el-button type="text" :icon="Delete" @click="handleDelete($index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="text-right mt-20px">
          <span class="kl-label">小计:</span>
          <span class="text-red-500 ml-10px text-1.125rem font-bold">¥ {{ totalPrice }}</span>
        </div>
      </div>
    </div>
  </el-card>
  <kl-add-goods-dialog ref="addGoodsDialogRef"></kl-add-goods-dialog>
</template>

<script setup lang="ts">
import { CirclePlus, Delete } from '@element-plus/icons-vue';
import { PropType } from 'vue';
import type {
  orderReplacementPartsType,
  optionsType,
  orderDetailType,
  partsProjectDetailsType,
} from '../orderDetailType';
import type { goodsSearchOptionsType } from '../type';
import KlAutocomplete from '@/components/kl-autocomplete';
import goodsApi from '@/api/modules/goods';
import { useUserStore } from '@/store/modules/login';
import KlAddGoodsDialog from '@/components/kl-add-goods-dialog';

const props = defineProps({
  modelValue: {
    type: Object as PropType<orderDetailType>,
    default: () => ({}),
  },
  staffOptions: {
    type: Array as PropType<optionsType[]>,
    default: () => [],
  },
});
const emits = defineEmits(['update:modelValue']);
const params = computed({
  get: () => props.modelValue,
  set: (val) => emits('update:modelValue', val),
});
const storeInfo = computed(() => useUserStore().storeInfo);
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
const addGoodsDialogRef = ref<InstanceType<typeof KlAddGoodsDialog>>();

const totalPrice = computed(() =>
  params.value.orderReplacementParts.projectDetails
    .reduce((pre: number, cur: partsProjectDetailsType) => {
      return pre + cur.itemNumber * cur.itemUnitPrice;
    }, 0)
    .toFixed(2),
);

const handleAddGoods = () => {
  if (addGoodsDialogRef.value) {
    addGoodsDialogRef.value.dialogVisible = true;
    console.log('新增商品');
  }
};

const handleSwitch = (val: string | number | boolean) => {
  if (val === '1') {
    params.value.orderReplacementParts.detailStageAmountType = '1';
  } else {
    params.value.orderReplacementParts.projectDetails = [
      {
        goodsInventory: 0,
        itemCode: '',
        itemId: '',
        itemImage: '',
        itemName: '',
        itemNumber: 0,
        itemStandard: '',
        itemTotalAmount: 0,
        itemType: 0,
        itemUnit: '',
        itemUnitPrice: 0,
        orderDetailId: '',
        orderDetailItemId: '',
        orderGoodsRemark: '',
        userId: params.value.userResponsibleId,
        itemRemark: '',
        workHourServices: [
          {
            createTime: 0,
            goodsItemId: '',
            orderId: '',
            serviceId: '',
            serviceName: '',
            storeId: '',
            userId: params.value.userResponsibleId,
          },
        ],
      },
    ];
  }
};
const handleItemUnitPrice = (val: number | undefined) => {
  if (val) {
    params.value.orderReplacementParts.projectDetails.forEach((item: partsProjectDetailsType) => {
      item.itemTotalAmount = Number((item.itemNumber * item.itemUnitPrice).toFixed(2));
    });
  }
};
const handleTotalAmount = (val: number | undefined) => {
  if (val) {
    params.value.orderReplacementParts.projectDetails.forEach((item: partsProjectDetailsType) => {
      item.itemUnitPrice = Number((val / item.itemNumber).toFixed(2));
    });
  }
};
const handleDelete = (index: number) => {
  params.value.orderReplacementParts.projectDetails.splice(index, 1);
};
const handleSelect = (item: goodsSearchOptionsType) => {
  params.value.orderReplacementParts.projectDetails.push({
    goodsInventory: 0,
    itemCode: item.goodsCode,
    itemId: item.storeGoodsId,
    itemImage: item.goodsImage,
    itemName: item.goodsName,
    itemNumber: 1,
    itemStandard: item.goodsStandard,
    itemTotalAmount: Number(item.storeGoodsSalePrice.replace(/,/g, '')),
    itemType: 0,
    itemUnit: item.goodsUnit,
    itemUnitPrice: Number(item.storeGoodsSalePrice.replace(/,/g, '')),
    orderDetailId: '',
    orderDetailItemId: '',
    orderGoodsRemark: '',
    userId: params.value.userResponsibleId,
    itemRemark: '',
    workHourServices: [
      {
        createTime: 0,
        goodsItemId: item.storeGoodsId,
        orderId: '',
        serviceId: '',
        serviceName: '',
        storeId: '',
        userId: params.value.userResponsibleId,
      },
    ],
  });
  console.log(params.value.orderReplacementParts.projectDetails, '所有配件');
};

defineExpose({
  totalPrice,
});
</script>

<style scoped></style>
