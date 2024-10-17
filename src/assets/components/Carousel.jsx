import React from 'react';
import '../css/Carousel.css';

const Carousel = () => {
  return (
    <div className="carousel-container">
      <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img 
              src="https://img.freepik.com/foto-gratis/pelota-futbol-primer-plano-campo-borroso-detras_91128-4659.jpg" 
              className="d-block w-100" 
              alt="..." 
            />
            <div className="carousel-caption d-none d-md-block">
              <h2>Complejo La esférica</h2>
              <p>Descripción del complejo.</p>
            </div>
          </div>
          <div className="carousel-item">
            <img 
              src="https://img.freepik.com/foto-gratis/pelota-futbol-primer-plano-campo-borroso-detras_91128-4659.jpg" 
              className="d-block w-100" 
              alt="..." 
            />
          </div>
          <div className="carousel-item">
            <img 
              src="https://img.freepik.com/foto-gratis/pelota-futbol-primer-plano-campo-borroso-detras_91128-4659.jpg" 
              className="d-block w-100" 
              alt="..." 
            />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Carousel;
