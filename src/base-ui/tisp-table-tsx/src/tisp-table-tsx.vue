<template>
  <el-table
    ref="elTableRef"
    w:w="full"
    :data="data"
    :size="tableOptions?.size || undefined"
    :height="tableOptions?.height || undefined"
    :max-height="tableOptions?.maxHeight || undefined"
    :fit="tableOptions?.fit || undefined"
    :stripe="tableOptions?.stripe || undefined"
    :border="tableOptions?.border || undefined"
    :row-key="tableOptions?.rowKey || undefined"
    :show-header="tableOptions?.showHeader || undefined"
    :show-summary="tableOptions?.showSummary || undefined"
    :sum-text="tableOptions?.sumText || undefined"
    :summary-method="tableOptions?.summaryMethod || undefined"
    :row-class-name="tableOptions?.rowClassName || undefined"
    :row-style="tableOptions?.rowStyle || undefined"
    :cell-class-name="tableOptions?.cellClassName || undefined"
    :cell-style="tableOptions?.cellStyle || undefined"
    :header-row-class-name="tableOptions?.headerRowClassName || undefined"
    :header-row-style="tableOptions?.headerRowStyle || undefined"
    :header-cell-class-name="tableOptions?.headerCellClassName || undefined"
    :header-cell-style="tableOptions?.headerCellStyle || undefined"
    :highlight-current-row="tableOptions?.highlightCurrentRow || undefined"
    :current-row-key="tableOptions?.currentRowKey || undefined"
    :empty-text="tableOptions?.emptyText || undefined"
    :expand-row-keys="tableOptions?.expandRowKeys || undefined"
    :default-expand-all="tableOptions?.defaultExpandAll || undefined"
    :default-sort="tableOptions?.defaultSort || undefined"
    :tooltip-effect="tableOptions?.tooltipEffect || undefined"
    :span-method="tableOptions?.spanMethod || undefined"
    :select-on-indeterminate="tableOptions?.selectOnIndeterminate || undefined"
    :indent="tableOptions?.indent || undefined"
    :tree-props="tableOptions?.treeProps || undefined"
    :lazy="tableOptions?.lazy || undefined"
    :load="tableOptions?.load || undefined"
    :style="tableOptions?.style || undefined"
    @select="onSelect"
    @select-all="onSelectAll"
    @current-change="onCurrentChange"
    @expand-change="onExpandChange"
  >
    <el-table-column v-if="tableColumnOptions.selection" type="selection" width="55"></el-table-column>
    <el-table-column
      v-if="tableColumnOptions.index"
      type="index"
      label="序号"
      width="55"
      :fixed="tableColumnOptions.indexFixed"
    ></el-table-column>
    <tisp-table-column v-for="column in columns" :column="column" :border="tableOptions.border"></tisp-table-column>
  </el-table>
</template>
<script setup lang="ts">
import { computed, PropType, ref, watch, nextTick } from 'vue';
import { ElTable, ElTableColumn } from 'element-plus';
import {
  ColumnOptionsType,
  TispTableColumn as TispTableColumnType,
  TispTableOptions,
  TispTableType,
} from './tisp-table';
import TispTableColumn from './tisp-table-column.vue';

const props = defineProps({
  data: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  options: {
    type: Object as PropType<TispTableOptions>,
    default: () => ({}),
  },
  columnOptions: {
    type: Object as PropType<ColumnOptionsType>,
    default: () => ({}),
  },
  columns: {
    type: Array as PropType<TispTableColumnType[]>,
    required: true,
  },
});
const emits = defineEmits(['selections-change', 'current-change', 'expand-change']);

type ElTableType = InstanceType<typeof ElTable>;
const elTableRef = ref<ElTableType | null>(null);
const selections = ref<any[]>([]);

const tableOptions = computed(
  () =>
    ({
      rowKey: 'id',
      ...props.options,
    } as unknown as ElTableType),
);
const tableColumnOptions = computed(
  () =>
    ({
      selection: false,
      selectKey: 'id',
      index: false,
      indexFixed: false,
      ...props.columnOptions,
    } as ColumnOptionsType),
);

const onSelect = (selection: any, row: any) => {
  selections.value = [
    ...selections.value.filter(
      (item: any) =>
        !props.data.find(
          (v: any) =>
            v[tableColumnOptions.value.selectKey || 'id'] === item[tableColumnOptions.value.selectKey || 'id'],
        ),
    ),
    ...selection,
  ];

  emits('selections-change', selections.value);
};
const onSelectAll = (selection: any) => {
  if (selection.length === 0) {
    selections.value = [
      ...selections.value.filter(
        (item: any) =>
          !props.data.find(
            (v: any) =>
              v[tableColumnOptions.value.selectKey || 'id'] === item[tableColumnOptions.value.selectKey || 'id'],
          ),
      ),
    ];
  } else {
    selections.value = [...selections.value, ...selection].reduce((list, row) => {
      if (
        list.findIndex(
          (item: any) =>
            item[tableColumnOptions.value.selectKey || 'id'] === row[tableColumnOptions.value.selectKey || 'id'],
        ) < 0
      ) {
        list.push(row);
      }
      return list;
    }, []);
  }

  emits('selections-change', selections.value);
};

const onToggleSelection = () => {
  if (selections.value.length > 0) {
    if (props.data && props.data.length > 0) {
      props.data.forEach((item, index) => {
        const tempIndex = selections.value.findIndex(
          (row: any) =>
            row[tableColumnOptions.value.selectKey || 'id'] === item[tableColumnOptions.value.selectKey || 'id'],
        );
        props.data && elTableRef.value?.toggleRowSelection(props.data[index], tempIndex >= 0);
      });
    }
  } else {
    elTableRef.value?.clearSelection();
  }
};

const setCurrentRow = (row?: any) => {
  elTableRef.value?.setCurrentRow(row);
};
const onCurrentChange = (row: any) => {
  emits('current-change', row);
};
const onExpandChange = (row: any, expanded: boolean) => {
  emits('expand-change', { id: row[(tableOptions.value.rowKey as string) || 'id'], expanded });
};
const toggleRowSelection = (row: any, selected = true) => {
  nextTick(() => {
    elTableRef.value?.toggleRowSelection(row, selected);
  });
};
const clearSelection = () => {
  elTableRef.value?.clearSelection();
  selections.value = [];
  emits('selections-change', selections.value);
};

const clearFilter = (columnKey: string[] = []) => {
  if (columnKey.length > 0) {
    elTableRef.value?.clearFilter(columnKey);
  } else {
    // ts-ignore
    elTableRef.value?.clearFilter([]);
  }
};

defineExpose<TispTableType>({
  setCurrentRow,
  toggleRowSelection,
  clearSelection,
  clearFilter,
});
watch(
  () => props.data,
  () => {
    nextTick(() => {
      onToggleSelection();
    });
  },
  {
    deep: true,
  },
);
</script>
