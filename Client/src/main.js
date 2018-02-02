// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'

import '../node_modules/vuetify/dist/vuetify.css'
import '../node_modules/vuetify/dist/vuetify.min.css'
import '../node_modules/mdi/css/materialdesignicons.css'

Vue.use(Vuetify);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
