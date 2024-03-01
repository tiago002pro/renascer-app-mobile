import axios from "axios";

const api = axios.create({
  // baseURL: "http://3.88.109.4:8080",
  baseURL: "http://10.0.0.110:8080",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  }
})

export default api;