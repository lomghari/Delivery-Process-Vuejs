
import Axios from './Axios-Auth'
import { ClearInputHub } from '../Util/ClearState'
const state = {
  HubName: '',
  HubLocation: '',
  HubCity: '',
  HubPhone: ''
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
  createHub ({ commit, state }) {
    Axios({
      url: '/hub/createhub',
      method: 'POST',
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
  }
}

export default { state, getters, mutations, actions }
