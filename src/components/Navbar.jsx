import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/pelota.png";

const Navbar = ({ isLoggedIn, onLoginClick, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLoginClick = () => {
    if (isLoggedIn) {
      onLogout();
      alert("Has cerrado sesión");
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <header className="nb-container">
      <section className="nb-top">
        <div className="nb-logo-title">
          <div className="nb-logo">
            <img src={logo} alt="Logo" className="nb-logo-img" />
          </div>
          <h1 className="nb-title">Complejo la Esférica</h1>
        </div>
        <button className="nb-login-button" onClick={handleLoginClick}>
          {isLoggedIn ? "Cerrar Sesión" : "Iniciar Sesión"}
        </button>
        <div className="nb-hamburger" onClick={toggleMenu}>
          <div className={`nb-line ${isOpen ? "nb-open" : ""}`}></div>
          <div className={`nb-line ${isOpen ? "nb-open" : ""}`}></div>
          <div className={`nb-line ${isOpen ? "nb-open" : ""}`}></div>
        </div>
      </section>
      <nav className={`nb-bottom ${isOpen ? "nb-active" : ""}`}>
        <ul className="nb-links">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/canchas">Canchas</Link></li>
          <li><Link to="/reservas">Reservas</Link></li>
          <li><Link to="/reglamento">Reglamento</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
          {isLoggedIn && (
            <li><Link to="/mi-cuenta" className="nb-account-link">Mi Cuenta</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
