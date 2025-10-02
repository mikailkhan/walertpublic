import axios from "axios";

const api = axios.create({
  baseURL: `http://0.0.0.0:3000/api/v1/admin/`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("walert_token");

  if (token) {
    config.headers.Authorization = `bearer ${token}`;
  }

  return config;
});

export default api;
