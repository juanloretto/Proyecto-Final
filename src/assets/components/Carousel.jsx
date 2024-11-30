import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../css/Carousel.css';

const Carousel = () => {
  const images = [
    {
      src: "https://img.freepik.com/fotos-premium/estadio-futbol-luces-cancha_846334-521.jpg",
      alt: "Imagen de fútbol 1",
      link: "/canchas",
      title: "¡Juega en la mejor cancha!"
    },
    {
      src: "https://inovafit.com.mx/wp-content/uploads/2018/06/fucho.jpg",
      alt: "Imagen de fútbol 2",
      link: "/reservas",
      title: "¿Estan listos para un torneo?"
    },
    {
      src: "https://img.freepik.com/fotos-premium/cerca-delantero-futbol-listo-patear-pelota-fuego-estadio_207634-7.jpg",
      alt: "Imagen de fútbol 3",
      link: "/contacto",
      title: "Contáctanos para más información"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-container">
      <div className="carousel-slide">
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          className="carousel-image"
        />
        <div className="carousel-overlay">
          <h2>{images[currentIndex].title}</h2>
        </div>
      </div>
      <div className="carousel-buttons">
        <button className="carousel-btn prev" onClick={prevSlide}>
          &#10094;
        </button>
        <button className="carousel-btn next" onClick={nextSlide}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
