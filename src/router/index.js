import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthRouter from './auth'

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import(/* webpackChunkName: "Index" */ '@/views/index.vue')
    // component: () => import(/* webpackChunkName: "Index" */ '@/views/testDemo/index2.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '@/views/login/index.vue')
  },
  {
    path: '/403',
    name: '403',
    component: () => import(/* webpackChunkName: "403" */ '@/views/empty/403.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/empty/404.vue')
  },
  {
    path: '/layout',
    name: 'Layout',
    redirect: '/layout/home',
    component: () => import(/* webpackChunkName: "Layout" */ '@/views/layout.vue'),
    meta: {
      requireAuth: true
    },
    children: AuthRouter
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
