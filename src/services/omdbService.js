import api from "./api";

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

export async function buscarSerie(titulo) {
  try {
    const response = await api.get("", {
      params: {
        apikey: API_KEY,
        t: titulo,
        type: "series",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar série na OMDB:", error);
    throw error;
  }
}

export async function sugerirSeries(titulo) {
  try {
    const response = await api.get("", {
      params: {
        apikey: API_KEY,
        s: titulo,
        type: "series",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao sugerir séries:", error);
    throw error;
  }
}
