import Vue from 'vue'
import Vuex from 'vuex'
import login from './login'
import getters from './getters'
import loading from './loading'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    login,
    loading
  },
  getters
})

export default store
