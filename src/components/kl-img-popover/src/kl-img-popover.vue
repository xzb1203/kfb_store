<template>
  <div v-for="item in filterList" class="flex items-center">
    <el-image :src="item.itemImage" alt="" class="w-60px h-60px rounded-5px" />
  </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue';

const props = defineProps({
  list: {
    type: Array as PropType<any>,
    default: () => [],
  },
});
console.log(props.list);
const filterList = props.list.map((item: any) => ({
  ...item,
  itemImage: `${import.meta.env.VITE_PICTRUE_URL}productPicture/${item.itemImage}`,
}));
</script>

<style scoped></style>
