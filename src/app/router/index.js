import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from './guards'
import LoginPage from '../../modules/auth/pages/LoginPage.vue'
import HomePage from '../../modules/home/pages/HomePage.vue'
import AuthLayout from '../../layouts/AuthLayout.vue'
import AppLayout from '../../layouts/AppLayout.vue'

const routes = [
  {
    path: '/login',
    component: AuthLayout,
    children: [
      {
        path: '',
        name: 'login',
        component: LoginPage,
        meta: { guestOnly: true },
      },
    ],
  },
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: HomePage,
        meta: { requiresAuth: true },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(authGuard)

export default router
