import axios from "axios"

// You can use your own logic to set your local or production domain
const baseDomain = "http://127.0.0.1:3333"
// The base URL is empty this time due we are using the jsonplaceholder API
const baseURL = `${baseDomain}`

const token = localStorage.getItem('user_token')
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default axios.create({
  baseURL
})