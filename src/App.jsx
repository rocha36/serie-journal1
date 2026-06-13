import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Cadastro from "./components/SerieForm/SerieForm";
import SerieList from "./components/SerieList/SerieList";

function App() {
  const [series, setSeries] = useState([]);

  function adicionarSerie(novaSerie) {
    setSeries([
      ...series,
      {
        ...novaSerie,
        id: Date.now(),
      },
    ]);
  }

  function atualizarSerie(serieAtualizada) {
    setSeries(
      series.map((serie) =>
        serie.id === serieAtualizada.id ? serieAtualizada : serie,
      ),
    );
  }

  function excluirSerie(id) {
    setSeries(series.filter((serie) => serie.id !== id));
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
