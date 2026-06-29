import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Cadastro from "./components/SerieForm/SerieForm";
import SerieList from "./components/SerieList/SerieList";

import serieApi from "./services/serieApi";

function App() {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    async function carregar() {
      try {
        const response = await serieApi.get("/series");

        const seriesFormatadas = response.data.map((serie) => ({
          id: serie.id,
          titulo: serie.title,
          seasons: serie.seasons,
          releaseYear: serie.releaseDate ? serie.releaseDate.split("-")[0] : "",
          director: serie.director,
          producer: serie.production,
          category: serie.category
            ? serie.category.split("/").map((cat) => cat.trim())
            : [],
          watchedOn: serie.watchedAt,
          poster: "",
        }));

        setSeries(seriesFormatadas);
      } catch (error) {
        console.error("Erro ao carregar séries:", error);
      }
    }

    carregar();
  }, []);

  async function adicionarSerie(novaSerie) {
    try {
      const corpo = {
        title: novaSerie.titulo,
        seasons: Number(novaSerie.seasons),
        releaseDate: novaSerie.releaseYear
          ? `${novaSerie.releaseYear}-01-01`
          : null,
        director: novaSerie.director,
        production: novaSerie.producer,
        category: novaSerie.category.join(" / "),
        watchedAt: novaSerie.watchedOn || null,
      };

      const response = await serieApi.post("/series", corpo);
      const criada = response.data;

      setSeries((prev) => [
        ...prev,
        {
          id: criada.id,
          titulo: criada.title,
          seasons: criada.seasons,
          releaseYear: criada.releaseDate
            ? criada.releaseDate.split("-")[0]
            : "",
          director: criada.director,
          producer: criada.production,
          category: criada.category
            ? criada.category.split("/").map((cat) => cat.trim())
            : [],
          watchedOn: criada.watchedAt,
          poster: novaSerie.poster || "",
        },
      ]);
    } catch (error) {
      console.error("Erro ao cadastrar série:", error);
    }
  }

  async function atualizarSerie(serieAtualizada) {
    try {
      const corpo = {
        id: serieAtualizada.id,
        title: serieAtualizada.titulo,
        seasons: Number(serieAtualizada.seasons),
        releaseDate: serieAtualizada.releaseYear
          ? `${serieAtualizada.releaseYear}-01-01`
          : null,
        director: serieAtualizada.director,
        production: serieAtualizada.producer,
        category: serieAtualizada.category.join(" / "),
        watchedAt: serieAtualizada.watchedOn || null,
      };

      await serieApi.put("/series", corpo);

      setSeries((prev) =>
        prev.map((serie) =>
          serie.id === serieAtualizada.id ? serieAtualizada : serie,
        ),
      );
    } catch (error) {
      console.error("Erro ao atualizar série:", error);
    }
  }

  async function excluirSerie(id) {
    try {
      await serieApi.delete(`/series/${id}`);
      setSeries((prev) => prev.filter((serie) => serie.id !== id));
    } catch (error) {
      console.error("Erro ao excluir série:", error);
    }
  }

  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />

        <Route
          path="/cadastro"
          element={
            <Cadastro
              series={series}
              adicionarSerie={adicionarSerie}
              atualizarSerie={atualizarSerie}
            />
          }
        />

        <Route
          path="/cadastro/:id"
          element={
            <Cadastro
              series={series}
              adicionarSerie={adicionarSerie}
              atualizarSerie={atualizarSerie}
            />
          }
        />

        <Route
          path="/serielist"
          element={<SerieList series={series} excluirSerie={excluirSerie} />}
        />
      </Routes>
    </>
  );
}

export default App;
