import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import "../css/Logout.css";

const Logout = () => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('user'); 
    alert('Saliste de tu cuenta exitosamente 😎'); 
    navigate('/login'); 
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
