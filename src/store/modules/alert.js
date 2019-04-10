const state = {
  status: false,
  message: '',
  type: ''
}

const mutations = {
  ALERT_SUCCESS (state, payload) {
    state.status = true
    state.message = payload
    state.type = 'is-success'
  },
  ALERT_ERROR (state, payload) {
    state.status = true
    state.message = payload
    state.type = 'is-danger'
  },
  ALERT_CLEAR (state) {
    state.status = false
    state.message = ''
    state.type = ''
  }
}

const actions = {
  createSuccessAlert ({ commit }, message) {
    commit('ALERT_SUCCESS', message)
  },
  createErrorAlert ({ commit }, message) {
    commit('ALERT_ERROR', message)
  },
  clearAlert ({ commit }) {
    commit('ALERT_CLEAR')
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}