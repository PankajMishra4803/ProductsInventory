import Vue from 'vue'
import VueRouter from 'vue-router'
import DashBoard from '../views/DashBoard.vue'
import Registration from '../views/Registration.vue'
import Login from '../views/Login.vue'
import AcountDetails from '../views/AcountDetails.vue'
import AddProduct from '../views/AddProduct.vue'
import ProductDetails from '../views/ProductDetails.vue'

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
    component: Registration
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/viewAccount',
    name: 'AcountDetails',
    component: AcountDetails
  },
  {
    path: '/addProduct',
    name: 'AddProduct',
    component: AddProduct
  },
  {
    path: '/viewProduct/:id',
    name: 'ProductDetails',
    component: ProductDetails
  },
  {
    path: '/updateProduct/:id',
    name: 'ProductUpdate',
    component: AddProduct
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
