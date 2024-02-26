import axios from "axios";

const api = axios.create({
  // baseURL: "http://54.175.252.190:8080",
  baseURL: "http://172.18.144.1:8080",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  }
})

export default api;