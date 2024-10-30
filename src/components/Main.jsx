import React from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from './Carousel';
import './Main.css';

const Main = () => {
  const navigate = useNavigate();

  
  const handleReservar = (canchaId) => {
    navigate(`/detalle`, { state: { canchaId } });
  };

  return (
    <main className="main-container">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">¡Bienvenido al Complejo La Esférica!</h1>
          <p className="hero-subtitle">¡La mejor experiencia para disfrutar del fútbol!</p>
          <p className='hero-subtitle'> ¡ Reserva ahora ! </p>
          <button className="cta-button">Explorar Canchas</button>
        </div>
      </section>
      <Carousel />
      <section className="cards-section">
        <h2 className="hero-title">Nuestras Canchas</h2>
        <div className="cards-container"> 
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="card" key={index}>
              <img
                src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOrBmHU0RY-7pNjFKIae0Ql9W0gaQ_RwF-aQ&s`}
                alt={`Canchas ${index + 1}`}
                className="card-image"
              />
              <div className="card-content">
                <h3 className="hero-subtitle">Cancha {index + 1}</h3>
                <p className="card-description">Disfruta de la emoción en nuestra cancha de fútbol, con césped natural de alta calidad y medidas reglamentarias. Perfecta para partidos amistosos, competitivos y entrenamientos.</p>
                <button className="button" onClick={() => handleReservar(index + 1)}>Reservar Ahora</button> 
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="text-image-section">
        <div className="text-container">
          <h2 className="hero-title">La Mejor Experiencia de Juego</h2>
          <p className="text-description">
            Nuestras canchas están equipadas con todo lo necesario para que disfrutes de una gran experiencia de juego. 
            Perfectas para grupos de amigos, torneos o simplemente para divertirte.
          </p>
        </div>
        <div className="image-container">
          <img
            src="https://www.baenegocios.com/img/2020/10/01/f5.jpg?__scale=w:1200,h:675,t:2,p:6"
            alt="Experiencia de juego"
            className="image"
          />
        </div>
      </section>
    </main>
  );
};

export default Main;
