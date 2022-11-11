import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LogIn from '../components/LogIn'
import FacebookGoogle from '../components/FacebookGoogle'
import RegisterPage from '../components/RegisterPage'
import PrivacyPolicy from '../views/PrivacyPolicy.vue';
import TermsConditions from '../views/TermsConditions.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: LogIn
  },
  {
    path: '/registerpage',
    name: 'registerpage',
    component: RegisterPage
  },
  {
    path: '/facebookgoogle',
    name: 'facebookgoogle',
    component: FacebookGoogle
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: PrivacyPolicy
  },
  {
    path: '/terms',
    name: 'terms',
    component: TermsConditions
  }
]

const router = new VueRouter({
  routes
})

export default router
