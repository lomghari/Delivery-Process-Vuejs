import Axios from './Axios-Auth'
import Router from '../router/index'
import { ClearInputLogin, ClearInputSingin } from '../Util/ClearState'

const state = {
  User: null,
  Loaderbtn: false,
  username: '',
  email: '',
  password: '',
  role: '',
  fullname: '',
  selectHub: []
}

const getters = {
  getUsername (state) {
    return state.username
  },
  getPassword (state) {
    return state.password
  },
  getRole (state) {
    return state.role
  },
  getEmail (state) {
    return state.email
  },
  getFullname (state) {
    return state.fullname
  },
  getSelected (state) {
    return state.selectHub
  }
}

const mutations = {
  setUsername (state, payload) {
    state.username = payload
  },
  setPassword (state, payload) {
    state.password = payload
  },
  setRole (state, payload) {
    state.role = payload
  },
  setEmail (state, payload) {
    state.email = payload
  },
  setFullname (state, payload) {
    state.fullname = payload
  },
  setUser (state, payload) {
    state.User = payload.user
  },
  setSelected (state, payload) {
    state.selectHub = payload
  },
  FetchUser (state, payload) {
    state.User = payload.user
  },
  LoginUser (state, payload) {
    state.Loaderbtn = false
    ClearInputLogin(state)
    Router.replace('/dashboard')
  },
  Singout (state, payload) {
    state.User = null
    Router.replace('/login')
  }
}

const actions = {
  setUsername ({ commit }, payload) {
    commit('setUsername', payload)
  },
  setPassword ({ commit }, payload) {
    commit('setPassword', payload)
  },
  setRole ({ commit }, payload) {
    commit('setRole', payload)
  },
  setEmail ({ commit }, payload) {
    commit('setEmail', payload)
  },
  setFullname ({ commit }, payload) {
    commit('setFullname', payload)
  },
  setSelected ({ commit }, payload) {
    commit('setSelected', payload)
  },
  singUp ({ state }) {
    state.Loaderbtn = true
    Axios({
      method: 'POST',
      url: '/users/singupadmin',
      data: {
        username: state.username,
        email: state.email,
        password: state.password,
        role: state.role,
        fullname: state.fullname
      }
    }).then(result => {
      ClearInputSingin(state)
      state.Loaderbtn = false
    // eslint-disable-next-line handle-callback-err
    }).catch(err => {
      state.Loaderbtn = false
    })
  },
  Login ({ commit, dispatch, state }) {
    state.Loaderbtn = true
    Axios({
      method: 'POST',
      url: '/users/login',
      data: {
        email: state.email,
        password: state.password
      }
    }).then(result => {
      document.cookie = 'token=' + result.data.token
      dispatch('setUser').then(() => commit('LoginUser'))
    }).catch(() => {
      state.Loaderbtn = false
    })
  },
  Singout ({ commit, state }) {
    document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:00 GMT'
    console.log(document.cookie)
    commit('Singout')
  },
  setUser ({ commit }) {
    Axios({
      method: 'GET',
      url: '/users/user',
      headers: {
        authorization: 'Bearer ' + document.cookie.split('; ').find(c => c.startsWith('token')).split('=')[1]
      }
    }).then(result => {
      commit('setUser', { user: result.data.user })
    }).catch(err => {
      console.log(err.response)
    })
  },
  addUser ({ commit, state }) {
    Axios({
      method: 'POST',
      url: '/users/createuser',
      headers: {
        authorization: 'Bearer ' + document.cookie.split('; ').find(c => c.startsWith('token')).split('=')[1]
      },
      data: {
        username: state.username,
        email: state.email,
        password: state.password,
        fullname: state.fullname,
        role: 'customer',
        HubIds: state.selectHub
      }
    }).then(data => {
      state.Loaderbtn = false
      console.log(data)
    }).catch(err => {
      console.log(err)
    })
  }
}

export default { state, getters, mutations, actions }
