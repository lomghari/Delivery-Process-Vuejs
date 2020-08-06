import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './AuthStore'
import PackageStore from './PackageStore'
import HubStore from './Hub'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Auth,
    PackageStore,
    HubStore
  }
})
