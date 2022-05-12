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
  <div v-if="showFooter" class="mt-15px flex justify-end">
    <el-pagination
      v-model:currentPage="page.currentPage"
      v-model:page-size="page.pageSize"
      :page-sizes="[10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="listCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
    </el-pagination>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

const emit = defineEmits(['selectionChange', 'update:page']);
const props = defineProps({
  showIndexColumn: {
    type: Boolean,
    default: false,
  },
  showSelectColumn: {
    type: Boolean,
    default: false,
  },
  showFooter: {
    type: Boolean,
    default: true,
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
    type: Object,
    default: () => ({}),
  },
  page: {
    type: Object,
    default: () => ({ currentPage: 0, pageSize: 10 }),
  },
  listCount: {
    type: Number,
    default: 0,
  },
});

const page = computed({
  get: () => props.page,
  set: (val) => emit('update:page', val),
});
const handleSelectionChange = (value: any) => {
  emit('selectionChange', value);
};
const handleCurrentChange = (currentPage: number) => {
  emit('update:page', { ...props.page, currentPage });
};

const handleSizeChange = (pageSize: number) => {
  emit('update:page', { ...props.page, pageSize });
};
</script>

<style scoped lang="scss"></style>
