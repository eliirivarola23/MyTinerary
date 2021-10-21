import { Link } from "react-router-dom";

const NotFound =() => {
return (
    <div
      className="home, title notFound"
      style={{ backgroundImage: `url("/assets/Proyecto2.png")` }}
    >
    <h1>404</h1>
    <h2>There is nothing yet, soon we will have something for you!</h2>
    <nav className="hero">
        <Link className="button" to="/">
        <p>Back to Home</p>
        </Link>
    </nav>
    </div>
);
}

export default NotFound;
