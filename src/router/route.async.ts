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
        path: 'warranty',
        name: 'warranty',
        component: () => import('@/views/order/warranty/index.vue'),
      },
      {
        path: 'create',
        name: 'create',
        component: () => import('@/views/order/create/index.vue'),
      },
    ],
  },
];

export default asyncRoutes;
