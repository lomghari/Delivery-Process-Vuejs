
import Axios from './Axios-Auth'
import { ClearInputHub } from '../Util/ClearState'
import Router from '../router/index'
const state = {
  HubName: '',
  HubLocation: '',
  HubCity: '',
  HubPhone: '',
  HubSelect: null,
  Hubs: null,
  load: false
}

const getters = {
  getHubName (state) {
    return state.HubName
  },
  getHubLocation (state) {
    return state.HubLocation
  },
  getHubCity (state) {
    return state.HubCity
  },
  getHubSelect (state) {
    return state.HubSelect
  },
  getHubPhone (state) {
    return state.HubPhone
  }
}

const mutations = {
  setHubName (state, payload) {
    state.HubName = payload
  },
  setHubLocation (state, payload) {
    state.HubLocation = payload
  },
  setHubCity (state, payload) {
    state.HubCity = payload
  },
  setHubPhone (state, payload) {
    state.HubPhone = payload
  },
  setHubSelected (state, payload) {
    state.HubSelect = payload
  },
  getHubs (state, payload) {
    state.Hubs = payload.Hubs
    state.load = true
  }
}

const actions = {
  setHubName ({ commit }, payload) {
    commit('setHubName', payload)
  },
  setHubLocation ({ commit }, payload) {
    commit('setHubLocation', payload)
  },
  setHubCity ({ commit }, payload) {
    commit('setHubCity', payload)
  },
  setHubPhone ({ commit }, payload) {
    commit('setHubPhone', payload)
  },
  setHubSelected ({ commit }, payload) {
    commit('setHubSelected', payload)
  },
  createHub ({ commit, state }) {
    Axios({
      url: '/hub/createhub',
      method: 'POST',
      headers: {
        authorization: 'Bearer ' + document.cookie.split('; ').find(c => c.startsWith('token')).split('=')[1]
      },
      data: {
        Provider_Name: state.HubName,
        Address: state.HubLocation,
        City: state.HubCity,
        Phone: state.HubPhone
      }
    }).then(data => {
      console.log(data)
      ClearInputHub(state)
    }).catch(err => {
      console.log(err)
      ClearInputHub(state)
    })
  },
  getHubs ({ commit }) {
    Axios({
      url: '/hub',
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + document.cookie.split('; ').find(c => c.startsWith('token')).split('=')[1]
      }
    }).then(data => {
      console.log(data)
      commit('getHubs', data.data)
    }).catch(err => {
      console.log(err)
    })
  },
  UpdateUserCrHub ({ commit, state }) {
    Axios({
      method: 'PUT',
      url: '/users/user',
      data: {
        Current_Provider: state.HubSelect
      },
      headers: {
        authorization: 'Bearer ' + document.cookie.split('; ').find(c => c.startsWith('token')).split('=')[1]
      }
    }).then(data => {
      console.log(data)
      Router.replace('/')
        .catch(() => {
          console.log()
        })
    }).catch(err => {
      console.log(err)
    })
  }
}

export default { state, getters, mutations, actions }
