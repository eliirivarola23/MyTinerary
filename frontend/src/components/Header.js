import { Link } from "react-router-dom";
import NavBar from "./NavBar";

const Header = () => {
  return (
    <header>
      <NavBar />
      <div className="title">
        <h3>私 の 旅 程</h3>
        <h1>M Y T I N E R A R Y</h1>
        <h2>
          FIND YOUR PERFECT TRIP, DESIGNED BY INSIDERS WHO KNOW AND LOVE THEIR
          CITIES
        </h2>
        <Link className="hero" to="/cities">
          <p>CLICK HERE</p>
        </Link>
      </div>
    </header>
  );
};

export default Header;
