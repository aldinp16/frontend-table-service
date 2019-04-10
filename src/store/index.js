import Vue from 'vue'
import Vuex from 'vuex'

import auth from '@/store/modules/auth'
import createOrder from '@/store/modules/create-order'
import alert from '@/store/modules/alert'
import menu from '@/store/modules/menu'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    createOrder,
    alert,
    menu
  }
})