<template>
  <el-tabs v-model="tabValue" :class="className" :type="type">
    <el-tab-pane v-for="item in tabs" :key="item.value" :label="item.label" :name="item.value"></el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import { PropType } from 'vue'

type tabType = {
  value: string
  label: string
}
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  type: {
    type: String as PropType<'' | 'card' | 'border-card'>,
    default: '',
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
})
const emits = defineEmits(['update:modelValue'])
const tabValue = computed({
  get: () => props.modelValue,
  set: (val: string) => {
    emits('update:modelValue', val)
  },
})
</script>
<style lang="scss" scoped>
:deep(.el-tabs__nav-wrap::after) {
  height: 0;
}
</style>
