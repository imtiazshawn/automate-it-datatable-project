import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SearchStudents from '../views/Search.vue';
import FilterStudents from '../views/filter.vue'
import AppLayout from '@/layout/AppLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '/',
          component: HomeView
        },
        {
          path: '/search',
          component: SearchStudents
        },
        {
          path: '/filter',
          component: FilterStudents
        },
      ]
    }
  ]
})

export default router
