import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importa Link
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
          <li><Link to="/inicio" className="navbar-link">Inicio</Link></li>
          <li><Link to="/canchas" className="navbar-link">Canchas</Link></li>
          <li><Link to="/reservas" className="navbar-link">Reservas</Link></li>
          <li><Link to="/torneos" className="navbar-link">Torneos</Link></li>
          <li><Link to="/reglamento" className="navbar-link">Reglamento</Link></li>
          <li><Link to="/precios" className="navbar-link">Precios</Link></li>
          <li><Link to="/contacto" className="navbar-link">Contacto</Link></li>
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