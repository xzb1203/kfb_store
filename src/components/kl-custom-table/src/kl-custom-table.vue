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
          服务{{ item.orderServiceItems.projectDetails.map((item:any) => item.itemName) }} <br />
          商品{{ item.orderReplacementParts.projectDetails.map((item:any) => item.itemName) }}
          <!-- <div>暂无商品</div>
          <div>暂无服务</div> -->
        </div>
        <div w:flex="~ col" w:justify="center" w:text="left" w:w="130px">
          <p>客户:{{ item.driverUserName }}</p>
          <p>电话：{{ item.orderContactsPhone }}</p>
          <p>车牌或设备：{{ item.orderCarPlateNumber }}</p>
          <p>车型：{{ item.orderModelsName || '暂未选择' }}</p>
          <p>vin码: {{ item.vIN }}</p>
        </div>
        <div w:flex="~" w:align="items-center" w:justify="center" w:w="130px">
          <div>{{ item.orderFaultDescription || '暂无故障描述' }}</div>
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
});

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
