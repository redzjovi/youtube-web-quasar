import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/desktop',
    component: () => import('layouts/desktop/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'desktop',
        component: () => import('pages/desktop/IndexPage.vue'),
      },
    ],
  },
  {
    path: '/mobile',
    component: () => import('layouts/mobile/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'mobile',
        component: () => import('pages/mobile/IndexPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
