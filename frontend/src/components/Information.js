import React from "react";

const Information = () => {
  return (
    <>
      <section className="main2">
        <h2>
          The application that gives you all the information about your trip in
          just one place: travel itineraries, information about activities and
          services so that you arrive at your destination 100% prepared.
        </h2>
        <div className="information">
          <div style={{ backgroundImage: `url("/assets/info.png")` }}></div>
          <div style={{ backgroundImage: `url("/assets/info2.png")` }}></div>
          <div style={{ backgroundImage: `url("/assets/info3.png")` }}></div>
        </div>
      </section>
    </>
  );
};

export default Information;
