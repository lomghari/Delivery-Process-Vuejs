import Axios from './Axios-Auth'
import { saveAs } from 'file-saver'
import * as Processe from '../Util/ReadExcel'
import { ClearInputUpload } from '../Util/ClearState'

const state = {
  step1: false,
  step2: false,
  step3: false,
  steps: 1,
  packageSearch: null,
  packageSearchFilter: null,
  PackageDataToSend: null,
  UploadResponse: null,
  QueryToFind: 'Phone_Number',
  QueryToFindValue: '',
  PackageFinder: false,
  HistoriqueBeforeProcce: null,
  LogsData: null
}

const getters = {
  getQueryToFind (state) {
    return state.QueryToFind
  },
  getQueryToFindValue (state) {
    return state.QueryToFindValue
  }
}

const mutations = {
  setQueryToFind (state, payload) {
    state.QueryToFind = payload
  },
  setQueryToFindValue (state, payload) {
    state.QueryToFindValue = payload
  },
  ProcessingData (state, payload) {
    state.PackageDataToSend = payload.data
    console.log(state.PackageDataToSend)
  },
  UploadData (state, payload) {
    state.UploadResponse = payload.Updata
    state.LogsData = payload.LogArray
    state.step3 = true
  },
  setSearchPackage (state, payload) {
    state.PackageFinder = true
    state.packageSearch = payload.searchPackages
    state.packageSearchFilter = state.packageSearch
    state.HistoriqueBeforeProcce = payload.HistorquePackage
  },
  SearchPackageLocaly (state, payload) {
    state.packageSearchFilter = state.packageSearch.filter(el => {
      return el[state.QueryToFind].includes(state.QueryToFindValue.toUpperCase())
    })
  },
  ClearUpload (state) {
    ClearInputUpload(state)
  }
}

const actions = {
  setQueryToFind ({ commit }, payload) {
    commit('setQueryToFind', payload)
  },
  setQueryToFindValue ({ commit }, payload) {
    commit('setQueryToFindValue', payload)
  },
  DownloadTemplate ({ commit }) {
    saveAs(Processe.default.GetTemplate(), 'template.xlsx')
  },
  ProcessingData ({ commit, state }, payload) {
    state.step1 = true
    state.steps = 2
    Processe.default.ReadFile(payload).then(data => {
      var result = Processe.default.StudCSV(data)
      setTimeout(() => {
        state.step2 = true
        state.steps = 3
        commit('ProcessingData', { data: result })
      }, 3000)
    })
  },
  UploadData ({ commit, state }) {
    console.log(state.PackageDataToSend.SccessArray)
    Axios({
      method: 'POST',
      url: '/packege/insertmany',
      headers: {
        authorization: 'Bearer ' + document.cookie.split('; ').find(c => c.startsWith('token')).split('=')[1]
      },
      data: {
        Shipment_Provider_Id: 1,
        Total_Package: state.PackageDataToSend.TotalPa,
        Package_Seccuss: state.PackageDataToSend.SccessArray,
        Package_Logs: state.PackageDataToSend.LogArray
      }
    }).then(data => {
      console.log(data)
      commit('UploadData', { Updata: data.data.Data.Upload, LogArray: data.data.Data.LogsData })
    }).catch(err => {
      console.log(err)
    })
  },
  DownloadLogsFile ({ commit, state }) {
    saveAs(Processe.default.GetLogs(state.LogsData), 'LogsTemplate.xlsx')
  },
  SearchPackage ({ commit, state }) {
    console.log(state.QueryToFind, state.QueryToFindValue)
    Axios({
      url: `/packege/getpackege?${state.QueryToFind}=${state.QueryToFindValue}`,
      method: 'GET',
      headers: {
        authorization: 'Bearer ' + document.cookie.split('; ').find(c => c.startsWith('token')).split('=')[1]
      }
    }).then(data => {
      console.log(data.data.allFullPackege)
      commit('setSearchPackage',
        {
          searchPackages: data.data.allFullPackege,
          HistorquePackage: data.data.allHistory
        })
    }).catch(err => {
      console.log(err.response)
    })
  },
  ClearUpload ({ commit }) {
    commit('ClearUpload')
  }
}

export default { state, getters, mutations, actions }
