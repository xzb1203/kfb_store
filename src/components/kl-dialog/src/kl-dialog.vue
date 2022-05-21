<template>
  <el-dialog v-model="dialogVisible" :title="title" :width="width" center>
    <tisp-form v-bind="formConfig" ref="tispFormRef" v-model="formData">
      <slot></slot>
    </tisp-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleResetFields">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import TispForm from '@/base-ui/tisp-form';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  width: {
    type: String,
    default: '800px',
  },
  modelValue: {
    type: Object as PropType<any>,
    default: () => ({}),
  },
  formConfig: {
    type: Object,
    required: true,
  },
});
const emits = defineEmits(['handle-confim', 'update:modelValue']);
const formData = computed({
  get: () => props.modelValue,
  set: (val) => emits('update:modelValue', val),
});
const dialogVisible = ref(false);
const isConfirm = ref(false);
const tispFormRef = ref<InstanceType<typeof TispForm>>();

const handleResetFields = () => {
  dialogVisible.value = false;
  //   tispFormRef.value?.handleResetFields();
};
const handleConfirm = () => {
  dialogVisible.value = false;
  isConfirm.value = true;
  emits('handle-confim');
};

defineExpose({
  dialogVisible,
});
</script>

<style scoped lang="scss"></style>
