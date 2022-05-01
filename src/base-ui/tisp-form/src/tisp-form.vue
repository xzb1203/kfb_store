<template>
  <div class="hy-form">
    <slot name="header"></slot>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col :span="8" v-bind="colLayout" :rules="item.rules" :style="colStyle">
            <el-form-item v-if="!item.isHidden" :label="item.label" :style="item.style" class="!flex !items-center">
              <template v-if="item.type === 'input' || item.type === 'password'">
                <el-input
                  v-model="formData[item.field]"
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
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
          </el-col>
        </template>
      </el-row>
    </el-form>
    <slot name="footer"></slot>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
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
const formData = ref(props.modelValue);
</script>

<style scoped lang="scss"></style>
