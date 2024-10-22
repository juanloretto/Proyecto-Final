import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Necesario para la redirección
import "../css/Logout.css";

const Logout = () => {
  const navigate = useNavigate(); // Hook para redirigir a otras rutas

  const handleLogout = () => {
    localStorage.removeItem('token'); // Borra el token almacenado
    localStorage.removeItem('user'); // Borra cualquier info adicional del usuario
    alert('Saliste de tu cuenta exitosamente 😎'); // Muestra alerta
    navigate('/login'); // Redirige a la pantalla de Login
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="row">
        <div className="col text-center">        
          <button onClick={handleLogout} className="btnLogout btn-danger mt-3">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
