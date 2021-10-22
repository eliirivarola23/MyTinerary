import { useEffect, useState } from "react";
import { connect } from "react-redux";
import actividadesActions from "../redux/action/actividadesActions";
import CarouselActivities from "./CarouselActivities";
import Swal from "sweetalert2";
import usuariosActions from "../redux/action/usuariosActions";
import itinerariesActions from "../redux/action/itinerariesActions";
import Comentario from "./Comentario";

const Itinerary = (props) => {
  const {
    foto,
    numeral,
    titulo,
    descripcion,
    creador,
    precio,
    duracion,
    meGusta,
    comentarios,
  } = props.itinerario;
  const [comentar, setComentar] = useState();
  const [cambiar, setCambiar] = useState(true);
  const [guardarComentarios, setGuardarComentarios] = useState(comentarios);
  const [corazon, setCorazon] = useState(meGusta);
  const menciones = numeral.map((hashtag) => `#` + hashtag + " ");
  const mostrarComentarios = () => {
    setCambiar(!cambiar);
  };
  const [activ, setActiv] = useState({ actividades: [] });
  useEffect(() => {
    const fetchearActividades = async () => {
      try {
        let res = await props.fetchearActividades(props.itinerario._id);
        setActiv(res);
      } catch (e) {
        mostrarMensaje("There was a problem, try later");
      }
    };
    fetchearActividades();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cambiar]);
  const capturar = (e) => {
    setComentar(e.target.value);
  };
  const crearComentario = async () => {
    if (!comentar) {
      mostrarMensaje("I can't be empty");
      return false;
    } else if (!props.token) {
      mostrarMensaje("debés estar logueado");
    } else {
      try {
        let res = await props.subirComentario(
          props.itinerario._id,
          {
            comentarios: {
              comentario: comentar,
              usuarioId: props._id,
              usuarioFoto: props.foto,
              usuarioNombre: props.nombre,
            },
          },
          props.token
        );
        if (!res.data.respuesta) {
          console.log("hubo un error ");
        }
        if (res.data.success) {
          let nuevoComentario = {
            comentario: comentar,
            usuarioId: props._id,
            usuarioFoto: props.foto,
            usuarioNombre: props.nombre,
          };
          setGuardarComentarios([...guardarComentarios, nuevoComentario]);
          mostrarMensaje("Comment registered successfully");
        } else {
          mostrarMensaje("There was a problem, try later");
        }
      } catch (e) {
        mostrarMensaje("There was a problem, try later");
      }
    }
  };
  const comentarioArray = guardarComentarios.map((com, index) => (
    <Comentario
      key={com._id}
      id={props._id}
      comentario={com}
      itinerarioId={props.itinerario._id}
    />
  ));

  const likear = () => {
    const fetchearMeGusta = async () => {
      try {
        if (!props.token) {
          mostrarMensaje("You must be logged in to like it");
        } else {
          let res = await props.fetchearMeGusta(
            props.itinerario._id,
            props.token
          );
          if (res.success) {
            setCorazon(res.respuesta);
          }
        }
      } catch (e) {
        mostrarMensaje("There was a problem, try later");
      }
    };
    fetchearMeGusta();
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
  const CajaComentarios = (
    <div className="caja">
      <div
        className="fotosItinerarios"
        style={{ backgroundImage: `url("/assets/"")` }}
      >
        <CarouselActivities actividades={activ} />
      </div>
      <div className="g">
        <h2>COMMENTS</h2>
        <div className="scroll">{comentarioArray}</div>
        <input
          text="text"
          className="comentarioInput"
          placeholder="Write your comment"
          onChange={capturar}
        ></input>
        <button className="boton2" onClick={crearComentario}>
          Submit
        </button>
      </div>
    </div>
  );

  return (
    <section className="sectionMT">
      <div className="grande">
        <div className="caja">
          <p>{creador[0].nombre}</p>
          <div
            className="usuario"
            style={{
              backgroundImage: `url("${creador[0].foto}")`,
            }}
          ></div>
          <div className="g">
            <div
              className="heart"
              style={{
                backgroundImage: `url(${
                  !corazon.includes(props._id)
                    ? "https://i.postimg.cc/pLvFKhTm/heart.png"
                    : "https://i.postimg.cc/HLZ8G6tM/corazon.png"
                })`,
              }}
              onClick={likear}
            >
              <p>{corazon.length}</p>
            </div>
            <h2>{titulo}</h2>
            <p>
              {descripcion}
              <br></br>
              {menciones}
            </p>
            <div
              className="imagen"
              style={{ backgroundImage: `url("/assets/${foto[0]}")` }}
            ></div>
            <div className="imagen2">
              <p>
                Price:{"💰".repeat(precio)} Duration:{"🕜".repeat(duracion)}
              </p>
            </div>
          </div>
        </div>
        {!cambiar && CajaComentarios}
      </div>

      <button className="boton" onClick={mostrarComentarios}>
        {cambiar ? "View More" : "View Less"}
      </button>
    </section>
  );
};

const mapDispatchToProps = {
  fetchearActividades: actividadesActions.obtenerActividades,
  fetchearMeGusta: itinerariesActions.meGusta,
  ingresar: usuariosActions.ingresarLocalStorage,
  subirComentario: itinerariesActions.crearComentario,
  traerFotito: usuariosActions.traerUsuario,
};
const mapStateToProps = (state) => {
  return {
    token: state.usuarios.token,
    nombre: state.usuarios.nombre,
    foto: state.usuarios.url_foto,
    apellido: state.usuarios.apellido,
    _id: state.usuarios._id,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Itinerary);
