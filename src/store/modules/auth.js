import { RepositoryFactory } from '@/repositories/RepositoryFactory'
import axios from 'axios'

const authRepository = RepositoryFactory.get('auth')

function isAuthenticated () {
  return localStorage.getItem('user_token') !== null
}

const state = {
  status: isAuthenticated() ? 'authenticated' : '',
  token: localStorage.getItem('user_token') || '',
  userData: JSON.parse(localStorage.getItem('user_data')) || ''
}

const mutations = {
  AUTH_START (state) {
    state.status = 'loading'
  },
  AUTH_SUCCESS (state, { token, userData }) {
    state.status = 'authenticated'
    state.token = token
    state.userData = userData
  },
  AUTH_ERROR (state) {
    state.status = 'error'
  },
  CLEAR_AUTH (state) {
    state.status = ''
    state.token = ''
    state.userData = ''
  }
}

const actions = {
  login ({ commit, dispatch }, credential) {
    return new Promise((resolve, reject) => {
      commit('AUTH_START')
      setTimeout(() => {
        authRepository.login(credential)
          .then((response) => {
            const token = response.data.data.token
            const user = atob(token.split('.')[1])
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            localStorage.setItem('user_token', token)
            localStorage.setItem('user_data', user)
            commit('AUTH_SUCCESS', { token, userData: JSON.parse(user) })
            dispatch('alert/createSuccessAlert', 'Login success', { root: true })
            resolve()       
          }).catch((err) => {
            const errMessage = err.response.data.message
            dispatch('alert/createErrorAlert', errMessage, { root: true })
            commit('AUTH_ERROR')
            reject()
          })
      }, 5000)
    })
  },
  logout ({ commit }) {
    return new Promise((resolve, reject) => {
      delete axios.defaults.headers.common['Authorization']
      localStorage.removeItem('user_token')
      localStorage.removeItem('user_data')
      commit('CLEAR_AUTH')
      resolve()
    })
  }
}

const getters = {
  isAuthenticated (state) {
    return state.status === 'authenticated'
  },
  role (state) {
    return state.userData.data.level.name
  }
}

export default {
  namespaced: true,
  mutations,
  actions,
  state,
  getters
}