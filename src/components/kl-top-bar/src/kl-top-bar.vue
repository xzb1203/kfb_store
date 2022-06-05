<template>
  <div w:flex="~" w:justify="between" w:h="120px" w:mb="20px">
    <div class="left" w:h="full" w:flex="~" w:justify="between">
      <slot></slot>
    </div>
    <div w:flex="~ 1" w:justify="around" w:ml="20px" w:p="20px" w:bg="white" w:rounded="5px">
      <div v-for="item in list" w:flex="~ col" w:justify="between" w:min-w="150px" w:rounded="5px">
        <p class="kl-label">{{ item.label }}</p>
        <div w:flex="~" w:justify="between" w:align="items-center" w:mt="15px">
          <div w:mr="10px">
            <span>{{ item.unit }} </span>
            <span w:text="dark-500 1.625rem" w:font="bold">{{ item.value }}</span>
          </div>
          <tisp-svg :name="item.icon"></tisp-svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import TispSvg from '@/base-ui/tisp-svg';

defineProps({
  list: {
    type: Array as PropType<any>,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped></style>
