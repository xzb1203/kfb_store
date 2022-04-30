<template>
  <div w:flex="~" w:align="items-center" w:justify="between">
    <tisp-tabs v-model="currentTab" :tabs="tabs"></tisp-tabs>
    <div class="right" w:flex="~" w:align="items-center" w:mt="-18px">
      <slot name="handle"></slot>
      <div w:flex="~" w:ml="10px" w:align="items-center">
        <span w:mr="10px" class="whitespace-nowrap">开单时间</span>
        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="开始日期"
          value-format="yyyy-MM-dd"
          class="!w-150px"
        />
        <tisp-svg name="arrow" w:mx="5px" size="14px"></tisp-svg>
        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="结束日期"
          value-format="yyyy-MM-dd"
          class="!w-150px"
        />
      </div>
      <el-input v-model="value1" placeholder="客户名、联系人、手机号、车牌号、订单号" w:ml="10px"></el-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import TispTabs from '@/base-ui/tisp-tabs';
import tispSvg from '@/base-ui/tisp-svg';

const currentTab = ref('0');
defineProps({
  tabs: {
    type: Array as PropType<any>,
    default: () => [],
  },
  modelValue: {
    type: String,
    default: '',
  },
});

const emits = defineEmits(['update:modelValue']);
const value1 = ref('');
</script>

<style lang="scss"></style>
