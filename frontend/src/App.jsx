import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Gallery from './components/Gallery'; // Importa el componente Gallery

const App = () => {
  return (
    <Router>
      <div className="App">
        <h1 className="text-center my-4">Galería</h1>
        
        <Routes>
          {/* Ruta para mostrar la galería */}
          <Route path="/" element={<Gallery />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
