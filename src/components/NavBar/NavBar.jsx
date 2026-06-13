import { NavLink } from "react-router-dom";
import { Tv, Home, Info, List, Plus } from "lucide-react";

function NavBar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="logo">
        <Tv size={20} />
        Serie Journal
      </NavLink>

      <ul className="nav-links">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            <Home size={15} />
            Início
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/sobre"
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            <Info size={15} />
            Sobre
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/serielist"
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            <List size={15} />
            Minhas Séries
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/cadastro"
            className={({ isActive }) =>
              `nav-item nav-cta ${isActive ? "active" : ""}`
            }
          >
            <Plus size={15} />
            Cadastrar
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
