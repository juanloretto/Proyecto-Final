import React from 'react';
import './Footer.css';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
const Footer = () => {
  return (
    <footer className="footer">
      <section className="footer-content">
        <p>© 2024 Complejo La Esférica</p>
        <ul className="footer-list">
          <li><a href="/terminos" className="footer-link">Términos y Condiciones</a></li>
          <li><a href="/privacidad" className="footer-link">Política de Privacidad</a></li>
          <li><a href="/contacto" className="footer-link">Contacto</a></li>
        </ul>
      </section>
      <section className="footer-social">
        <a href="https://www.facebook.com" className="social-icon" aria-label="Facebook">
          <FaFacebookF />
        </a>
        <a href="https://www.instagram.com" className="social-icon" aria-label="Instagram">
          <FaInstagram />
        </a>
        <a href="https://www.twitter.com" className="social-icon" aria-label="Twitter">
          <FaTwitter />
        </a>
      </section>
    </footer>
  );
};

export default Footer;
