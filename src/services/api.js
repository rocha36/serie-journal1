import axios from "axios";

const api = axios.create({
  baseURL: "https://www.omdbapi.com/",
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erro global Axios:", error.message);
    return Promise.reject(error);
  },
);

export default api;
