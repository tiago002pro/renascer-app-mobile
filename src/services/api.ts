import axios from "axios";

const api = axios.create({
  baseURL: "http://ec2-34-205-76-203.compute-1.amazonaws.com:8080",
  // baseURL: "http://10.0.0.110:8080",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  }
})

export default api;