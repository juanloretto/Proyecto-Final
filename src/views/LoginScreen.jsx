
import React from 'react';
import Login from '../components/Login'; 

function LoginScreen() {
  return (
    <div className="login-screen vh-100 d-flex align-items-center justify-content-center">
      <div className="container">
        <Login /> 
      </div>
    </div>
  );
}

export default LoginScreen;