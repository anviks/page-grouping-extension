import { createRouter, createWebHashHistory } from 'vue-router';
import PageGroupForm from '@/views/PageGroupForm.vue';
import Home from '@/views/Home.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/page-group/add',
      name: 'AddGroup',
      component: PageGroupForm,
    },
    {
      path: '/page-group/edit/:id',
      name: 'EditGroup',
      component: PageGroupForm,
    },
  ],
});

export default router;
