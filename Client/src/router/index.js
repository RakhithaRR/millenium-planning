import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/HomePage'
import Register from '@/components/Accounts/Register'
import Login from '@/components/Accounts/Login'
import Profile from '@/components/Accounts/Profile'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },

    {
      path: '/register',
      name: 'Register',
      component: Register
    },

    {
      path: '/login',
      name: 'Login',
      component: Login
    },

    {
      path: '/profile/:id',
      name: 'Profile',
      component: Profile
    },
  ]
})
