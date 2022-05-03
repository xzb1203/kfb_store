<template>
  <el-card class="mt-20px">
    <template #header> <span class="kl-card-title">订单备注</span> </template>
    <el-input v-model="orderRemark" type="textarea" rows="5" placeholder="请输入备注信息"></el-input>
  </el-card>
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
});
const emits = defineEmits(['update:modelValue']);
const orderRemark = computed({
  get: () => props.modelValue,
  set: (val: string) => emits('update:modelValue', val),
});
</script>

<style scoped></style>
