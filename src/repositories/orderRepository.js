import Repository from "./Repository"

const resource = "/orders"
export default {
  all() {
    return Repository.get(`${resource}`)
  },
  create(data) {
    return Repository.post(`${resource}`, data)
  },
  find(id) {
    return Repository.get(`${resource}/${id}`)
  },
  doneOrderId (id, data) {
    return Repository.post(`${resource}/${id}/updateOrderDetailStatus`, data)
  },
  transactions (id, data) {
    return Repository.post(`${resource}/${id}/transactions`, data)
  }
}
