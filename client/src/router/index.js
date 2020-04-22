import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PageSignup from '../views/PageSignup'
import PageSignin from '../views/PageSignin'
import PageAdmin from '../views/PageAdmin'
import AddProduct from '../components/AddProduct'
import EditProduct from '../components/EditProduct'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/signup',
    name: 'PageSignup',
    component: PageSignup
  },
  {
    path: '/signin',
    name: 'PageSignin',
    component: PageSignin
  },
  {
    path: '/pageAdmin',
    name: 'PageAdmin',
    component: PageAdmin,
    children: [
      {
          path: '/addProduct',
          name: 'AddProduct',
          component: AddProduct
      },
      {
          path: '/editProduct',
          name: 'EditProduct',
          component: EditProduct,
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
