import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import '../css/Contacto.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <header className="contact-header">
        <h1>¡Contáctanos, estamos aquí para ayudarte!</h1>
        <p>Déjanos tu mensaje y nos pondremos en contacto contigo lo más rápido posible.</p>
      </header>

      <section className="contact-info">
        <div className="contact-details">
          <h2>Información de contacto</h2>
          <ul>
            <li><strong>Dirección:</strong> Gral.Paz 576, Tucuman, Argentina</li>
            <li><strong>Teléfono:</strong> (381) 357-35400</li>
            <li><strong>Correo:</strong> laesferica@gmail.com</li>
          </ul>
          <div className="social-links">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon"><FaFacebookF /></a>
            <a href="https://www.x.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon"><FaTwitter /></a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon"><FaInstagram /></a>

          </div>
          <section className="contact-map">
        <h2>Ubicación</h2>
        <iframe
          title="Ubicación de la empresa"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14240.423666958226!2d-65.207167!3d-26.8365833!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225d3ad7f30f1d%3A0xf8606cd659b8e3e4!2sRollingCode%20School!5e0!3m2!1ses!2sar!4v1732156979473!5m2!1ses!2sar"
          width="100%"
          height="300"
          style={{border: 0, borderRadius: '10px'}}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </section>
        </div>

        <div className="contact-form">
          <h2>Déjanos un mensaje</h2>
          <form action="/submit" method="POST">
            <div className="input-group">
              <label htmlFor="name">Nombre</label>
              <input type="text" id="name" name="name" placeholder="Tu nombre" required />
            </div>
            <div className="input-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input type="email" id="email" name="email" placeholder="Tu correo electrónico" required />
            </div>
            <div className="input-group">
              <label htmlFor="message">Mensaje</label>
              <textarea id="message" name="message" rows="4" placeholder="Tu mensaje" required></textarea>
            </div>
            <button type="submit" className="btn-submit">Enviar Mensaje</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
