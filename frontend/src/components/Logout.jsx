import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
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

  const handleLogout = () => {
    // Eliminar el token del localStorage
    localStorage.removeItem("token");

    // Redirigir al Home
    navigate("/home");
  };

  return (
    <>
      {isLoggedIn && (
        <button onClick={handleLogout}>Cerrar sesión</button>
      )}
    </>
  );
};

export default Logout;
