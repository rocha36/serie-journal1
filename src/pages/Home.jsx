import { Link } from "react-router-dom";
import { Plus, List } from "lucide-react";
import "./Home.css";

function Home() {
  return (
    <section className="home">
      <div className="home-content">
        <span className="home-badge">
          <span className="home-badge-line"></span>
          Seu diário de séries
          <span className="home-badge-line"></span>
        </span>

        <h1 className="home-title">
          Bem-vindo ao Serie Journal
          <em>organize. acompanhe. registre.</em>
        </h1>

        <div className="home-divider"></div>

        <p className="home-description">
          Nunca mais perca o controle dos episódios assistidos. Mantenha seu
          catálogo pessoal sempre atualizado em um único lugar.
        </p>

        <div className="home-buttons">
          <Link to="/cadastro" className="btn-link">
            <button className="btn-primary">
              <Plus size={15} /> Comece Agora
            </button>
          </Link>
          <Link to="/serielist" className="btn-link">
            <button className="btn-outline">
              <List size={15} /> Minhas Séries
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Home;
