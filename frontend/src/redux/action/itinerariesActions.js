import axios from "axios";

const itinerariesAction = {
  obtenerItinerarios: (id) => {
    return async (dispatch, getState) => {
      let res = await axios.get(`http://localhost:4000/api/itineraries/${id}`);
      let info = res.data.respuesta;
      dispatch({ type: "OBTENER_ITINERARIOS", payload: info });
    };
  },
  meGusta: (id, token) => {
    return async () => {
     try {
      let res = await axios.put(`http://localhost:4000/api/itinerary/meGusta/${id}`, {}, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      return res.data
     } catch(e) { console.log(e)}
    }
  }, 
  crearComentario: (id,comentario,token) => {
    return async () => {
      try {
        let res = await axios.put(`http://localhost:4000/api/itinerary/comentario/${id}`, {...comentario},
        {
          headers: {
            Authorization: "Bearer " + token,
          }
        })
        return res
      }
      catch(e) {
        console.log(e)
      }
    }
  },
  borrarComentario: (id,comentarioId) => {
    console.log(id,comentarioId)
    return async () => {
      try{
        let res = await axios.delete(`http://localhost:4000/api/itinerary/comentario/${id}`,{comentario: comentarioId}
        // {
        //   headers: {
        //     Authorization: "Bearer " + token,
        //   }
        // }
        )
        console.log(res.data)
        return res
      } catch(e) {
        console.log(e)
      }
    }
  }
};

export default itinerariesAction;
