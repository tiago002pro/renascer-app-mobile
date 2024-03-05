import axios from "axios";

const api = axios.create({
  baseURL: "http://3.87.226.191:8080",
  // baseURL: "http://10.0.0.107:8080",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  }
})

export default api;