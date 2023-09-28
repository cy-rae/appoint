import {RouteRecordRaw} from 'vue-router';
import {PagePaths} from 'src/enums/PagePaths';

const routes: RouteRecordRaw[] = [
  {
    path: PagePaths.MAIN,
    component: () => import('layouts/MainLayout.vue')
  },
  {
    path: PagePaths.NEW_CALENDAR,
    component: () => import('layouts/NewCalendarLayout.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/main/ErrorNotFound.vue'),
  },
];

export default routes;
