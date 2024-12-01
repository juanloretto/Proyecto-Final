import React, { useState } from "react";
import logo from '../assets/pelota.png';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Te has suscrito con el email: ${email}`);
    setEmail("");
  };

  return (
    <div className="main-content">
      
      <footer className="footer-container">
      
        <section className="footer-top-row">
          <div className="footer-logo-section">
            <img src={logo} alt="Logo" className="footer-logo-image" />
            <h2 className="footer-title">Complejo la Esférica</h2>
          </div>
          <div className="footer-social">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon"><FaFacebookF /></a>
            <a href="https://www.x.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon"><FaTwitter /></a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon"><FaInstagram /></a>
          </div>
        </section>
        <section className="footer-middle-section">
          <div className="footer-subscription">
            <form onSubmit={handleSubscribe} className="footer-subscription-form">
              <input 
                type="email" 
                placeholder="Introduce tu email"
                className="footer-subscription-input" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="footer-subscription-button">Únete</button>
            </form>
          </div>
        </section>
        <section className="footer-links">
          <ul>
            <li><a href="/privacy">Política de privacidad</a></li>
            <li><a href="/terms">Términos y condiciones</a></li>
            <li><a href="/contact">Contacto</a></li>
          </ul>
        </section>
        <div className="footer-bottom">
          <p>&copy; Complejo la Esferica {new Date().getFullYear()}.  Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
