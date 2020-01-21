import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: null
  },
  mutations: {
    USER_ID(state, userId) {
      state.userId = userId
    }
  },
  actions: {
    userId({ commit }, userId) {
      commit('USER_ID', userId)
    }
  },
  modules: {
  }
})
