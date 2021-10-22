import { connect } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import usuariosActions from "../redux/action/usuariosActions";

const NavBar = (props) => {
  return (
    <>
      <nav className="navbar navbar-expand-sm  p-0">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <img
              className="navbar-toggler-icon  user2"
              src="/assets/logo.png"
              alt="logo-user"
              width="20px"
            />
          </button>
          <div className="navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/">
                  <img
                    className="logo"
                    src="/assets/logo.png"
                    alt="imagenLogo"
                  />
                </Link>
              </li>
              <li className="nav-item">
                <NavLink exact to="/" className="nav-link">
                  HOME
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/cities" className="nav-link">
                  CITIES
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                {!props.token ? (
                  <p
                    className="nav-link dropdown-toggle"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img
                      className="user"
                      src="/assets/user.png"
                      alt="logo-user"
                    />
                  </p>
                ) : (
                  <p
                    className="nav-link dropdown-toggle"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img className="user2" src={props.foto} alt="logo-user" />
                  </p>
                )}
                {!props.token ? (
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li>
                      <Link to="signIn" className="dropdown-item">
                        SIGN IN
                      </Link>
                    </li>
                    <li>
                      <Link to="signUp" className="dropdown-item">
                        SIGN UP
                      </Link>
                    </li>
                  </ul>
                ) : (
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li className="nav-link">
                      {props.token && (
                        <p className="dropdown-item">Welcome {props.nombre}</p>
                      )}
                    </li>
                    <li>
                      <p
                        className="p dropdown-item"
                        onClick={() => props.salir()}
                      >
                        Log Out
                      </p>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    nombre: state.usuarios.nombre,
    token: state.usuarios.token,
    foto: state.usuarios.url_foto,
  };
};

const mapDispatchToProps = {
  salir: usuariosActions.salir,
};
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
