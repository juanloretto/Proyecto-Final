import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Eliminar el token del localStorage
    localStorage.removeItem("token");

    // Redirigir al Home
    navigate("/"); // Redirige al Home al cerrar sesión
  };

  return (
    <div className="logout-container">
      <p>¿Seguro que quieres cerrar sesión?</p>
      <button onClick={handleLogout} className="btn btn-danger">
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Logout;

