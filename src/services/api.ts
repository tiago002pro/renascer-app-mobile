import axios from "axios";

const api = axios.create({
  // baseURL: "http://44.202.96.220:8080",
  baseURL: "http://10.0.0.108:8080",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  }
})

export default api;