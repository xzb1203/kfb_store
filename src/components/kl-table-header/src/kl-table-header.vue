<template>
  <div w:flex="~" w:align="items-center" w:justify="between">
    <tisp-tabs v-model="params.orderStatus" :tabs="tabs"></tisp-tabs>
    <div w:flex="~ nowrap" w:align="items-center" w:mt="-18px" w:pt="6px">
      <el-form ref="formRef" :inline="true" :model="params" class="min-w-730px">
        <el-form-item label="开单时间" class="!mb-0 !mr-0" prop="orderAddBeginTimeStr">
          <el-date-picker
            v-model="params.orderAddBeginTimeStr"
            type="date"
            placeholder="开始日期"
            value-format="YYYY-MM-DD"
            class="!w-150px"
          />
          <tisp-svg name="arrow" w:mx="5px" size="14px"></tisp-svg>
        </el-form-item>
        <el-form-item prop="orderAddEndTimeStr" class="!mb-0">
          <el-date-picker
            v-model="params.orderAddEndTimeStr"
            type="date"
            placeholder="结束日期"
            value-format="YYYY-MM-DD"
            class="!w-150px"
          />
        </el-form-item>
        <el-form-item label="关键词" class="!mb-0" prop="searchKeywords">
          <div class="flex items-center">
            <el-tooltip effect="dark" content="客户名、联系人、手机号、车牌号、订单号" placement="top">
              <el-icon class="!-ml-10px mr-12px hover:text-blue-500"><chat-line-square /></el-icon>
            </el-tooltip>
            <el-input v-model="params.searchKeywords" clearable placeholder="客户名、联系人、手机号"> </el-input>
          </div>
        </el-form-item>
      </el-form>
      <el-button :icon="Search" type="primary" @click="emits('handle-search')">查询</el-button>
      <el-button :icon="Refresh" plain type="primary" @click="handleReset(formRef)">重置</el-button>
      <el-button :icon="Download" type="primary" plain @click="handleExport">导出</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { Search, Refresh, Download, ChatLineSquare } from '@element-plus/icons-vue';
import type { FormInstance } from 'element-plus';
import TispTabs from '@/base-ui/tisp-tabs';
import tispSvg from '@/base-ui/tisp-svg';

const props = defineProps({
  tabs: {
    type: Array as PropType<any>,
    default: () => [],
  },
  modelValue: {
    type: Object as PropType<any>,
    default: () => ({}),
  },
});
const emits = defineEmits(['update:modelValue', 'handle-search', 'handle-export']);
const params = ref(props.modelValue);
const formRef = ref();

const handleReset = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  emits('handle-search');
};
const handleExport = () => {
  emits('handle-export');
};
watch(
  () => props.modelValue.orderStatus,
  () => {
    emits('handle-search');
  },
  { deep: true },
);
</script>

<style lang="scss" scoped>
:deep(.el-form-item) {
  @apply font-bold text-gray-600;
}
</style>
