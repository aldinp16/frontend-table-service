import Repository from "./Repository";

const resource = "/metric";
export default {
  main () {
    return Repository.get(`${resource}/main`);
  },
  transcationCountHistory () {
    return Repository.get(`${resource}/transcationCountHistory`)
  },
  menuTopOrder () {
    return Repository.get(`${resource}/menuTopOrder`)
  }
}
