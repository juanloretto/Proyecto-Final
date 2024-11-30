// src/pages/Reglamento.jsx
import React from "react";
import "../css/Reglamento.css"; // Archivo CSS para estilos específicos


const Reglamento = () => {
  return (
    <div className="reglamento-container">
      <h2>Reglamento del Complejo</h2>
      <p>Lee atentamente las normas y reglamentos de nuestro complejo antes de hacer tu reserva.</p>

      <section className="reglamento-section">
        <h3>1. Reservas y Pagos</h3>
        <ul>
          <li>Las reservas deben realizarse con al menos 24 horas de anticipación.</li>
          <li>El pago de la reserva debe completarse antes del inicio del partido.</li>
          <li>Las cancelaciones deben notificarse con al menos 12 horas de antelación para poder reprogramar o solicitar reembolso.</li>
        </ul>
      </section>

      <section className="reglamento-section">
        <h3>2. Uso de la Cancha</h3>
        <ul>
          <li>El tiempo de uso de la cancha debe respetarse estrictamente; cualquier tiempo adicional estará sujeto a disponibilidad y costo extra.</li>
          <li>No se permite el ingreso de alimentos o bebidas alcohólicas en la cancha.</li>
          <li>Es obligatorio el uso de calzado adecuado (botines de césped sintético o zapatillas deportivas).</li>
        </ul>
      </section>

      <section className="reglamento-section">
        <h3>3. Responsabilidad y Seguridad</h3>
        <ul>
          <li>El complejo no se hace responsable por objetos perdidos o robados dentro de las instalaciones.</li>
          <li>Los jugadores deben respetar las reglas de juego limpio y comportamiento adecuado en todo momento.</li>
          <li>En caso de emergencia, el personal del complejo está capacitado para asistir. Por favor, respeta sus indicaciones.</li>
        </ul>
      </section>

      <section className="reglamento-section">
        <h3>4. Prohibiciones</h3>
        <ul>
          <li>No está permitido fumar dentro de las instalaciones del complejo.</li>
          <li>El uso de lenguaje inapropiado o conducta agresiva resultará en la expulsión inmediata sin derecho a reembolso.</li>
          <li>Se prohíbe el ingreso de bebidas alcoholicas a las instalaciones.</li>
        </ul>
      </section>

      <section className="reglamento-section">
        <h3>5. Normas de Limpieza</h3>
        <ul>
          <li>Los jugadores deben dejar la cancha en las mismas condiciones en las que la encontraron.</li>
          <li>El uso de los vestuarios y baños debe ser respetuoso, evitando el desperdicio de agua y papel.</li>
          <li>El complejo dispone de cestos de basura; por favor, deséchalos adecuadamente.</li>
        </ul>
      </section>
    </div>
  );
};

export default Reglamento;
