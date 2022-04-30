<template>
  <el-table-column
    :type="column?.type || undefined"
    :label="column?.label || undefined"
    :class="column?.className || undefined"
    :label-class-name="column?.labelClassName || undefined"
    :prop="column?.prop || undefined"
    :width="column?.width || undefined"
    :min-width="column?.minWidth || undefined"
    :sortable="column?.sortable || undefined"
    :sort-method="column?.sortMethod || undefined"
    :sort-by="column?.sortBy || undefined"
    :column-key="column?.columnKey || undefined"
    :align="column?.align || undefined"
    :header-align="column?.headerAlign || undefined"
    :show-tooltip-when-overflow="column?.showTooltipWhenOverflow || undefined"
    :show-overflow-tooltip="column?.showOverflowTooltip || undefined"
    :fixed="column?.fixed || undefined"
    :selectable="column?.selectable || undefined"
    :reserve-selection="column?.reserveSelection || undefined"
    :filter-method="column?.filterMethod || undefined"
    :filtered-value="column?.filteredValue || undefined"
    :filters="(column?.filters as unknown as {text: string, value: string}[]) || undefined"
    :filter-placement="column?.filterPlacement || undefined"
    :filter-multiple="column?.filterMultiple || undefined"
    :index="column?.index || undefined"
    :sort-orders="column?.sortOrders || undefined"
    :resizable="(border || false) && column.resizable"
  >
    <template v-if="column.headerRender" #header="scope">
      <header-render :render-function="column.headerRender" :scope="scope" />
    </template>
    <template v-if="column.children && column.children.length > 0">
      <tisp-table-column v-for="child in column.children" :column="child" :border="border"></tisp-table-column>
    </template>

    <template v-if="column.render && !(column.children && column.children.length > 0)" #default="scope">
      <render-component :render-function="column.render" :scope="scope" />
    </template>
    <template v-else-if="column.formatter && !(column.children && column.children.length > 0)" #default="scope">
      <span v-html="column.formatter(scope.row, column)"></span>
    </template>
    <template v-else-if="!(column.children && column.children.length > 0)" #default="scope">
      {{ scope.row[column.prop] }}
    </template>
  </el-table-column>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import { ElTableColumn } from 'element-plus'
import { TispTableColumn as TispTableColumnType } from './tisp-table'
import RenderComponent from './render-component.vue'
import HeaderRender from './header-render.vue'

defineProps({
  border: {
    type: Boolean,
    default: false,
  },
  column: {
    type: Object as PropType<TispTableColumnType>,
    required: true,
  },
})
</script>
