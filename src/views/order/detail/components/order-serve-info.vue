<template>
  <el-card class="mt-20px">
    <template #header>
      <div class="flex justify-between items-center">
        <span class="kl-card-title">服务信息</span>
        <div>
          <el-switch v-model="value1" active-text="添加作业人员" />
          <el-button :icon="CirclePlus" type="primary" plain class="ml-20px">新增服务</el-button>
        </div>
      </div>
    </template>
    <div class="flex">
      {{ orderServiceItems.detailStageAmountType }}
      <el-tabs v-model="orderServiceItems.detailStageAmountType" tab-position="left">
        <el-tab-pane name="1" label="分开结算"></el-tab-pane>
        <el-tab-pane name="0" label="合并结算"></el-tab-pane>
      </el-tabs>
      <div class="w-full">
        <el-table :data="orderServiceItems.projectDetails" style="width: 100%">
          <el-table-column prop="date" label="服务名称" align="center">
            <template #default="{ row }">
              <!-- <el-autocomplete
                v-model="row.itemName"
                :fetch-suggestions="querySearch"
                popper-class="my-autocomplete"
                placeholder="请输入服务名称"
                @select="handleSelect"
              >
                <template #default="{ item }">
                  <div>{{ item.value }}</div>
                  <span>{{ item.link }}</span>
                </template>
              </el-autocomplete> -->
              <kl-autocomplete
                v-model="row.itemName"
                placeholder="客户名称"
                :api="goodsApi.postServiceList"
                :api-params="apiParams"
                :show-more="false"
                @select="handleSelect"
              >
                <template #default="{ item }">
                  <div class="flex flex-col w-full" style="border-bottom: 1px dashed var(--el-border-color-light)">
                    <div>
                      <span class="font-bold">名称: </span>
                      <span class="truncation">{{ item.serviceName }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span>
                        <span class="font-bold">工时: </span> <span>{{ item.serviceWorkHour }} 小时</span>
                      </span>
                      <span>
                        <span class="font-bold">￥: </span> <span>{{ item.serviceAmount || 0.0 }}</span>
                      </span>
                    </div>
                  </div>
                </template>
              </kl-autocomplete>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="服务价格 / 元" align="center">
            <template #default="{ row }">
              <el-input-number v-model="row.itemUnitPrice" :min="0" controls-position="right" />
            </template>
          </el-table-column>
          <el-table-column prop="date" label="服务工时 / 小时" align="center">
            <template #default="{ row }">
              <el-input-number v-model="row.workHour" :min="0" controls-position="right" />
            </template>
          </el-table-column>
          <el-table-column prop="date" label="作业人员" align="center">
            <template #default="{ row }">
              <div v-for="item2 in row.workHourServices">
                {{ getUserName(item2.userId) }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="工时分成" align="center">
            <template #default="{ row }">
              <div v-for="item2 in row.workHourServices" class="flex items-center">
                <el-slider v-model="item2.allocationProportion" class="!h-28px" />
                <span class="whitespace-nowrap ml-10px">{{ item2.allocationProportion }}%</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="操作" align="center">
            <template #default="{ row }">
              <el-button type="text" :icon="Edit">编辑</el-button>
              <el-button type="text" :icon="Delete">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="text-right mt-20px">
          <span class="kl-label">小计:</span>
          <span class="text-red-500 ml-10px">¥ 0.00</span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { CirclePlus, Edit, Delete } from '@element-plus/icons-vue';
import { PropType } from 'vue';
import type { orderServiceItemsType, optionsType } from '../orderDetailType';
import KlAutocomplete from '@/components/kl-autocomplete';
import goodsApi from '@/api/modules/goods';
import { useUserStore } from '@/store/modules/login';

const props = defineProps({
  modelValue: {
    type: Object as PropType<orderServiceItemsType>,
    default: () => ({}),
  },
  staffOptions: {
    type: Array as PropType<optionsType[]>,
    default: () => [],
  },
});
const orderServiceItems = computed<orderServiceItemsType>(() => props.modelValue);
const storeInfo = computed(() => useUserStore().storeInfo);
// 搜索关键词参数
const apiParams = {
  pageSize: 999,
  searchKeywords: '',
  storeId: storeInfo.value.id,
};
const value1 = ref(true);

const getUserName = (id: string) => {
  return props.staffOptions.find((item: optionsType) => item.value === id)?.label;
};
const querySearch = () => {
  console.log(123);
};
const handleSelect = () => {
  console.log('sousuo');
};
</script>

<style scoped></style>
