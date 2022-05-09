<template>
  <el-card class="mt-20px">
    <template #header>
      <div class="flex justify-between items-center">
        <span class="kl-card-title">服务信息</span>
        <div>
          <el-switch
            v-model="params.serviceSwitch"
            active-value="1"
            inactive-value="0"
            active-text="添加作业人员"
            @change="handleSwitch"
          />
          <el-button :icon="CirclePlus" type="primary" plain class="ml-20px" @click="handleAddServe"
            >新增服务</el-button
          >
        </div>
      </div>
    </template>
    <div class="flex">
      <el-tabs v-model="params.orderServiceItems.detailStageAmountType" tab-position="left">
        <el-tab-pane name="1" label="分开结算"></el-tab-pane>
        <el-tab-pane v-if="!serviceSwitch" name="0" label="合并结算"></el-tab-pane>
      </el-tabs>
      <div class="flex-1 relative" style="width: calc(100% - 140px)">
        <!-- , params.serviceSwitch === '0' ? 'left-84px' : 'left-25px' -->
        <div :class="['absolute', 'z-60', 'bottom-0']">
          <kl-autocomplete
            v-model="field"
            placeholder="服务名称"
            :api="goodsApi.postServiceList"
            :api-params="apiParams"
            @select="handleSelect"
          >
            <template #default="{ item }">
              <div
                class="flex flex-col w-full leading-24px py-5px"
                style="border-bottom: 1px dashed var(--el-border-color-light)"
              >
                <div>
                  <span>名称: </span>
                  <span class="truncation text-gray-400">{{ item.serviceName }}</span>
                </div>
                <div class="flex justify-between">
                  <span>
                    <span>工时: </span> <span class="text-gray-400">{{ item.serviceWorkHour }} 小时</span>
                  </span>
                </div>
                <div class="flex justify-between">
                  <span>
                    <span>价格: </span> <span class="text-gray-400">{{ item.serviceAmount || 0.0 }} / 元</span>
                  </span>
                </div>
              </div>
            </template>
          </kl-autocomplete>
        </div>
        <el-table :data="params.orderServiceItems.projectDetails" style="width: 100%">
          <el-table-column label="服务名称" align="center">
            <template #default="{ row, $index }">
              <kl-autocomplete
                v-model="row.itemName"
                placeholder="服务名称"
                :api="goodsApi.postServiceList"
                :api-params="apiParams"
                @select="handleItemSelect($event, $index)"
              >
                <template #default="{ item }">
                  <div
                    class="flex flex-col w-full leading-24px py-5px"
                    style="border-bottom: 1px dashed var(--el-border-color-light)"
                  >
                    <div>
                      <span>名称: </span>
                      <span class="truncation text-gray-400">{{ item.serviceName }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span>
                        <span>工时: </span> <span class="text-gray-400">{{ item.serviceWorkHour }} 小时</span>
                      </span>
                    </div>
                    <div class="flex justify-between">
                      <span>
                        <span>价格: </span> <span class="text-gray-400">{{ item.serviceAmount || 0.0 }} / 元</span>
                      </span>
                    </div>
                  </div>
                </template>
              </kl-autocomplete>
            </template>
          </el-table-column>
          <el-table-column v-if="clearingSwitch" label="服务价格 / 元" align="center">
            <template #default="{ row }">
              <el-input-number v-model="row.itemUnitPrice" :min="0" controls-position="right" />
            </template>
          </el-table-column>
          <el-table-column label="服务工时 / 小时" align="center">
            <template #default="{ row }">
              <el-input-number v-model="row.workHour" :min="0" controls-position="right" />
            </template>
          </el-table-column>
          <el-table-column v-if="serviceSwitch" label="作业人员" align="center">
            <template #default="{ row }">
              <div v-for="item2 in row.workHourServices">
                {{ getUserName(item2.userId) }}
              </div>
            </template>
          </el-table-column>
          <el-table-column v-if="serviceSwitch" label="工时分成" align="center">
            <template #default="{ row }">
              <div v-for="item2 in row.workHourServices" class="flex items-center">
                <el-progress :percentage="item2.allocationProportion" class="w-full" />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template #default="{ row, $index }">
              <el-button v-if="serviceSwitch" type="text" :icon="Edit" @click="handleEdit(row, $index)">
                编辑
              </el-button>
              <el-button type="text" :icon="Delete" @click="handleDelete($index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="text-right mt-20px">
          <span class="kl-label mr-10px">小计:</span>
          <span v-if="clearingSwitch" class="text-red-500 text-1.125rem font-bold"> ¥ {{ totalPrice }} </span>
          <span v-else>
            <el-input v-model="params.orderServiceItems.detailStageAmount" class="!w-150px mr-10px"></el-input> /元
          </span>
        </div>
      </div>
    </div>
  </el-card>
  <edit-serve-dialog
    ref="editServeDialogRef"
    v-model="currentItem"
    :staff-options="staffOptions"
    @handle-confirm="handleConfirm"
  ></edit-serve-dialog>
  <kl-add-serve-dialog ref="addServeDialogRef"></kl-add-serve-dialog>
</template>

<script setup lang="ts">
import { CirclePlus, Edit, Delete } from '@element-plus/icons-vue';
import { PropType } from 'vue';
import type { orderDetailType, optionsType, serveProjectDetailsType } from '../orderDetailType';
import KlAutocomplete from '@/components/kl-autocomplete';
import goodsApi from '@/api/modules/goods';
import { useUserStore } from '@/store/modules/login';
import type { searchOptionsType } from '../type';
import EditServeDialog from './edit-serve-dialog.vue';
import KlAddServeDialog from '@/components/kl-add-serve-dialog';

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
// 搜索关键词参数
const apiParams = {
  pageSize: 999,
  searchKeywords: '',
  storeId: storeInfo.value.id,
};
const field = ref('');

const editServeDialogRef = ref<InstanceType<typeof EditServeDialog>>();
const addServeDialogRef = ref<InstanceType<typeof KlAddServeDialog>>();
const currentItem = ref<serveProjectDetailsType>();
const currentIndex = ref(0);
// 服务价格总计
const totalPrice = computed(() =>
  params.value.orderServiceItems.projectDetails
    .reduce((pre: number, cur: serveProjectDetailsType) => {
      return pre + cur.itemUnitPrice;
    }, 0)
    .toFixed(2),
);
// 作业人员开关 1开 0关
const serviceSwitch = computed(() => params.value.serviceSwitch === '1');
// 结算方式 1分开 0合并
const clearingSwitch = computed(() => params.value.orderServiceItems.detailStageAmountType === '1');

const handleAddServe = () => {
  if (addServeDialogRef.value) {
    addServeDialogRef.value.dialogVisible = true;
    console.log('新增服务');
  }
};
const handleSwitch = (val: string | number | boolean) => {
  if (val === '1') {
    params.value.orderServiceItems.detailStageAmountType = '1';
  } else {
    params.value.orderServiceItems.projectDetails.forEach((item) => {
      item.workHourServices = [
        {
          allocationProportion: 100,
          createTime: 0,
          goodsItemId: '',
          orderId: '',
          serviceId: '',
          serviceName: '',
          storeId: '',
          userId: params.value.userResponsibleId,
          workHour: 0,
        },
      ];
    });
  }
};
const handleConfirm = () => {
  params.value.orderServiceItems.projectDetails[currentIndex.value] = currentItem.value as serveProjectDetailsType;
};
const handleEdit = (row: serveProjectDetailsType, index: number) => {
  if (editServeDialogRef.value) {
    editServeDialogRef.value.dialogVisible = true;
  }
  currentItem.value = JSON.parse(JSON.stringify(row));
  currentIndex.value = index;
};
const getUserName = (id: string) => {
  return props.staffOptions.find((item: optionsType) => item.value === id)?.label;
};
const handleDelete = (index: number) => {
  params.value.orderServiceItems.projectDetails.splice(index, 1);
};
const handleSelect = (item: searchOptionsType) => {
  params.value.orderServiceItems.projectDetails.push({
    itemId: item.serviceId,
    itemName: item.serviceName,
    itemNameSuffix: '',
    itemNumber: 1,
    itemTotalAmount: 1,
    itemUnit: item.serviceUnit,
    itemUnitPrice: item.serviceAmount,
    orderDetailId: '',
    orderDetailItemId: '',
    workHour: item.serviceWorkHour,
    workHourServices: [
      {
        allocationProportion: 100,
        createTime: 0,
        goodsItemId: item.serviceId,
        orderId: '',
        serviceId: '',
        serviceName: '',
        storeId: '',
        userId: params.value.userResponsibleId,
        workHour: item.serviceWorkHour,
      },
    ],
  });
};
const handleItemSelect = (item: searchOptionsType, index: number) => {
  params.value.orderServiceItems.projectDetails[index] = {
    itemId: item.serviceId,
    itemName: item.serviceName,
    itemNameSuffix: '',
    itemNumber: 1,
    itemTotalAmount: 1,
    itemUnit: item.serviceUnit,
    itemUnitPrice: item.serviceAmount,
    orderDetailId: '',
    orderDetailItemId: '',
    workHour: item.serviceWorkHour,
    workHourServices: [
      {
        allocationProportion: 100,
        createTime: 0,
        goodsItemId: item.serviceId,
        orderId: '',
        serviceId: '',
        serviceName: '',
        storeId: '',
        userId: params.value.userResponsibleId,
        workHour: item.serviceWorkHour,
      },
    ],
  };
};
defineExpose({
  totalPrice,
});
</script>

<style scoped></style>
