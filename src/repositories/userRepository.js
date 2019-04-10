import Repository from "./Repository";

const resource = "/users";
export default {
  all () {
    return Repository.get(`${resource}`)
  },
  create (data) {
    return Repository.post(`${resource}`, data)
  },
  update (id, data) {
    return Repository.put(`${resource}/${id}`, data)
  },
  delete (id) {
    return Repository.delete(`${resource}/${id}`)
  }
}
