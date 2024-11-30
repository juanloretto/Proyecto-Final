import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Main from "./components/Main";
import Canchas from "./components/Canchas";
import Reservas from "./components/Reservas";
import Reglamento from "./components/Reglamento";
import Contacto from "./components/Contacto";
import LoginPage from "./components/Login";


const ProtectedRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/login" />;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedInStatus === "true");
  }, []);

  const handleLoginSuccess = () => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (

    
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/canchas" element={<Canchas />} />
        <Route
          path="/reservas"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Reservas />
            </ProtectedRoute>
          }
        />
        <Route path="/reglamento" element={<Reglamento />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
