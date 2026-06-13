import "./Sobre.css";
import { Target, ListChecks, Users, Info } from "lucide-react";

function Sobre() {
  return (
    <section className="sobre">
      <div className="sobre-header">
        <span className="sobre-badge">
          <span className="sobre-badge-line"></span>
          Serie Journal
          <span className="sobre-badge-line"></span>
        </span>
        <h1 className="sobre-title">Sobre o Projeto</h1>
        <p className="sobre-subtitle">
          Seu companheiro pessoal para organizar e acompanhar suas séries
          favoritas
        </p>
      </div>

      <div className="sobre-destaque">
        <div className="sobre-destaque-icon">
          <Info size={18} />
        </div>
        <div>
          <h2 className="sobre-destaque-title">O que é o Serie Journal?</h2>
          <p className="sobre-destaque-text">
            É uma aplicação web para organizar séries assistidas ou planejadas,
            permitindo cadastro completo com informações como título,
            temporadas, ano de lançamento, diretores, produtoras e gêneros.
          </p>
        </div>
      </div>

      <div className="sobre-cards">
        <div className="sobre-card">
          <div className="sobre-card-icon">
            <Target size={20} />
          </div>
          <h3 className="sobre-card-title">Objetivo</h3>
          <p className="sobre-card-text">
            Organizar e centralizar todas as séries assistidas ou planejadas,
            eliminando perda de controle e informações dispersas.
          </p>
        </div>

        <div className="sobre-card">
          <div className="sobre-card-icon">
            <ListChecks size={20} />
          </div>
          <h3 className="sobre-card-title">Funcionalidades</h3>
          <p className="sobre-card-text">
            Cadastro de séries, múltiplos gêneros, edição, exclusão, busca por
            título, diretor ou gênero e listagem em cards.
          </p>
        </div>

        <div className="sobre-card">
          <div className="sobre-card-icon">
            <Users size={20} />
          </div>
          <h3 className="sobre-card-title">Para quem é</h3>
          <p className="sobre-card-text">
            Para qualquer pessoa que consome séries e quer manter controle real
            e organizado do que assiste ou pretende assistir.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Sobre;
