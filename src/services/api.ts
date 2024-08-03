import axios from "axios";

const api = axios.create({
  baseURL: "http://195.200.0.62:8080/renascer-api",
  // baseURL: "http://10.0.0.107:8080/renascer-api",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  }
})

export default api;