import { RepositoryFactory } from '@/repositories/RepositoryFactory'
const menuRepository = RepositoryFactory.get('menu')

const state = {
  status: '',
  menulist: []
}

const mutations = {
  MENU_LOAD_START (state) {
    state.status = 'loading'
  },
  MENU_LOAD_SUCCESS (state, payload) {
    state.status = 'success'
    state.menulist = payload
  },
  MENU_UPDATE_START (state, payload) {
    state.status = 'loading'
  },
  MENU_UPDATE_SUCCESS (state, payload) {
    state.status = 'success'
    const menu = state.menulist.find((item) => item.id === payload.id)
    menu.name = payload.name
    menu.status = +payload.status
    menu.description = payload.description
    menu.price = payload.price
  },
  MENU_UPDATE_ERROR (state, payload) {
    state.status = 'error'
  },
  MENU_ADD_START (state, payload) {
    state.status = 'loading'
  },
  MENU_ADD_SUCCESS (state, payload) {
    state.status = 'success'
    state.menulist.push(payload)
  },
  MENU_ADD_ERROR (state, payload) {
    state.status = 'error'
  },
  MENU_DELETE_START (state, payload) {
    state.status = 'loading'
  },
  MENU_DELETE_SUCCESS (state, payload) {
    state.status = 'success'
    const index = state.menulist.findIndex((menu) => menu.id === payload)
    state.menulist.splice(index, 1)
  },
  MENU_DELETE_ERROR (state, payload) {
    state.status = 'error'
  }
}

const actions = {
  getMenuList ({ commit }) {
    return new Promise((resolve, reject) => {
      commit('MENU_LOAD_START')
      menuRepository.all()
        .then((resp) => {
          commit('MENU_LOAD_SUCCESS', resp.data.data)
          resolve()
        }).catch((err) => {
          console.error(err)
          reject()
        })
    })
  },
  menuUpdate ({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      commit('MENU_UPDATE_START')
      const formData = new FormData()
      Object.keys(payload.data).forEach((key) => {
        formData.append(key, payload.data[key])
      })
      menuRepository.update(payload.id, formData)
        .then((resp) => {
          commit('MENU_UPDATE_SUCCESS', resp.data.data)
          dispatch('alert/createSuccessAlert', resp.data.message, { root: true })
          resolve()
        }).catch((err) => {
          const errMessage = err.response.data.message
          dispatch('alert/createErrorAlert', errMessage, { root: true })
          reject()
        })
    })
  },
  menuAdd ({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      commit('MENU_ADD_START')
      const formData = new FormData()
      Object.keys(payload).forEach((key) => {
        formData.append(key, payload[key])
      })
      menuRepository.create(formData)
        .then((resp) => {
          commit('MENU_ADD_SUCCESS', resp.data.data)
          dispatch('alert/createSuccessAlert', resp.data.message, { root: true })
          resolve()
        }).catch((err) => {
          const errMessage = `${err.response.data.message}: ${err.response.data.data[0].message}`
          dispatch('alert/createErrorAlert', errMessage, { root: true })
          reject()
        })
    })
  },
  menuDelete ({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      commit('MENU_DELETE_START')
      menuRepository.delete(payload)
        .then((resp) => {
          dispatch('alert/createSuccessAlert', resp.data.message, { root: true })
          commit('MENU_DELETE_SUCCESS', payload)
          resolve()
        }).catch((err) => {
          const errMessage = err.response.data.message
          dispatch('alert/createErrorAlert', errMessage, { root: true })
          commit('MENU_DELETE_ERROR')
          reject()
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}