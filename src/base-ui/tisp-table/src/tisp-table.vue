<template>
  <el-table :data="data" style="width: 100%" v-bind="childrenProps" @selection-change="handleSelectionChange">
    <el-table-column v-if="showSelectColumn" type="selection" align="center" width="60"></el-table-column>
    <el-table-column v-if="showIndexColumn" type="index" label="序号" align="center" width="80"></el-table-column>
    <template v-for="item in columns" :key="item.prop">
      <el-table-column v-bind="item" align="center">
        <template #default="scope">
          <slot :name="item.slotName" :row="scope.row">
            {{ scope.row[item.prop] }}
          </slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
  <div v-if="showPage" class="mt-15px flex justify-end">
    <el-pagination
      v-model:currentPage="page.pageNum"
      v-model:page-size="page.pageSize"
      :page-sizes="[20, 30, 40, 50]"
      layout="total, sizes, prev, pager, next"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

const props = defineProps({
  showIndexColumn: {
    type: Boolean,
    default: false,
  },
  showSelectColumn: {
    type: Boolean,
    default: false,
  },
  showPage: {
    type: Boolean,
    default: true,
  },
  total: {
    type: Number,
    default: 0,
  },
  data: {
    type: Array as PropType<any>,
    default: () => [],
  },
  columns: {
    type: Array as PropType<any>,
    default: () => [],
  },
  childrenProps: {
    type: Object as PropType<any>,
    default: () => ({}),
  },
  modelValue: {
    type: Object as PropType<any>,
    default: () => ({ pageNum: 0, pageSize: 20, total: 0 }),
  },
});
const emits = defineEmits(['update:modelValue', 'change-selection', 'change-page']);
const page = computed({
  get: () => props.modelValue,
  set: (val) => emits('update:modelValue', val),
});
const handleSelectionChange = (value: any) => {
  emits('change-selection', value);
};
const handleCurrentChange = () => {
  emits('change-page');
};

const handleSizeChange = () => {
  emits('change-page');
};
</script>

<style scoped lang="scss"></style>
