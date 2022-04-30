<template>
  <div>
    <div w:my="10px" w:bg="blue-50" w:flex="~" w:align="items-center" w:justify="around" w:h="40px" w:px="20px">
      <div v-for="item in headerColumns" w:text="center" w:w="130px">{{ item.label }}</div>
    </div>
    <div v-for="item in tableList" style="border: 1px solid var(--el-card-border-color)" w:mb="20px">
      <div w:h="32px" w:bg="blue-50" w:p="20px" w:flex="~" w:align="items-center" w:text="gray-500">
        <span>工单编号: {{ item.orderCode }}</span>
        <span w:ml="30px">开单时间: {{ item.orderAddTimeStr }}</span>
        <span w:ml="30px">预计完成时间: {{ item.orderEstimatedFinishTimeStr }}</span>
        <span w:ml="30px">负责人: 未知</span>
        <span w:ml="30px">车牌或设备: {{ item.carName }}</span>
      </div>
      <div w:w="full" w:flex="~" w:align="items-center" w:justify="around" w:p="20px">
        <div w:w="130px" w:text="center">
          <div>暂无商品</div>
          <div>暂无服务</div>
        </div>
        <div w:flex="~" w:justify="center" w:w="130px" w:text="center">
          <slot name="user" :scope="item"></slot>
        </div>
        <div w:flex="~" w:justify="center" w:w="130px" w:text="center">
          <slot name="fault" :scope="item"></slot>
        </div>
        <div w:text="center" w:w="130px">
          <p>￥{{ item.orderAmountsPayable || 0 }}</p>
          <p>当前金额</p>
        </div>
        <div w:w="130px" w:text="center" :class="getCurrentCorlor(item.orderStatus)">{{ item.orderStatusName }}</div>
        <div w:w="130px" w:text="center">
          <slot name="handle" :scope="item"></slot>
        </div>
      </div>
    </div>
    <div w:flex="~" w:justify="end" w:mt="10px">
      <el-pagination
        v-model:currentPage="paging.pageNum"
        v-model:page-size="paging.pageSize"
        layout="total,sizes, prev, pager, next"
        background
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

defineProps({
  headerColumns: {
    type: Array as PropType<any>,
    default: () => [],
  },
  tableList: {
    type: Array as PropType<any>,
    default: () => [],
  },
  total: {
    type: Number,
    default: 0,
  },
});
const paging = reactive({ pageNum: 1, pageSize: 20 });
const handleSizeChange = (val: number) => {
  console.log(val);
};
const handleCurrentChange = (val: number) => {
  console.log(val);
};
const getCurrentCorlor = (key: string) => {
  let color = '';
  switch (key) {
    // 进行中
    case '1':
      color = 'text-blue-500';
      break;
    case '2':
      // 已完成
      color = 'text-green-500';
      break;
    case '3':
      // 已作废
      color = 'text-red-500';
      break;
    case '4':
      // 待处理
      color = 'text-yellow-500';
      break;
    default:
      // 5已取消
      break;
  }
  return color;
};
</script>

<style item lang="scss">
:deep(.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell) {
  background: none !important;
}
</style>
