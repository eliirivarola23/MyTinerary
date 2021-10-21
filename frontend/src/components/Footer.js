import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="nav-footer">
        <nav>
          <Link to="/">
            <p>HOME</p>
          </Link>
          <Link to="/cities">
            <p>CITIES</p>
          </Link>
          <Link to="/notFound">
            <p>ABOUT</p>
          </Link>
          <Link to="/notFound">
            <p>SIGN UP</p>
          </Link>
        </nav>
        <p>MyTinerary Project 2021 © All Rights Reserved</p>

        <div className="redesSociales">
          <Link to="/">
            <img
              className="logoRedes"
              src="/assets/facebook.png"
              alt="imagenRedes"
            />
          </Link>
          <Link to="/">
            <img
              className="logoRedes"
              src="/assets/instagram.png"
              alt="imagenRedes"
            />
          </Link>
          <Link to="/">
            <img
              className="logoRedes"
              src="/assets/twitter.png"
              alt="imagenRedes"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
