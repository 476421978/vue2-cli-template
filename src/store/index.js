import Vue from 'vue'
import Vuex from 'vuex'
import { getStorage, setStorage, removeStorage } from '@/utils/storage'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    stoUser: getStorage('VUE_USER_INFO'),
    globalSetting: getStorage('GLOBAL_SETTING')
  },
  getters: {
    getStoUser(state) {
      return state.stoUser
    },
    getGlobalSetting(state) {
      return state.globalSetting
    }
  },
  mutations: {
    SAVE_USER(state, data) {
      state.stoUser = data
      setStorage({ name: 'VUE_USER_INFO', content: data })
      !data && removeStorage({ name: 'VUE_USER_INFO' })
    },
    SAVE_GLOBAL_SETTING(state, data) {
      state.globalSetting = data
      setStorage({ name: 'GLOBAL_SETTING', content: data })
    }
  },
  actions: {
    saveUser({ commit }, value) {
      commit('SAVE_USER', value)
    },
    saveGlobalSetting({ commit }, value) {
      commit('SAVE_GLOBAL_SETTING', value)
    }
  },
  modules: {}
})
