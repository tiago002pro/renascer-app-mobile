import axios from "axios";

const api = axios.create({
  // baseURL: "http://44.204.26.91:8080/",
  baseURL: "http://10.0.0.100:8080",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  }
})

export default api;