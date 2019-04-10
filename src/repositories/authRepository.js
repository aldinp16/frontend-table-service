import Repository from "./Repository";

const resource = "/auth";
export default {
  login (data) {
    return Repository.post(`${resource}`, data);
  }
}
