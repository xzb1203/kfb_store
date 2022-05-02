<template>
  <el-autocomplete
    v-model="formData"
    :fetch-suggestions="handleQuerySearch"
    popper-class="w-275px relative"
    :placeholder="placeholder"
    @select="handleSelect"
  >
    <template #default="{ item }">
      <div :class="['flex', 'items-center', item.top ? 'mt-40px' : '']">
        <div v-if="item.top" class="header-title">
          搜索到 <span class="text-blue-500">{{ total }}</span> 条信息
        </div>
        <slot :item="item"></slot>
        <div v-if="item.bottom && showMore" class="bottom-title">
          查看更多
          <el-icon><arrow-right /></el-icon>
        </div>
      </div>
    </template>
  </el-autocomplete>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue';
import { useRequest } from 'vue-request';
import { useUserStore } from '@/store/modules/login';

const storeInfo = computed(() => useUserStore().storeInfo);

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  showMore: {
    type: Boolean,
    default: false,
  },

  placeholder: {
    type: String,
    default: '',
  },
  api: {
    type: Function,
    default: null,
  },
});
const total = ref(0);
const emits = defineEmits(['update:modelValue', 'select']);
const formData = computed({
  get: () => props.modelValue,
  set: (val) => {
    emits('update:modelValue', val);
  },
});
const handleQuerySearch = (searchKeywords: string, cb: any) => {
  const data = {
    driverStatus: 1,
    searchKeywords: searchKeywords || 1,
    storeId: storeInfo.value.id,
  };
  useRequest(props.api(data), {
    onSuccess: (res: any) => {
      total.value = res.data.total;
      res.data.datas[0].top = true;
      res.data.datas[res.data.datas.length - 1].bottom = true;
      cb(res.data.datas);
    },
  });
};
const handleSelect = (item: any) => {
  emits('select', item);
};
</script>

<style scoped lang="scss">
.header-title {
  @apply absolute top-0 left-0 w-full z-50 bg-white py-2px pl-10px text-gray-500;
  border-bottom: 1px solid var(--el-border-color-light);
}
.bottom-title {
  @apply absolute bottom-0 left-0 w-full z-50 bg-white py-2px pl-10px text-gray-500 cursor-pointer text-blue-500;
  border-top: 1px solid var(--el-border-color-light);
}
</style>
