import axios from "axios";

const actividadesActions = {
  obtenerActividades: (id) => {
    return async (dispatch, getState) => {
      try {
        let res = await axios.get(
          `http://localhost:4000/api/actividades/${id}`
        );
        return res.data.respuesta

      } catch (e) {
        console.log(e);
      }
    };
  },
};

export default actividadesActions;
