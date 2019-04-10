import { RepositoryFactory } from '@/repositories/RepositoryFactory'
const menuRepository = RepositoryFactory.get('menu')
const orderRepository = RepositoryFactory.get('order')

const state = {
  status: '',
  items: [],
  menus: [],
  noTable: null,
  orderDescription: null
}

const mutations = {
  MENU_LOADED (state, payload) {
    state.menus = payload
  },
  ITEM_ADDED (state, payload) {
    state.items.push(payload)
    const menu = state.menus.find((menu) => menu.id === payload.menu_id)
    menu.lock = true
  },
  ITEM_REMOVED (state, payload) {
    const menu = state.menus.find((menu) => menu.id === payload)
    const itemIndex = state.items.findIndex((item) => item.menu_id === payload)
    state.items.splice(itemIndex, 1)
    menu.lock = false
  },
  ITEM_CLEARED (state) {
    state.items = []
    state.menus.forEach((menu) => menu.lock = false)
    state.noTable = null
    state.orderDescription = null
  },
  DESCRIPTION_UPDATED (state, payload) {
    state.orderDescription = payload
  },
  NO_TABLE_UPDATED (state, payload) {
    state.noTable = payload
  },
  ORDER_START (state) {
    state.status = 'loading'
  },
  ORDER_CREATED (state) {
    state.status = 'created'
  },
  ORDER_ERROR (state) {
    state.status = 'error'
  }
}

const actions = {
  getAllMenu ({ commit }) {
    return new Promise((resolve, reject) => {
      menuRepository.all()
        .then((response) => {
          commit('MENU_LOADED', response.data.data.map((item) => {
            item.lock = false
            return item
          }))
        })
    })
  },
  addItem ({ commit, state }, payload) {
    const index = state.menus.findIndex((menu) => menu.id === payload)
    const item = { menu_id: payload, name: state.menus[index].name, quantity: 1, price: state.menus[index].price, description: null }
    commit('ITEM_ADDED', item)
  },
  removeItem({ commit, state }, payload)  {
    commit('ITEM_REMOVED', payload)
  },
  clearItem({ commit }) {
    commit('ITEM_CLEARED')
  },
  updateDescription ({ commit }, payload) {
    commit('DESCRIPTION_UPDATED', payload)
  },
  updateNoTable ({ commit }, payload) {
    commit('NO_TABLE_UPDATED', payload)
  },
  createOrder ({ commit, state, dispatch }) {
    commit('ORDER_START')
    new Promise ((resolve, reject) => {
      const body = {
        order_description: state.orderDescription,
        no_table: +state.noTable,
        items: state.items.map((item) => {
          return { menu_id: +item.menu_id, total: +item.quantity, description: item.description }
        })
      }
      orderRepository.create(body)
        .then((response) => {
          dispatch('alert/createSuccessAlert', response.data.message, { root: true })
          commit('ORDER_CREATED')
          commit('ITEM_CLEARED')
          resolve()
        }).catch((err) => {
          dispatch('alert/createErrorAlert', err.response.data.message, { root: true })
          commit('ORDER_ERROR')
          reject()
        })
    })
  }
}

const getters = {
  totalBill: state => {
    return state.items
      .map((item) => item.price * item.quantity)
      .reduce((a, b) => a + b, 0)
  }
}

export default {
  namespaced: true,
  mutations,
  actions,
  state,
  getters
}