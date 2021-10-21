import axios from "axios";

const ciudadesActions = {
  obtenerCiudades: () => {
    return async (dispatch, getState) => {
      let res = await axios.get("http://localhost:4000/api/cities");
      dispatch({ type: "OBTENER_CIUDADES", payload: res.data.respuesta });
    };
  },
  ciudadAFiltrar: (ciudadBuscada) => {
    return (dispatch, getState) => {
      dispatch({ type: "FILTRAR_CIUDADES", payload: ciudadBuscada });
    };
  },
};

export default ciudadesActions;
