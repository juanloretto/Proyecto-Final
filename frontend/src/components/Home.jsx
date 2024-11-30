import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true); 
    } else {
      setIsLoggedIn(false);
    }
  }, []);

 
  const handleLogout = () => {
   
    localStorage.removeItem("token");

    
    setIsLoggedIn(false);


    navigate("/"); 
  };


  const handleLoginRedirect = () => {
    navigate('/login'); 
  };

  return (
    <div className="container">
      <h1>Bienvenido a la Aplicación</h1>

      {isLoggedIn ? (
        <div>
          <p>Ya estás logueado.</p>
          <button onClick={handleLogout} className="btn btn-danger mt-3">
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

