<template>
  <div class="hy-form">
    <slot name="header"></slot>
    <el-form ref="formRef" :label-width="labelWidth" :model="formData">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col :span="8" v-bind="colLayout" :rules="item.rules" :style="colStyle">
            <template v-if="item.type === 'slot'">
              <slot></slot>
            </template>
            <template v-else>
              <el-form-item
                v-if="!item.isHidden"
                :prop="item.field"
                :label="item.label"
                :style="item.style"
                class="!flex !items-center"
              >
                <template v-if="item.type === 'input' || item.type === 'password'">
                  <el-input
                    v-model="formData[item.field]"
                    :placeholder="item.placeholder"
                    :show-password="item.type === 'password'"
                    v-bind="item.otherOptions"
                  ></el-input>
                </template>
                <template v-else-if="item.type === 'select'">
                  <el-select v-model="formData[item.field]" :placeholder="item.placeholder" class="w-full">
                    <el-option v-for="option in item.options" :label="option.title" :value="option.value">
                      {{ option.title }}
                    </el-option>
                  </el-select>
                </template>
                <template v-else-if="item.type === 'datepicker'">
                  <el-date-picker
                    v-model="formData[item.field]"
                    style="width: 100%"
                    v-bind="item.otherOptions"
                  ></el-date-picker>
                </template>
              </el-form-item>
            </template>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <slot name="footer"></slot>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import type { ElForm } from 'element-plus';
import { IFormItem } from './type';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  formItems: {
    type: Array as PropType<IFormItem[]>,
    default: () => [],
  },
  labelWidth: {
    type: String,
    default: '100px',
  },
  colStyle: {
    type: Object,
    default: () => ({ padding: '0 10px' }),
  },
  formItemStyle: {
    type: Object,
    default: () => ({}),
  },
  colLayout: {
    type: Object,
    default: () => ({
      xl: 6, // >1920px 4个
      lg: 8,
      md: 12,
      sm: 24,
      xs: 24,
    }),
  },
});
const emits = defineEmits(['update:modelValue']);
const formData = computed({
  get: () => props.modelValue,
  set: (val) => emits('update:modelValue', val),
});
const formRef = ref<InstanceType<typeof ElForm>>();
function handleResetFields() {
  formRef.value?.resetFields();
}
defineExpose({
  handleResetFields,
});
</script>

<style scoped lang="scss"></style>
