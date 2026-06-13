import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  Tv,
  Clapperboard,
  Building2,
  Calendar,
  Eye,
  Pencil,
  Trash2,
  Tags,
  ArrowLeft,
} from "lucide-react";
import "./SerieList.css";

function SerieList({ series, excluirSerie }) {
  const navigate = useNavigate();
  const [textoBusca, setTextoBusca] = useState("");
  const [busca, setBusca] = useState("");

  function editarSerie(id) {
    navigate(`/cadastro/${id}`);
  }

  function pesquisar() {
    setBusca(textoBusca.trim());
  }

  function limparBusca() {
    setTextoBusca("");
    setBusca("");
  }

  function formatarData(data) {
    if (!data) return "-";
    return new Date(data).toLocaleDateString("pt-BR");
  }

  const filtradas = series.filter((serie) => {
    const categorias = Array.isArray(serie.category)
      ? serie.category.join(" ")
      : serie.category || "";

    return `${serie.titulo} ${serie.director} ${categorias}`
      .toLowerCase()
      .includes(busca.toLowerCase());
  });

  return (
    <section className="serielist">
      <div className="serielist-header">
        <span className="serielist-badge">
          <span className="serielist-badge-dot"></span>
          Catálogo
        </span>

        <h1 className="serielist-title">Minhas Séries</h1>

        <p className="serielist-subtitle">
          {series.length}{" "}
          {series.length === 1 ? "série cadastrada" : "séries cadastradas"}
        </p>
      </div>

      <div className="serielist-toolbar">
        <div className="serielist-search">
          <Search size={16} className="serielist-search-icon" />

          <input
            type="text"
            placeholder="Buscar por título, diretor ou gênero..."
            value={textoBusca}
            onChange={(e) => setTextoBusca(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && pesquisar()}
            className="serielist-input"
          />

          <button onClick={pesquisar} className="serielist-search-btn">
            Buscar
          </button>
        </div>

        <div className="serielist-actions">
          <button onClick={() => navigate("/cadastro")} className="btn-new">
            <Plus size={16} />
            Nova Série
          </button>

          {busca && (
            <button onClick={limparBusca} className="btn-clear">
              <ArrowLeft size={16} />
              Limpar
            </button>
          )}
        </div>
      </div>

      {filtradas.length === 0 ? (
        <div className="serielist-empty">
          <p>Nenhuma série encontrada.</p>
        </div>
      ) : (
        <div className="serielist-grid">
          {filtradas.map((serie) => (
            <div key={serie.id} className="serie-card">
              <div className="serie-card-header">
                <h3 className="serie-card-title">{serie.titulo}</h3>

                <div className="serie-card-actions">
                  <button
                    onClick={() => editarSerie(serie.id)}
                    className="btn-edit"
                    title="Editar"
                  >
                    <Pencil size={15} />
                  </button>

                  <button
                    onClick={() => excluirSerie(serie.id)}
                    className="btn-delete"
                    title="Excluir"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              <div className="serie-card-divider"></div>

              {/* CAPA DA SÉRIE */}
              {serie.poster && (
                <div className="serie-poster-container">
                  <img
                    src={serie.poster}
                    alt={serie.titulo}
                    className="serie-poster"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              )}

              <ul className="serie-card-info">
                <li>
                  <Tv size={14} />
                  <span className="info-label">Temporadas</span>
                  <span className="info-value">{serie.seasons}</span>
                </li>

                <li>
                  <Clapperboard size={14} />
                  <span className="info-label">Diretor</span>
                  <span className="info-value">{serie.director}</span>
                </li>

                <li>
                  <Building2 size={14} />
                  <span className="info-label">Produtora</span>
                  <span className="info-value">{serie.producer}</span>
                </li>

                <li>
                  <Calendar size={14} />
                  <span className="info-label">Lançamento</span>
                  <span className="info-value">{serie.releaseYear}</span>
                </li>

                <li>
                  <Eye size={14} />
                  <span className="info-label">Assistido em</span>
                  <span className="info-value">
                    {formatarData(serie.watchedOn)}
                  </span>
                </li>
              </ul>

              <div className="serie-card-tags">
                <Tags size={13} />

                {(Array.isArray(serie.category)
                  ? serie.category
                  : [serie.category]
                )
                  .filter(Boolean)
                  .map((cat, i) => (
                    <span key={i} className="serie-tag">
                      {cat}
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default SerieList;
