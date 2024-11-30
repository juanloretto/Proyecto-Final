import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/");
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
