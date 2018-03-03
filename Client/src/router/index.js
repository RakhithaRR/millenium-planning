import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/HomePage'
import Register from '@/components/Accounts/Register'
import Login from '@/components/Accounts/Login'
import Profile from '@/components/Accounts/Profile'
import AddProject from '@/components/Projects/AddProject'
import SearchProjects from '@/components/Projects/SearchProjects'
import ViewProjects from '@/components/Projects/ViewProjects'
import EditProjects from '@/components/Projects/EditProjects'

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

    {
      path: '/addproject',
      name: 'AddProject',
      component: AddProject
    },

    {
      path: '/searchProjects',
      name: 'SearchProjects',
      component: SearchProjects
    },

    {
      path: '/projects/:id',
      name: 'ViewProjects',
      component: ViewProjects
    },

    {
      path: '/editProjects/:id',
      name: 'EditProjects',
      component: EditProjects
    },
  ]
})
