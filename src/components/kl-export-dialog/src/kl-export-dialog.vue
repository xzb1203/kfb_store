<template>
  <el-dialog v-model="dialogVisible" title="导出" width="30%" center>
    <div class="flex items-center justify-center">
      <span class="mr-20px">时间范围</span>
      <el-date-picker
        v-model="orderListParameter.orderAddBeginTimeStr"
        type="date"
        placeholder="开始日期"
        value-format="YYYY-MM-DD"
        class="!w-150px"
      />
      <tisp-svg name="arrow" w:mx="5px" size="14px"></tisp-svg>
      <el-date-picker
        v-model="orderListParameter.orderAddEndTimeStr"
        type="date"
        placeholder="结束日期"
        value-format="YYYY-MM-DD"
        class="!w-150px"
      />
    </div>
    <template #footer>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button :loading="downLoading" type="primary" @click="handleConfirm">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import tispSvg from '@/base-ui/tisp-svg';

const props = defineProps({
  downLoading: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: Object as PropType<any>,
    default: () => ({}),
  },
});
const dialogVisible = ref(false);
const orderListParameter = ref(props.modelValue);

const emits = defineEmits(['handle-export']);
const handleConfirm = () => {
  emits('handle-export');
};

defineExpose({
  dialogVisible,
});
</script>

<style scoped></style>
