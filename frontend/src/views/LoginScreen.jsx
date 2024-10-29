// src/views/LoginScreen.jsx
import React from 'react';
import Login from '../components/Login'; // Importar el componente Login

function LoginScreen() {
  return (
    <div className="login-screen vh-100 d-flex align-items-center justify-content-center">
      <div className="container">
        <Login /> {/* Renderizar el componente Login */}
      </div>
    </div>
  );
}

export default LoginScreen;