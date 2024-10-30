import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Detalle.css';

const canchasData = [
  {
    id: 1,
    nombre: "Cancha 1",
    descripcion: "Césped natural de alta calidad. Perfecta para partidos amistosos.",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOrBmHU0RY-7pNjFKIae0Ql9W0gaQ_RwF-aQ&s",
    horarios: ["10:00 - 11:00", "11:30 - 12:30", "13:00 - 14:00"],
    dias: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
  },
  {
    id: 2,
    nombre: "Cancha 2",
    descripcion: "Cancha cubierta, ideal para entrenamientos.",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOrBmHU0RY-7pNjFKIae0Ql9W0gaQ_RwF-aQ&s",
    horarios: ["14:00 - 15:00", "15:30 - 16:30", "17:00 - 18:00"],
    dias: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
  },
  {
    id: 3,
    nombre: "Cancha 3",
    descripcion: "Cancha de césped sintético, perfecta para entrenar y jugar.",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOrBmHU0RY-7pNjFKIae0Ql9W0gaQ_RwF-aQ&s",
    horarios: ["08:00 - 09:00", "09:30 - 10:30", "11:00 - 12:00"],
    dias: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
  },
  {
    id: 4,
    nombre: "Cancha 4",
    descripcion: "Cancha al aire libre con iluminación.",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOrBmHU0RY-7pNjFKIae0Ql9W0gaQ_RwF-aQ&s",
    horarios: ["18:00 - 19:00", "19:30 - 20:30", "21:00 - 22:00"],
    dias: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
  },
  {
    id: 5,
    nombre: "Cancha 5",
    descripcion: "Cancha con medidas reglamentarias, ideal para torneos.",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOrBmHU0RY-7pNjFKIae0Ql9W0gaQ_RwF-aQ&s",
    horarios: ["12:00 - 13:00", "13:30 - 14:30", "15:00 - 16:00"],
    dias: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"],
  },
];

const Detalle = () => {
  const location = useLocation();
  const { canchaId } = location.state || {}; // Obtener el ID de la cancha

 
  const cancha = canchasData.find(c => c.id === canchaId);

 
  if (!cancha) {
    return <h1>Cancha no encontrada</h1>;
  }

  const handleReservar = (dia, horario) => {
    alert(`Reservaste la ${cancha.nombre} para el ${dia} a las ${horario}`);
   
    window.scrollTo(0, 0);
  };


  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [canchaId]);

  return (
    <div className="detalle-container">
      <h1>Detalles de la {cancha.nombre}</h1>
      <img src={cancha.imagen} alt={cancha.nombre} className="detalle-imagen" />
      <p>{cancha.descripcion}</p>

      <h2>Opciones de Reserva</h2>
      <div>
        <h3>Días Disponibles:</h3>
        <ul>
          {cancha.dias.map(dia => (
            <li key={dia}>
              {dia}
              <ul>
                {cancha.horarios.map(horario => (
                  <li key={horario}>
                    {horario}
                    <button onClick={() => handleReservar(dia, horario)}>Reservar</button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Detalle;
