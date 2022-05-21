<template>
  <el-tabs v-model="tabValue" :class="className" :type="type" :tab-position="tabPosition" @tab-change="handleTab">
    <el-tab-pane v-for="item in tabs" :key="item.value" :label="item.label" :name="item.value"> </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { PropType } from 'vue';

type tabType = {
  value: string;
  label: string;
};
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  type: {
    type: String as PropType<'' | 'card' | 'border-card'>,
    default: '',
  },
  tabPosition: {
    type: String as PropType<'left' | 'right' | 'top' | 'bottom'>,
    default: 'top',
  },
  tabs: {
    type: Array as PropType<tabType[]>,
    default: () => [],
    required: true,
  },
  className: {
    type: String,
    default: 'index-tabs',
  },
});
const emits = defineEmits(['update:modelValue', 'handle-tab']);
const tabValue = computed({
  get: () => props.modelValue,
  set: (val: string) => {
    emits('update:modelValue', val);
  },
});
const handleTab = () => {
  emits('handle-tab');
};
</script>
<style lang="scss" scoped>
:deep(.el-tabs__nav-wrap::after) {
  height: 0 !important;
}
:deep(.el-tabs__item) {
  @apply font-bold text-gray-600;
}
</style>
