<template>
  <div class="relative">
    <el-popover placement="left" :width="200" trigger="hover">
      <template #reference>
        <el-button text :icon="Menu" type="primary" plain class="absolute top-0 h-40px right-0 z-50"></el-button>
      </template>
      <p class="text-yellow-500 text-12px mb-10px">*提示: 拖动以排序</p>
      <vue-draggable-next v-model="columns" class="flex flex-col">
        <div v-for="item in columns" :key="item.props" class="cursor-move">
          <el-checkbox v-model="item.show" :label="item.label"></el-checkbox>
        </div>
      </vue-draggable-next>
    </el-popover>
    <el-table
      :key="columns"
      :data="data"
      style="width: 100%"
      v-bind="childrenProps"
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="showSelectColumn" type="selection" align="center" width="60"></el-table-column>
      <el-table-column v-if="showIndexColumn" type="index" label="序号" align="center" width="80"></el-table-column>
      <template v-for="item in columns" :key="item.prop">
        <el-table-column v-if="item.show" v-bind="item" align="center">
          <template #default="scope">
            <slot :name="item.slotName" :row="scope.row">
              {{ scope.row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
  <div v-if="showPage" class="mt-15px flex justify-end">
    <el-pagination
      v-model:currentPage="params.pageNum"
      v-model:page-size="params.pageSize"
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
import { VueDraggableNext } from 'vue-draggable-next';
import { Menu } from '@element-plus/icons-vue';
import localCache from '@/utils/cache';

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
  params: {
    type: Object as PropType<any>,
    default: () => ({}),
  },
});
const emits = defineEmits(['change-selection', 'change-page']);

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
