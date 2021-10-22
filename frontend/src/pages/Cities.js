import React, { useState } from "react";
import NavBar from "../components/NavBar";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import ciudadesActions from "../redux/action/ciudadesActions";
import Preloader from "../components/Preloader";
import Footer from "../components/Footer";
import MainCity from "../components/MainCity";

const Cities = (props) => {
  const [cargando, SetCargando] = useState(true);
  useEffect(() => {
    async function fetchearCiudades() {
      try {
        await props.fetchearCiudades();
      } catch (e) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "We have a problem. Try later",
        });
        props.history.push("/");
      } finally {
        SetCargando(!cargando);
      }
    }
    fetchearCiudades();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (cargando) {
    return <Preloader />;
  }

  let CiudadesTodas = props.ciudadesFiltradas.map((ciudad) => (
    <MainCity ciudad={ciudad} key={ciudad._id} />
  ));

  const mensaje = (
    <div className="ciudadNoEncontrada">
      <img src="/assets/jap.png" alt="logo" />
      <h2>Oops! There are no matches with your search. Try another city</h2>
    </div>
  );

  const ciudadesAMostrar = !CiudadesTodas.length ? mensaje : CiudadesTodas;

  return (
    <div
      className="home"
      style={{
        backgroundImage: `url("https://i.postimg.cc/htFzFLNt/itsukushima.jpg ")`,
      }}
    >
      <NavBar />
      <section>
        <div className="cities">
          <h2>Find your next adventure</h2>
          <input
            onChange={(e) =>
              props.filtroCiudades(e.target.value.toLowerCase().trim())
            }
            className="buscador"
            type="text"
            name="nombre"
            placeholder="Search City"
          />
        </div>
        <div className="cajaGaleria">{ciudadesAMostrar}</div>
      </section>
      <Footer />
    </div>
  );
};

const mapDispatchToProps = {
  fetchearCiudades: ciudadesActions.obtenerCiudades,
  filtroCiudades: ciudadesActions.ciudadAFiltrar,
};

const mapStateToProps = (state) => {
  return {
    ciudadesFiltradas: state.todasCiudades.ciudadFiltrada,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cities);
