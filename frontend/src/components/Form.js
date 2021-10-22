import { Link } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import usuariosActions from "../redux/action/usuariosActions";
import GoogleLogin from "react-google-login";

const Form = (props) => {
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    url_foto: "",
    pais: "",
  });
  const inputNameHandler = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };
  const registrar = () => {
    const registrarUsuario = async () => {
      if (Object.values(usuario).includes("")) {
        mostrarMensaje("All fields are required");
      } else {
        try {
          let respuesta = await props.registrarUsuario(usuario);
          if (!respuesta.data.success) {
            respuesta.data.respuesta[0].message
              ? mostrarMensaje(respuesta.data.respuesta[0].message)
              : mostrarMensaje(respuesta.data.respuesta);
          }
          respuesta.data.success &&
            mostrarMensaje("Registered user successfully", "success");
        } catch (err) {
          mostrarMensaje("We have a problem, please try again later");
        }
      }
    };
    registrarUsuario();
  };

  const mostrarMensaje = (mensaje, icono) => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: icono || "warning",
      title: mensaje,
    });
  };

  const respuestaGoogle = async (response) => {
    let usuario = {
      nombre: response.profileObj.givenName,
      apellido: response.profileObj.familyName,
      url_foto: response.profileObj.imageUrl,
      password: response.profileObj.googleId,
      email: response.profileObj.email,
      pais: "Argentina",
      google: true,
    };
    try {
      let respuesta = await props.registrarUsuario(usuario);
      !respuesta.data.success
        ? mostrarMensaje(respuesta.data.respuesta)
        : mostrarMensaje("Registered user successfully", "success");
    } catch (err) {
      mostrarMensaje("We have a problem, please try again later");
    }
  };

  const paises = [
    "Afganistán",
    "Albania",
    "Alemania",
    "Andorra",
    "Angola",
    "Antigua y Barbuda",
    "Arabia Saudita",
    "Argelia",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaiyán",
    "Bahamas",
    "Bangladés",
    "Barbados",
    "Baréin",
    "Bélgica",
    "Belice",
    "Benín",
    "Bielorrusia",
    "Birmania",
    "Bolivia",
    "Bosnia y Herzegovina",
    "Botsuana",
    "Brasil",
    "Brunéi",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Bután",
    "Cabo Verde",
    "Camboya",
    "Camerún",
    "Canadá",
    "Catar",
    "Chad",
    "Chile",
    "China",
    "Chipre",
    "Ciudad del Vaticano",
    "Colombia",
    "Comoras",
    "Corea del Norte",
    "Corea del Sur",
    "Costa de Marfil",
    "Costa Rica",
    "Croacia",
    "Cuba",
    "Dinamarca",
    "Dominica",
    "Ecuador",
    "Egipto",
    "El Salvador",
    "Emiratos Árabes Unidos",
    "Eritrea",
    "Eslovaquia",
  ];

  return (
    <section className="formulario-caja">
      <div className="mb-3">
        <h2>Create Account!</h2>
        <p>Please fill the details to Sign Up!</p>
      </div>
      <form>
        <div className="mb-3">
          <input
            type="text"
            name="nombre"
            onChange={inputNameHandler}
            placeholder="First Name"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="apellido"
            onChange={inputNameHandler}
            placeholder="Last Name"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            name="email"
            onChange={inputNameHandler}
            placeholder="Email"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            name="password"
            onChange={inputNameHandler}
            placeholder="Password"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="url_foto"
            onChange={inputNameHandler}
            placeholder="URL of your picture"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <select
            className="form-control"
            name="pais"
            onChange={inputNameHandler}
          >
            <option className="option">Choose your country</option>
            {paises.map((pais, index) => (
              <option value={pais} key={index}>
                {pais}
              </option>
            ))}
          </select>
        </div>
      </form>
      <div className="mb-3 botonSub">
        <button type="submit" className="btn btn-primary" onClick={registrar}>
          Submit
        </button>
      </div>
      <GoogleLogin
        clientId="449628523643-i6mlv9530rqnelgmf3gribco7nvsi4vr.apps.googleusercontent.com"
        className="botonSub"
        buttonText="Create account with Google"
        onSuccess={respuestaGoogle}
        onFailure={respuestaGoogle}
        cookiePolicy={"single_host_origin"}
      />
      ,
      <div className="mb-3 p-2 botonSub ">
        <p>
          Do you already have an account?
          <Link to="/signIn">
            <span className="btn-primary"> Sign In here!</span>
          </Link>
        </p>
      </div>
    </section>
  );
};

const mapDispatchToProps = {
  ingresarCuenta: usuariosActions.ingresarCuenta,
  registrarUsuario: usuariosActions.registrarUsuario,
};

export default connect(null, mapDispatchToProps)(Form);
