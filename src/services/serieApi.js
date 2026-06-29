import axios from "axios";

const serieApi = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 10000,
});

serieApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erro na API de séries:", error.message);
    return Promise.reject(error);
  },
);

export default serieApi;
