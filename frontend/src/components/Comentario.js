import { useState } from "react";
import itinerariesActions from "../redux/action/itinerariesActions";
import { connect } from "react-redux";

const Comentario = (props) => {
  console.log(props)
const [comentario, setComentario] = useState(props.comentario)
// console.log(comentario)
  const [comentar, setComentar] = useState();
  const [cambiar, setCambiar] = useState(false);
  const [modificar, setModificar] = useState("Modificar");

  const capturar = (e) => {
    setComentar(e.target.value);
  };

  const eliminarComentario = async () => {
    try {
      let res = await props.borrarComentario(
        props.itinerarioId,comentario._id
        )
        // console.log(res)
    }catch(e){
      console.log(e)
    }
  };

  const grabar = async () => {
    console.log("entre");
    try {
      setCambiar(!cambiar);
      let res = await props.subirComentario("6120839c52576d306cb021f4", {
        comentarios: { comentario: comentar, idComment: props.comentario._id },
      });
      if(res.success) {
        alert("Hecho");
      }
    } catch (e) {
      console.log(e);
    }
  };
  var claro = !cambiar ? props.comentario.comentario : comentar;
  
  return (
    <>
      <div className="comentario">
      {comentario.usuarioNombre}
        <div
          className="usuario2"
          style={{ backgroundImage: `url("${comentario.usuarioFoto}")` }}
        ></div>
        
        {!cambiar ? (
          <p style={{ color: "white" }}>{claro}</p>
        ) : (
          <textarea
            className="comentarioInput"
            rows="4"
            cols="50"
            onChange={capturar}
          >
            {comentario.comentario}
            
          </textarea>
        )}
        {/* <button className="boton2" onClick={eliminarComentario}>X
        </button> */}
        {/* console.log('hola') */}
        {/* <button className="boton2" onClick={eliminarComentario}>
          {modificar}
        </button>
        <button className="boton2" onClick={grabar}>
          Si
        </button> */}
      </div>
    </>
  );
};
const mapDispatchToProps = {
  borrarComentario: itinerariesActions.borrarComentario,
}
const mapStateToProps = (state) => {
  return {
    token: state.usuarios.token,
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Comentario);
