import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Singupadmin from '../views/SingUp.vue'
import Dashboard from '../views/Dashboard'
import Home from '../components/Home.vue'
import Loader from '../components/Loader.vue'
import Upload from '../components/Upload.vue'
import Pickup from '../components/Pickup'
import Overview from '../components/Overview'
import Delivery from '../components/Delivery'
import Athub from '../components/AtHub.vue'
import Adduser from '../components/AddUser.vue'
import Users from '../components/UsersGestion.vue'
import UserAdmin from '../components/AddUserAdmin.vue'
import Addhub from '../components/AddHub.vue'
import SwitchHub from '../components/SwitchHub.vue'
import Lost from '../components/Lost.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    component: Dashboard,
    beforeEnter (to, from, next) {
      if (document.cookie.indexOf('token') !== -1 && document.cookie.split('; ').find(c => c.startsWith('token')).split('=')[1]) {
        next()
      } else {
        next('/login')
      }
    },
    children: [
      {
        path: '',
        redirect: { name: 'Home' }
      },
      {
        path: 'home',
        name: 'Home',
        component: Home
      },
      {
        path: 'upload',
        name: 'Upload',
        component: Upload
      },
      {
        path: 'pickup',
        name: 'Pickup',
        component: Pickup
      },
      {
        path: 'overview',
        name: 'Overview',
        component: Overview
      },
      {
        path: 'delivery',
        name: 'Delivery',
        component: Delivery
      },
      {
        path: 'athub',
        name: 'Athub',
        component: Athub
      },
      {
        path: 'lost',
        name: 'Lost',
        component: Lost
      },
      {
        path: 'adduser',
        name: 'AddUser',
        component: Adduser
      },
      {
        path: 'adduseradmin',
        name: 'UserAdmin',
        component: UserAdmin

      },
      {
        path: 'addhub',
        name: 'AddHub',
        component: Addhub
      },
      {
        path: 'switch',
        name: 'switchhub',
        component: SwitchHub
      },
      {
        path: 'users',
        name: 'Users',
        component: Users
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/singupadmin',
    name: 'Singup',
    component: Singupadmin
  },
  {
    path: '/loader',
    name: 'Loader',
    component: Loader
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
