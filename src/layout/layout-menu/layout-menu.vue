<template>
  <div w:h="full">
    <el-menu
      unique-opened
      active-text-color="#ffd04b"
      background-color="#2F3035"
      :default-active="activeIndex"
      text-color="#fff"
      router
      w:w="full"
      w:h="full"
    >
      <template v-for="item in menus">
        <el-sub-menu v-if="item.children && item.children.length" :key="item.path" :index="item.path">
          <template #title>
            <!-- <el-icon :size="20">
              <component :is="item.icon.replace('el-icon-', '')"></component>
            </el-icon> -->
            <span>{{ item.name }}</span>
          </template>

          <template v-for="subitem in item.children" :key="item.path">
            <el-menu-item :index="subitem.path">
              {{ subitem.icon }}
              <!-- <el-icon v-if="subitem.icon">
                <component :is="subitem.icon.replace('el-icon-', '')"></component>
              </el-icon> -->
              <span>{{ subitem.name }}</span>
            </el-menu-item>
          </template>
        </el-sub-menu>
        <el-menu-item v-else :index="item.path">
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const activeIndex = computed(() => route.path);
const menus: any = ref([
  { icon: '', path: '/index', name: '首页' },
  {
    icon: '',
    path: '/order/index',
    name: '工单管理',
    children: [
      { path: '/order/index', name: '普通工单' },
      { path: '/order/warranty', name: '三包工单' },
    ],
  },
  {
    icon: '',
    path: '/goods',
    name: '商品管理',
    children: [
      { path: '/goods/index', name: '普通商品管理' },
      { path: '/goods/three', name: '三包商品管理' },
      { path: '/goods/allot', name: '商品调拨管理' },
      { path: '/goods/storage', name: '进出库管理' },
    ],
  },
  {
    icon: '',
    path: '/purchase',
    name: '采购管理',
    children: [
      { path: '/purchase/index', name: '采购管理' },
      { path: '/purchase/warning', name: '库存预警' },
    ],
  },
  {
    icon: '',
    path: '/parts/index',
    name: '汽配查询',
  },
  {
    icon: '',
    path: '/customer/index',
    name: '客户管理',
  },
  {
    icon: '',
    path: '/sales/index',
    name: '销售管理',
  },
  {
    icon: '',
    path: '/return/index',
    name: '退货管理',
  },
  {
    icon: '',
    path: '/supply/index',
    name: '供应管理',
  },
]);
</script>

<style scoped>
::deep(.el-menu-item, .el-sub-menu__title) {
  padding-left: 50px !important;
}
</style>
