import { connect } from "react-redux";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Itinerary from "../components/Itinerary";
import itinerariesAction from "../redux/action/itinerariesActions";
import ciudadesActions from "../redux/action/ciudadesActions";
import Swal from "sweetalert2";
import Preloader from "../components/Preloader";
import usuariosActions from "../redux/action/usuariosActions";


const City = (props) => {
  useEffect(() => {
    const fetchearItinerarios = async () => {
      try {
        await props.fetchearItinerarios(props.match.params.id);
        await props.ingresar(localStorage.getItem("token"));
      } catch (e) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "We have a problem showing you city. Try later",
        });
        props.history.push("/cities");
      }
    };
    fetchearItinerarios();
    if (!props.ciudades.length) {
      return props.fetchearCiudades();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!props.ciudades.length) {
    return <Preloader />;
  }

  const ciudad = props.ciudades.find(
    (ciudad) => ciudad._id === props.match.params.id
  );
  var itinerariosFiltrados = props.itinerarios.map((itinerario) => (
    <Itinerary itinerario={itinerario} id={props._id} key={itinerario._id} />
  ));

  if (!ciudad) {
    return (
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "We have a problem showing you city. Try later",
      }),
      setTimeout(() => {
        props.history.push("/cities")
      }, 1000)
    );
  }
  const condicion = !itinerariosFiltrados.length ? (
    <section className="sectionMT">
      <div className="caja g sectionMT">
        <div
          className="mensaje"
          style={{ backgroundImage: `url("/assets/montaña.jpg")` }}
        ></div>
        <h2>There are no itinerarios yet for this city</h2>
      </div>
    </section>
  ) : (
    itinerariosFiltrados
  );
  return (
    <>
      <div
        className="home"
        style={{ backgroundImage: `url("${ciudad.imagen}")` }}
      >
        <NavBar />
        <h2 className="h2-infoCity">Welcome to {ciudad.caption}</h2>
        {condicion}
        <nav className="home-infoCity2">
          <Link className="boton" to="/cities">
            <p>Back to Cities</p>
          </Link>
        </nav>
        <Footer />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    itinerarios: state.todosItinerarios.itinerarios,
    ciudades: state.todasCiudades.ciudades,
    _id: state.usuarios._id,
  };
};
const mapDispatchToProps = {
  fetchearItinerarios: itinerariesAction.obtenerItinerarios,
  fetchearCiudades: ciudadesActions.obtenerCiudades,
  ingresar: usuariosActions.ingresarLocalStorage,
};

export default connect(mapStateToProps, mapDispatchToProps)(City);
