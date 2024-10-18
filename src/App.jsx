import React from 'react';
import Login from './components/Login';
import Register from './components/Register'; // Asegúrate de tener la ruta correcta


function App() {
  return (
    <div>
      <h1>Complejo la esferica</h1>
      <Register />
      <Login />
    </div>
  );
}

export default App;
