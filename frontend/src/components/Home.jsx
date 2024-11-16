import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Verificar si el token está presente al cargar el componente
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true); // Usuario está logueado
    } else {
      setIsLoggedIn(false); // Usuario no está logueado
    }
  }, []);

  const handleLoginRedirect = () => {
    navigate('/login'); // Redirigir a la página de login
  };

  return (
    <div className="container">
      <h1>Bienvenido a la Aplicación</h1>

      {isLoggedIn ? (
        <div>
          <p>Ya estás logueado.</p>
          <button onClick={handleLoginRedirect} className="btn btn-danger mt-3">
            Cerrar Sesión
          </button>
        </div>
      ) : (
        <div>
          <p>Por favor, inicia sesión para continuar.</p>
          <button onClick={handleLoginRedirect} className="btn btn-primary mt-3">
            Iniciar Sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
