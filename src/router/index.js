import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import Auth from '@/page/Auth'
import Order from '@/page/Order'
import CreateOrder from '@/page/Order/CreateOrder'
import DetailOrder from '@/page/Order/DetailOrder'
import UserRegister from '@/page/User/Register'
import User from '@/page/User'
import Menu from '@/page/Menu'
import Dashboard from '@/page/Dashboard'
import NotFound from '@/page/Error/404'
import UnauthorizeAccess from '@/page/Error/401'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/auth',
      name: 'Auth',
      component: Auth,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: '/',
      name: 'Order',
      component: Order,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/createOrder',
      name: 'CreateOrder',
      component: CreateOrder,
      meta: {
        requiresAuth: true,
        roles: ['administrator', 'waiter', 'pelanggan']
      }
    },
    {
      path: '/order/:id',
      name: 'DetailOrder',
      component: DetailOrder,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/user',
      name: 'User',
      component: User,
      meta: {
        requiresAuth: true,
        roles: ['administrator']
      }
    },
    {
      path: '/userRegister',
      name: 'UserRegister',
      component: UserRegister,
      meta: {
        requiresAuth: true,
        roles: ['administrator', 'waiter', 'kasir']
      }
    },
    {
      path: '/Menu',
      name: 'Menu',
      component: Menu,
      meta: {
        requiresAuth: true,
        roles: ['administrator']
      }
    },
    {
      path: '/Dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true,
        roles: ['administrator', 'owner']
      }
    },
    {
      path: '/404',
      name: 'NotFound',
      component: NotFound,
    },
    {
      path: '/401',
      name: 'UnauthorizeAccess',
      component: UnauthorizeAccess
    },
    {
      path: '*',
      redirect: '/404'
    },
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['auth/isAuthenticated']

  if (to.meta.requiresGuest && isAuthenticated) {
    return next('/')
  }

  if (!to.meta.requiresAuth) {
    return next()
  }

  if (!isAuthenticated) {
    return next('/auth')
  }

  if (!to.meta.roles) {
    return next()
  }

  const role = store.getters['auth/role']
  if (to.meta.roles.includes(role)) {
    return next()
  }

  return next('/401')
})

export default router