import { useState } from "react";
import itinerariesActions from "../redux/action/itinerariesActions";
import { connect } from "react-redux";

const Comentario = (props) => {
  const [comentario, setComentario] = useState(props.comentario);

  return (
    <>
      <div className="comentario">
        <div
          className="usuario2"
          style={{ backgroundImage: `url("${comentario.usuarioFoto}")` }}
        ></div>
        <div className="cajaComentario">
          <p style={{ color: "white" }}>{comentario.usuarioNombre}</p>
          <p style={{ color: "white" }}>{props.comentario.comentario}</p>
        </div>
      </div>
    </>
  );
};
const mapDispatchToProps = {
  borrarComentario: itinerariesActions.borrarComentario,
};
const mapStateToProps = (state) => {
  return {
    token: state.usuarios.token,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Comentario);
