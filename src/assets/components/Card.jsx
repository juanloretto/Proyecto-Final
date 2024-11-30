import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/Card.css";

const Card = ({ index }) => {
  const navigate = useNavigate();

  // Datos de las canchas
  const canchas = [
    {
      title: "Cancha 1",
      description:
        "Césped natural de alta calidad, ideal para partidos amistosos con amigos.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw5RWF1UZ1zHZz1sRmHWztkLPBsO51ddLluA&s",
    },
    {
      title: "Cancha 2",
      description:
        "Césped sintético perfecto para entrenamientos y partidos nocturnos.",
      image:
        "https://media-cdn.tripadvisor.com/media/photo-s/07/8c/06/5d/el-clasico-futbol-5.jpg",
    },
    {
      title: "Cancha 3",
      description:
        "Medidas reglamentarias para competencias oficiales y torneos.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLO5IJiijdK-Ybo4Eft_yzB74eSTaMW2anevTjfyYlupXmh0xqIPxppc3edEJogt4mJQw&usqp=CAU",
    },
    {
      title: "Cancha 4",
      description:
        "Espacio ideal para actividades recreativas y clases de fútbol.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNelHVlKPTi7Rr3k3bMJkKv0Y747IlE6icK7LHmQihMV1EvXdeyGK6V-d7YIFOXh4RX8I&usqp=CAU",
    },
    {
      title: "Cancha 5",
      description:
        "Zona techada con césped artificial de última generación, ideal para cualquier clima.",
      image:
        "https://guia.devenado.ar/IMG/oxigeno-futbol-5-id11250_1-w640-h480-m1.jpg",
    },
  ];

  // Obteniendo los datos de la cancha correspondiente
  const cancha = canchas[index];

  // Redirige a la página de reservas
  const handleReservar = () => {
    navigate("/reservas", { state: { cancha } });
  };

  return (
    <div className="card">
      <img src={cancha.image} alt={cancha.title} className="card-image" />
      <div className="card-content">
        <h3 className="hero-subtitle">{cancha.title}</h3>
        <p className="card-description">{cancha.description}</p>
        <div className="button-container">
          <button className="button" onClick={handleReservar}>
            Reservar Ahora
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
