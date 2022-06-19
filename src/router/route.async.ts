// 需要鉴权的业务路由
import { RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue';

const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    meta: {
      title: '',
      icon: '',
    },
    component: Layout,
    redirect: '/index',
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/index/index.vue'),
      },
    ],
  },
  {
    path: '/order',
    meta: {
      title: '',
      icon: '',
    },
    component: Layout,
    redirect: '/order/index',
    children: [
      {
        path: 'index',
        name: 'orderIndex',
        component: () => import('@/views/order/index/index.vue'),
      },
      {
        path: 'index/serve',
        name: 'orderServe',
        component: () => import('@/views/order/index/serve.vue'),
      },
      {
        path: 'warranty',
        name: 'orderWarranty',
        component: () => import('@/views/order/warranty/index.vue'),
      },
      {
        path: 'detail',
        name: 'orderDetail',
        component: () => import('@/views/order/detail/index.vue'),
      },
    ],
  },
  {
    path: '/goods',
    meta: {
      title: '',
      icon: '',
    },
    component: Layout,
    redirect: '/order/index',
    children: [
      {
        path: 'index',
        name: 'goodsIndex',
        component: () => import('@/views/goods/index/index.vue'),
      },
      {
        path: 'three',
        name: 'goodsThree',
        component: () => import('@/views/goods/three/index.vue'),
      },
      {
        path: 'allot',
        name: 'goodsAllot',
        component: () => import('@/views/goods/allot/index.vue'),
      },
      {
        path: 'storage',
        name: 'goodsStorage',
        component: () => import('@/views/goods/storage/index.vue'),
      },
    ],
  },
  {
    path: '/purchase',
    meta: {
      title: '',
      icon: '',
    },
    component: Layout,
    redirect: '/purchase/index',
    children: [
      {
        path: 'index',
        name: 'purchaseIndex',
        component: () => import('@/views/purchase/index/index.vue'),
      },
      {
        path: 'offline/index',
        name: 'purchaseOfflineIndex',
        component: () => import('@/views/purchase/offline/index.vue'),
      },
      {
        path: 'online/index',
        name: 'purchaseOnlineIndex',
        component: () => import('@/views/purchase/online/index.vue'),
      },
      {
        path: 'offline/detail',
        name: 'purchaseOfflineDetail',
        component: () => import('@/views/purchase/offline/detail.vue'),
      },
      {
        path: 'online/detail',
        name: 'purchaseOnlineDetail',
        component: () => import('@/views/purchase/online/detail.vue'),
      },

      {
        path: 'warning',
        name: 'purchaseWarning',
        component: () => import('@/views/purchase/warning/index.vue'),
      },
    ],
  },
  {
    path: '/parts',
    meta: {
      title: '',
      icon: '',
    },
    component: Layout,
    redirect: '/parts/index',
    children: [
      {
        path: 'index',
        name: 'partsIndex',
        component: () => import('@/views/parts/index.vue'),
      },
    ],
  },
  {
    path: '/customer',
    meta: {
      title: '',
      icon: '',
    },
    component: Layout,
    redirect: '/customer/index',
    children: [
      {
        path: 'index',
        name: 'customerIndex',
        component: () => import('@/views/customer/index.vue'),
      },
    ],
  },
  {
    path: '/sales',
    meta: {
      title: '',
      icon: '',
    },
    component: Layout,
    redirect: '/sales/index',
    children: [
      {
        path: 'index',
        name: 'salesIndex',
        component: () => import('@/views/sales/index.vue'),
      },
    ],
  },
  {
    path: '/return',
    meta: {
      title: '',
      icon: '',
    },
    component: Layout,
    redirect: '/return/index',
    children: [
      {
        path: 'index',
        name: 'returnIndex',
        component: () => import('@/views/return/index.vue'),
      },
    ],
  },
  {
    path: '/supply',
    meta: {
      title: '',
      icon: '',
    },
    component: Layout,
    redirect: '/supply/index',
    children: [
      {
        path: 'index',
        name: 'supplyIndex',
        component: () => import('@/views/supply/index.vue'),
      },
    ],
  },
  {
    path: '/financial',
    meta: {
      title: '',
      icon: '',
    },
    component: Layout,
    redirect: '/financial/chart',
    children: [
      {
        path: 'chart',
        name: 'financialChart',
        component: () => import('@/views/financial/chart/index.vue'),
      },
      {
        path: 'bop',
        name: 'financialBop',
        component: () => import('@/views/financial/bop/index.vue'),
      },
      {
        path: 'bill',
        name: 'financialBill',
        component: () => import('@/views/financial/bill/index.vue'),
      },
      {
        path: 'integral',
        name: 'financialIntegral',
        component: () => import('@/views/financial/integral/index.vue'),
      },
    ],
  },
  {
    path: '/system',
    meta: {
      title: '',
      icon: '',
    },
    component: Layout,
    redirect: '/system/price',
    children: [
      {
        path: 'price',
        name: 'systemPrice',
        component: () => import('@/views/system/price/index.vue'),
      },
      {
        path: 'permission',
        name: 'systemPermission',
        component: () => import('@/views/system/permission/index.vue'),
      },
    ],
  },
];

export default asyncRoutes;
