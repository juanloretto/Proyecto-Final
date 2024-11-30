import React from "react";
import Carousel from "./Carousel";
import Card from "./Card";
import ProductCard from "./ProductCard";
import "../css/Main.css";

const Main = ({ onReservar }) => {
  return (
    <main className="mn-main-container">
      <section className="mn-hero">
        <div className="mn-hero-content">
          <h1 className="mn-hero-title">Bienvenido al Complejo La Esférica</h1>
          <p className="mn-hero-subtitle">
            ¡La mejor experiencia para disfrutar del fútbol!
          </p>
        </div>
      </section>
      <Carousel />
      <section className="mn-cards-section">
        <h2 className="mn-section-title">Nuestras Canchas</h2>
        <div className="mn-cards-container">
          {Array.from({ length: 5 }).map((_, index) => (
            <Card key={index} index={index} onReservar={onReservar} />
          ))}
        </div>
      </section>

      {/* Sección de Productos */}
      <div className="main-container">
      <h2>Productos Disponibles</h2>
      <div className="product-cards-container">
        <ProductCard index={0} />
        
      </div>
    </div>

      <section className="mn-text-image-section">
        <div className="mn-text-container">
          <h2 className="mn-section-title">La Mejor Experiencia de Juego</h2>
          <p className="mn-text-description">
            Nuestras canchas están equipadas con todo lo necesario para que
            disfrutes de una gran experiencia de juego. Perfectas para grupos de
            amigos, torneos o simplemente para divertirte. ¡Ven y vive la emoción!
          </p>
          <p className="mn-text-description">
            Además, contamos con un ambiente seguro y cómodo para que disfrutes de tu
            partido sin preocupaciones. Ven a La Esférica y únete a la comunidad de futboleros.
          </p>
        </div>
        <div className="mn-image-container">
          <img
            src="https://www.baenegocios.com/img/2020/10/01/f5.jpg?__scale=w:1200,h:675,t:2,p:6"
            alt="Experiencia de juego"
            className="mn-image"
          />
        </div>
      </section>
    </main>
  );
};

export default Main;
