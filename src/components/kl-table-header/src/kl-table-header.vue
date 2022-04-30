<template>
  <div w:flex="~" w:align="items-center" w:justify="between">
    <tisp-tabs v-model="orderListParameter.orderStatus" :tabs="tabs"></tisp-tabs>
    <div class="right" w:flex="~" w:align="items-center" w:mt="-18px">
      <slot name="handle"></slot>
      <div w:flex="~" w:ml="10px" w:align="items-center">
        <span w:mr="20px" class="whitespace-nowrap">开单时间</span>
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
        <el-button :icon="Search" plain type="primary" @click="emits('handle-search')" />
      </div>
      <el-input v-model="orderListParameter.searchKeywords" clearable placeholder="客户名、联系人、手机号" w:ml="20px">
      </el-input>
      <el-button :icon="Search" plain type="primary" @click="emits('handle-search')" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { Search } from '@element-plus/icons-vue';
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

const emits = defineEmits(['update:modelValue', 'handle-search']);
const orderListParameter = ref(props.modelValue);

watch(
  () => props.modelValue.orderStatus,
  () => {
    emits('handle-search');
  },
  { deep: true },
);
</script>

<style lang="scss"></style>
