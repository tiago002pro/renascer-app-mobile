import axios from "axios";

const api = axios.create({
  baseURL: "http://54.224.48.116:8080",
  // baseURL: "http://10.0.0.106:8080",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  }
})

export default api;