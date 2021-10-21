import { useState } from "react";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import usuariosActions from "../redux/action/usuariosActions";
import GoogleLogin from "react-google-login";
import { Link } from "react-router-dom";

const FormSignIn = (props) => {
  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
  });

  const inputNameHandler = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  const ingresar = () => {
    const ingresarCuenta = async () => {
      if (Object.values(usuario).includes("")) {
        mostrarMensaje("All fields are required");
      } else if (!usuario.email.includes("@")) {
        mostrarMensaje("Enter a valid email");
      } else {
        try {
          let res = await props.ingresarCuenta(usuario);
          if (!res.data.success) {
            if (res.data.respuesta) {
              mostrarMensaje(res.data.respuesta);
            } else {
              mostrarMensaje("Incorrect username or password");
            }
          } else {
            mostrarMensaje("Welcome back!", "success")
         
          }
        } catch (e) {
          mostrarMensaje("We have a problem, please try again later");
        }
      }
    };
    ingresarCuenta();
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

  const responseGoogle = async (response) => {
    let usuario = {
      password: response.profileObj.googleId,
      email: response.profileObj.email,
      flagGoogle: true,
    };
    try {
      let res = await props.ingresarCuenta(usuario);
      if (!res.data.success) {
        mostrarMensaje("You do not have a registered account with Google");
      } else {
        mostrarMensaje("Welcome back!", "success");
      }
    } catch (e) {
      mostrarMensaje("We have a problem, please try again later");
    }
  };

  return (
    <section className="formulario-caja">
      <div className="mb-3">
        <h2>Log in to your account</h2>
      </div>
      <form>
        <div className="mb-3">
          <input
            type="email"
            name="email"
            onChange={inputNameHandler}
            placeholder="E-mail"
            className="form-control"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            name="password"
            onChange={inputNameHandler}
            placeholder="Password"
            className="form-control"
            aria-describedby=""
          />
        </div>
      </form>
      <div className="mb-3 botonSub">
        <button
          to="/"
          type="submit"
          className="btn btn-primary"
          onClick={ingresar}
        >
          log In
        </button>
      </div>
      <GoogleLogin
        clientId="449628523643-i6mlv9530rqnelgmf3gribco7nvsi4vr.apps.googleusercontent.com"
        buttonText="Sign in with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
      <div className="mb-3 p-2 botonSub botonSub2 ">
        <p>
          You do not have an account?
          <Link to="/signUp">
            <span className="btn-primary"> Sign up here!</span>
          </Link>
        </p>
      </div>
    </section>
  );
};

const mapDispatchToProps = {
  ingresarCuenta: usuariosActions.ingresarCuenta,
  registrarCuenta: usuariosActions.registrarUsuario,
};
export default connect(null, mapDispatchToProps)(FormSignIn);
