import Vue from 'vue'
import Vuex from 'vuex'

import general from './modules/general/'
import auth from './modules/auth'
import tags from './modules/tags'
import blog from './modules/blog'

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
    tags,
    blog
  }
})
