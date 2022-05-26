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
];

export default asyncRoutes;
