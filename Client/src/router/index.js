import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/HomePage'
import Register from '@/components/Accounts/Register'
import Login from '@/components/Accounts/Login'

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
    }
  ]
})
