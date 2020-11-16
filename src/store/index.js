import Vue from 'vue'
import Vuex from 'vuex'
//引入vuex持久化插件
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:{}
  },
  mutations: {
    getUser(state, user){
      state.user = user
    }
  },
  plugins: [createPersistedState()],
  actions: {
  },
  modules: {
  }
})
