import Vue from 'vue'
import VueRouter from 'vue-router'
import DashBoard from '../views/DashBoard.vue'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'dashBoard',
    component: DashBoard
  },
  {
    path: '/registration',
    name: 'Registration',
    component: () => import('../views/Registration.vue' )
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/viewAccount',
    name: 'AcountDetails',
    component: () => import('../views/AcountDetails.vue')
  },
  {
    path: '/addProduct',
    name: 'AddProduct',
    component: () => import( '../views/AddProduct.vue')
  },
  {
    path: '/viewProduct/:id',
    name: 'ProductDetails',
    component: () => import('../views/ProductDetails.vue')
  },
  {
    path: '/updateProduct/:id',
    name: 'ProductUpdate',
    component: () => import('../views/AddProduct.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
