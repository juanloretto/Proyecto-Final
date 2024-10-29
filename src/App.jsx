import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginScreen from "./views/LoginScreen";
import RegisterScreen from "./views/RegisterScreen";
import Logout from "./components/Logout";

function App() {
  return (
    <Router>
      <div className="container text-center mt-5">
        <h1>Complejo La Esférica</h1>

        <nav className="m-5">
          <Link to="/login" className="btn btn-secondary m-2">
            Login
          </Link>
          <Link to="/register" className="btn btn-success m-2">
            Registro
          </Link>
          <button
            onClick={() => navigate("/logout")}
            className="btnLogout btn-danger"
          >
            Cerrar Sesión
          </button>
        </nav>

        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/logout" element={<Logout />} />

          <Route path="*" element={<LoginScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
