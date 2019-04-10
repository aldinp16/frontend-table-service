// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store/index'
import ElementUI from 'element-ui'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import VueDataTables from 'vue-data-tables'
import 'element-ui/lib/theme-chalk/index.css'
import './../node_modules/bulma/css/bulma.css';

locale.use(lang)
Vue.use(ElementUI)
Vue.use(VueDataTables)
Vue.config.devtools = process.env.NODE_ENV === 'development'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
