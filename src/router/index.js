import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => import('../views/app/home/Index.vue')
    },

      //Cars

    {
      path: '/cars',
      name: 'cars.index',
      component: () => import('../views/app/cars/IndexComponent.vue')
    },
    {
      path: '/cars/create',
      name: 'car.create',
      component: () => import('../views/app/cars/CreateComponent.vue')
    },
    {
      path: '/cars/edit/:id',
      name: 'car.edit',
      component: () => import('../views/app/cars/EditComponent.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return {top: 0}
  },
})

export default router
