import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router';

import Home from '@/views/home/index.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'index',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
});

export default router;
