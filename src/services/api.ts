import axios from "axios";

const api = axios.create({
  baseURL: "http://195.200.0.62:8080/",
  // baseURL: "http://10.0.0.100:8080",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  }
})

export default api;