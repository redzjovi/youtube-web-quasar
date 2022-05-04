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
      {
        path: '/results',
        name: 'desktop-results',
        component: () => import('pages/desktop/ResultsPage.vue'),
      },
    ],
  },
  {
    path: '/desktop/movie/:id',
    component: () => import('layouts/desktop/MovieDetailLayout.vue'),
    children: [
      {
        path: '',
        name: 'desktop-movie-detail',
        component: () => import('pages/desktop/MovieDetailPage.vue'),
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
  {
    path: '/mobile/movie/:id',
    component: () => import('layouts/mobile/MovieDetailLayout.vue'),
    children: [
      {
        path: '',
        name: 'mobile-movie-detail',
        component: () => import('pages/mobile/MovieDetailPage.vue'),
      },
    ],
  },
  {
    path: '/mobile/results',
    component: () => import('layouts/mobile/ResultsLayout.vue'),
    children: [
      {
        path: '',
        name: 'mobile-results',
        component: () => import('pages/mobile/ResultsPage.vue'),
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
