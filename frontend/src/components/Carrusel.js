import React, { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from "reactstrap";

let items = [
  {
    ciudades: [
      { imagen: "tokio.jpg", caption: "Tokyo" },
      { imagen: "kioto.jpg", caption: "Kyoto" },
      { imagen: "Kamakura.jpg", caption: "Kamakura" },
      { imagen: "fukuka.jpg", caption: "Fukuka" },
    ],
  },
  {
    ciudades: [
      { imagen: "nagasaki.jpg", caption: "Nagasaki" },
      { imagen: "sapporo.jpg", caption: "Sapporo" },
      { imagen: "osaka.jpg", caption: "Osaka" },
      { imagen: "itsukushima.jpg", caption: "Itsukushima" },
    ],
  },
  {
    ciudades: [
      { imagen: "Hakone.jpg", caption: "Hakone" },
      { imagen: "Matsumoto.jpg", caption: "Matsumoto" },
      { imagen: "osaka.jpg", caption: "Tokyo" },
      { imagen: "Okinawa.jpg", caption: "Okinawa" },
    ],
  },
];

const Carrusel = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item, index) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={index}
      >
        <div className="cajaFotos">
          {item.ciudades.map((city) => (
            <div
              className="foto"
              key={city.caption}
              style={{
                backgroundImage: `url("/assets/galeria/${city.imagen}")`,
              }}
            >
              <p className="ciudades">{city.caption}</p>
            </div>
          ))}
        </div>
      </CarouselItem>
    );
  });

  return (
    <Carousel activeIndex={activeIndex} next={next} previous={previous}>
      <CarouselIndicators
        items={slides}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        directionText=" "
        direction="prev"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText=" "
        onClickHandler={next}
      />
    </Carousel>
  );
};

export default Carrusel;
