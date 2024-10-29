import React, { useState } from "react";
import "../css/Login.css"; 
import fondoImg from '../assets/vista-campo-futbol-hierba_837074-46586.avif'; 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validaciones
    if (!email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Por favor, ingresa un email válido");
      return;
    }
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, un número y un carácter especial."
      );
      return;
    }

    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center ">
      <div className="row w-100">
        <div className="col-12 col-lg-6 col-md-8 col-sm-12 mx-auto">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center">Iniciar Sesión</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ingresa tu correo electrónico"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Contraseña:
                  </label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Ingresa tu contraseña"
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Ocultar" : "Mostrar"}
                    </button>
                  </div>
                </div>
                <button type="submit" className="btn custom-btn center mt-2">
                  Login
                </button>
              </form>
              <div className="text-center mt-3">
                <span className="newUser">¿Nuevo usuario?</span>
                <br />
                <button className="btn btn-newUser mt-2">Regístrate</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  
}

export default Login;

