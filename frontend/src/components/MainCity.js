import React from "react";
import { Link } from "react-router-dom";

const MainCity = ({ ciudad }) => {
  return (
    <section className="seccion-galeria">
      <div
        className="galeria"
        key={ciudad.caption}
        style={{
          backgroundImage: `url("${ciudad.imagen}")`,
        }}
      >
        <Link to={`/city/${ciudad._id}`}>
          <div className="cajaDescripcion">
            <h2>{ciudad.caption}</h2>
            <p className="descripcion"> {ciudad.descripcion}</p>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default MainCity;
