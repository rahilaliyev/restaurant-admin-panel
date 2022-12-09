import { NavLink } from "react-router-dom";
import Logo from "assets/img/Logo2.png";

const Sidebar = () => {
  return (
    <aside>
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="logger">
        <div className="logger-avatar">Z</div>
        <div className="logger-text">
          <h3>Zamir Babayev</h3>
          <span>Kassir</span>
        </div>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Ana səhifə</NavLink>
          </li>
          <li>
            <NavLink to="/orders">Sifarişlər</NavLink>
          </li>
          <li>
            <NavLink to="/waiters">Ofisiantlar</NavLink>
          </li>
          <li>
            <NavLink to="/meals">Yeməklər</NavLink>
          </li>
          <li>
            <NavLink to="#">Çıxış</NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
