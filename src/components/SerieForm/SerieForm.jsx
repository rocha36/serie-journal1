import { useState, useMemo, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { buscarSerie, sugerirSeries } from "../../services/omdbService";
import "./SerieForm.css";

const categorias = [
  "Ação",
  "Aventura",
  "Comédia",
  "Drama",
  "Fantasia",
  "Ficção Científica",
  "Romance",
  "Suspense",
  "Terror",
  "Documentário",
];

const initialState = {
  titulo: "",
  seasons: "",
  releaseYear: "",
  director: "",
  producer: "",
  category: [],
  watchedOn: "",
  poster: "",
};

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function SerieForm({ series, adicionarSerie, atualizarSerie }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const serieEditando = useMemo(() => {
    if (!id) return null;
    return series.find((s) => s.id === Number(id)) || null;
  }, [id, series]);

  const [formData, setFormData] = useState(serieEditando || initialState);
  const [errors, setErrors] = useState({});
  const [sugestoes, setSugestoes] = useState([]);

  async function buscarDadosSerie(titulo) {
    if (!titulo.trim()) return;

    try {
      const dados = await buscarSerie(titulo);

      if (dados.Response !== "True") {
        console.warn("Série não encontrada");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        poster: dados.Poster !== "N/A" ? dados.Poster : "",
      }));
    } catch (error) {
      console.error(error);
    }
  }

  const buscarSugestoes = useCallback(
    debounce(async (valor) => {
      if (valor.trim().length < 3) {
        setSugestoes([]);
        return;
      }

      try {
        const dados = await sugerirSeries(valor);
        if (dados.Response === "True") {
          setSugestoes(dados.Search);
        } else {
          setSugestoes([]);
        }
      } catch (error) {
        console.error(error);
        setSugestoes([]);
      }
    }, 400),
    [],
  );

  function handleTituloChange(valor) {
    handleChange("titulo", valor);
    buscarSugestoes(valor);
  }

  function selecionarSugestao(serie) {
    handleChange("titulo", serie.Title);
    setSugestoes([]);
    buscarDadosSerie(serie.Title);
  }

  function handleChange(campo, valor) {
    setFormData((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  }

  function handleCategoryChange(categoria) {
    setFormData((prev) => {
      const existe = prev.category.includes(categoria);
      return {
        ...prev,
        category: existe
          ? prev.category.filter((c) => c !== categoria)
          : [...prev.category, categoria],
      };
    });
  }

  function validar() {
    const novosErros = {};

    if (!formData.titulo.trim()) novosErros.titulo = true;
    if (!formData.seasons) novosErros.seasons = true;
    if (!formData.releaseYear) novosErros.releaseYear = true;
    if (formData.category.length === 0) novosErros.category = true;

    setErrors(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validar()) return;

    if (id) {
      atualizarSerie({ ...formData, id: Number(id) });
    } else {
      adicionarSerie(formData);
    }

    navigate("/serielist");
  }

  return (
    <section className="serieform">
      <form onSubmit={handleSubmit}>
        <span className="serieform-eyebrow">Ficha da Série</span>

        <h1>{id ? "Editar Série" : "Cadastrar Série"}</h1>

        <p>Preencha os campos obrigatórios</p>

        {/* Título */}
        <div className="serieform-field">
          <label>Título da Série</label>

          <input
            value={formData.titulo}
            onChange={(e) => handleTituloChange(e.target.value)}
            onBlur={() => {
              setTimeout(() => setSugestoes([]), 200);
              buscarDadosSerie(formData.titulo);
            }}
            placeholder="Ex: Breaking Bad"
            className={errors.titulo ? "has-error" : ""}
          />

          {/* Lista de sugestões */}
          {sugestoes.length > 0 && (
            <ul className="serieform-sugestoes">
              {sugestoes.map((s) => (
                <li key={s.imdbID} onMouseDown={() => selecionarSugestao(s)}>
                  <div className="sugestao-sem-poster">
                    {s.Poster && s.Poster !== "N/A" && (
                      <img
                        src={s.Poster}
                        alt={s.Title}
                        onError={(e) => {
                          e.target.parentElement.style.background = "#2a0a0c";
                          e.target.remove();
                        }}
                      />
                    )}
                  </div>
                  <span className="sugestao-titulo">{s.Title}</span>
                  <span className="sugestao-ano">{s.Year}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Poster da série selecionada */}
          {formData.poster && (
            <div className="serieform-poster">
              <img src={formData.poster} alt={formData.titulo} />
            </div>
          )}
        </div>

        {/* Temporadas */}
        <div className="serieform-field">
          <label>Número de Temporadas</label>
          <input
            type="number"
            value={formData.seasons}
            onChange={(e) => handleChange("seasons", e.target.value)}
            placeholder="Ex: 5"
            className={errors.seasons ? "has-error" : ""}
          />
        </div>

        {/* Ano + Assistido */}
        <div className="serieform-grid">
          <div className="serieform-field">
            <label>Ano de Lançamento</label>
            <input
              type="number"
              min="1900"
              max="2100"
              value={formData.releaseYear}
              onChange={(e) => handleChange("releaseYear", e.target.value)}
              placeholder="Ex: 2017"
              className={errors.releaseYear ? "has-error" : ""}
            />
          </div>

          <div className="serieform-field">
            <label>Assistido em</label>
            <input
              type="date"
              value={formData.watchedOn}
              onChange={(e) => handleChange("watchedOn", e.target.value)}
            />
          </div>
        </div>

        {/* Diretor */}
        <div className="serieform-field">
          <label>Diretor</label>
          <input
            value={formData.director}
            onChange={(e) => handleChange("director", e.target.value)}
            placeholder="Ex: Vince Gilligan"
          />
        </div>

        {/* Produtora */}
        <div className="serieform-field">
          <label>Produtora</label>
          <input
            value={formData.producer}
            onChange={(e) => handleChange("producer", e.target.value)}
            placeholder="Ex: Netflix"
          />
        </div>

        {/* Categorias */}
        <div className="serieform-field">
          <label>Categorias / Gêneros</label>
          <div
            className={`serieform-categories ${
              errors.category ? "has-error" : ""
            }`}
          >
            {categorias.map((categoria) => (
              <label key={categoria}>
                <input
                  type="checkbox"
                  checked={formData.category.includes(categoria)}
                  onChange={() => handleCategoryChange(categoria)}
                />
                {categoria}
              </label>
            ))}
          </div>
        </div>

        <div className="serieform-buttons">
          <button type="submit">
            {id ? "Atualizar Série" : "Cadastrar Série"}
          </button>
          <button type="button" onClick={() => navigate("/serielist")}>
            Cancelar
          </button>
        </div>
      </form>
    </section>
  );
}

export default SerieForm;
