<template>
  <el-dialog v-model="dialogVisible" title="编辑工时分成" width="30%" center>
    <el-table :data="currentItem.workHourServices" style="width: 100%">
      <el-table-column prop="date" label="作业人员" width="180">
        <template #default="{ row }">
          <el-select v-model="row.userId" class="m-2" placeholder="请选择负责人">
            <el-option v-for="item in staffOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="工时分成 / %" width="180">
        <template #default="{ row }">
          <el-input-number
            v-model="row.allocationProportion"
            :min="0"
            :max="100"
            controls-position="right"
            @change="handleChangeNum(row)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template #default="{ $index }">
          <el-button :icon="CirclePlus" type="text" @click="handleAdd">添加</el-button>
          <el-button :icon="Delete" type="text" @click="handleDelete($index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { CirclePlus, Delete } from '@element-plus/icons-vue';
import { PropType } from 'vue';
import type { optionsType, serveProjectDetailsType, serveWorkHourServicesType } from '../orderDetailType';

const props = defineProps({
  modelValue: {
    type: Object as PropType<serveProjectDetailsType>,
    default: () => ({}),
  },
  staffOptions: {
    type: Array as PropType<optionsType[]>,
    default: () => [],
  },
});
const emits = defineEmits(['update:modelValue', 'handle-confirm']);
const currentItem = computed({
  get: () => props.modelValue,
  set: (val) => emits('update:modelValue', val),
});

const dialogVisible = ref(false);

function handleChangeNum(row: serveWorkHourServicesType) {
  console.log(row);
  row.isEdit = true;
  handleSetAllocationProportion();
}
function handleAdd() {
  currentItem.value.workHourServices.push({
    allocationProportion: 100,
    createTime: 0,
    goodsItemId: currentItem.value.itemId,
    id: '',
    orderId: '',
    serviceId: currentItem.value.orderDetailItemId,
    serviceName: '',
    storeId: '',
    userId: '',
    workHour: 0,
  });
  handleSetAllocationProportion();
}

function handleDelete(index: number) {
  currentItem.value.workHourServices.splice(index, 1);
  handleSetAllocationProportion();
}
function handleConfirm() {
  emits('handle-confirm');
  dialogVisible.value = false;
}
function handleSetAllocationProportion() {
  // 编辑过的列
  const isEditItem = currentItem.value.workHourServices.filter((item: serveWorkHourServicesType) => item.isEdit);
  // 编辑过的总和
  const editItemTotal = isEditItem.reduce((pre: number, cur: serveWorkHourServicesType) => {
    return pre + cur.allocationProportion;
  }, 0);
  // 没有编辑过的
  const noEditItem = currentItem.value.workHourServices.filter((item: serveWorkHourServicesType) => !item.isEdit);
  // 没有编辑过的总和
  const noEditItemTotal = noEditItem.reduce((pre: number, cur: serveWorkHourServicesType) => {
    return pre + cur.allocationProportion;
  }, 0);
  currentItem.value.workHourServices.forEach((item: serveWorkHourServicesType) => {
    if (currentItem.value.workHourServices.length === 1) {
      item.allocationProportion = 100;
      return;
    }
    if (!item.isEdit) {
      item.allocationProportion = Number(((100 - editItemTotal) / noEditItem.length).toFixed(0));
    }
  });
}
defineExpose({
  dialogVisible,
});
</script>

<style scoped></style>
