import React, { useState } from 'react';
import './Navbar.css';
import logo from '../assets/pelota.png'; 


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-top">
        <div className="navbar-logo-container">
          <img src={logo} alt="Logo" className="navbar-logo" />
          <h2 className="navbar-title">Complejo La Esférica</h2>
        </div>
        <div className="search-container">
          <input type="text" className="search-input" placeholder="Buscar..." />
          <i className="fa fa-search search-icon"></i>
        </div>
        <div className="auth-buttons">
          <button className="login-button">Login</button>
        </div>
      </div>
      <div className="navbar-bottom">
        <ul className={`navbar-list ${isMenuOpen ? 'active' : ''}`}>
          <li><a href="/inicio" className="navbar-link">Inicio</a></li>
          <li><a href="/canchas" className="navbar-link">Canchas</a></li>
          <li><a href="/reservas" className="navbar-link">Reservas</a></li>
          <li><a href="/torneos" className="navbar-link">Torneos</a></li>
          <li><a href="/reglamento" className="navbar-link">Reglamento</a></li>
          <li><a href="/precios" className="navbar-link">Precios</a></li>
          <li><a href="/contacto" className="navbar-link">Contacto</a></li>
        </ul>
      </div>
      <div className="navbar-toggler" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
};

export default Navbar;
