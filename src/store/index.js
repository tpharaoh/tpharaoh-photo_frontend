import Vue from 'vue'
import Vuex from 'vuex'

import general from './modules/general/'
import auth from './modules/auth'
import device_types from './modules/device_types'
import inventory from './modules/inventory'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    general,
    auth,
    device_types,
    inventory
  }
})
