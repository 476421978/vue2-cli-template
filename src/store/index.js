import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    stoUser: null
  },
  getters: {
  },
  mutations: {
    SAVE_USER(state, data) {
      state.stoUser = data
    }
  },
  actions: {
    saveUser({ commit }, value) {
      commit('SAVE_USER', value)
    }
  },
  modules: {
  }
})