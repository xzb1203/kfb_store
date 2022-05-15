<template>
  <div>
    <div w:my="10px" w:bg="[#F5F8FD]" w:flex="~" w:align="items-center" w:justify="around" w:h="40px" w:px="20px">
      <div v-for="item in headerColumns" w:text="center" w:w="200px">{{ item.label }}</div>
    </div>
    <div v-for="item in tableList" style="border: 1px solid var(--el-card-border-color)" w:mb="20px" w:rounded="5px">
      <div
        w:h="32px"
        w:p="20px"
        w:flex="~"
        w:align="items-center"
        w:text="gray-500"
        style="border-bottom: 1px solid var(--el-card-border-color)"
      >
        <span>工单编号: {{ item.orderCode }}</span>
        <span w:ml="30px">开单时间: {{ item.orderAddTimeStr }}</span>
        <span w:ml="30px">预计完成时间: {{ item.orderEstimatedFinishTimeStr }}</span>
        <span w:ml="30px">负责人: {{ item.orderResponsible[0]?.orderResponsibleName }}</span>
        <span w:ml="30px">车牌或设备: {{ item.carName }}</span>
      </div>
      <div w:w="full" w:flex="~" w:align="items-center" w:justify="around" w:p="20px">
        <div w:text="center" w:w="200px">
          <div w:flex="~" w:text="center">
            <div v-if="item.orderReplacementParts.projectDetails.length" w:flex="~" class="whitespace-nowrap">
              <div v-for="item2 in item.orderReplacementParts.projectDetails">{{ item2.itemName }},</div>
              <span
                >等
                <span class="text-blue-500">{{ item.orderReplacementParts.projectDetails.length }} </span> 件商品</span
              >
            </div>
            <span v-else>暂无配件</span>
          </div>
          <div w:flex="~" w:text="center">
            <div v-if="item.orderServiceItems.projectDetails.length" w:flex="~" class="whitespace-nowrap">
              <div v-for="item2 in item.orderServiceItems.projectDetails">{{ item2.itemName }},</div>
              <span
                >等
                <span class="text-blue-600">{{ item.orderReplacementParts.projectDetails.length }}</span> 项服务</span
              >
            </div>
            <span v-else>暂无服务</span>
          </div>
        </div>
        <div w:flex="~ col" w:justify="center" w:text="left" w:w="200px">
          <p>客户:{{ item.driverUserName }}</p>
          <p>电话：{{ item.orderContactsPhone }}</p>
          <p>车牌或设备：{{ item.orderCarPlateNumber }}</p>
          <p>车型：{{ item.orderModelsName || '暂未选择' }}</p>
          <p>vin码: {{ item.vIN }}</p>
        </div>
        <div w:flex="~" w:align="items-center" w:justify="center" w:w="200px">
          <div>{{ item.orderFaultDescription || '暂无故障描述' }}</div>
        </div>
        <div w:text="center" w:w="200px">
          <p>￥{{ item.orderAmountsPayable || 0 }}</p>
          <p>当前金额</p>
        </div>
        <div w:w="200px" w:text="center" :class="getCurrentCorlor(item.orderStatus)">{{ item.orderStatusName }}</div>
        <div w:w="200px" w:text="center">
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
