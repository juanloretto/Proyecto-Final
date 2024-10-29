import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Gallery from './components/gallery';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/gallery" replace />} /> {/* Redirige a la galería */}
          <Route path="/gallery" element={<Gallery />} /> {/* Ruta para la galería */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
