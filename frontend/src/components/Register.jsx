import React, { useState } from "react";
import "../css/Register.css"; // Importamos el archivo CSS para estilos personalizados

function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validaciones
    if (!fullName || !email || !password || !confirmPassword || !acceptedTerms) {
      setError("Todos los campos son obligatorios y debes aceptar los términos.");
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
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    console.log("Registro exitoso:", { fullName, email, phone });
  };

  return (   
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center ">
      <div className="row w-100">
        <div className="col-12 col-lg-6 col-md-8 col-sm-12 mx-auto">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center">Nuevo Usuario</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">
                    Nombre Completo:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ingresa tu nombre completo"
                    required
                  />
                </div>
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
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirmar Contraseña:
                  </label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirma tu contraseña"
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
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Número de Teléfono (opcional):
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ingresa tu número de teléfono"
                  />
                </div>
                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="terms"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="terms">
                    Acepto los términos y condiciones de uso
                  </label>
                </div>
                <button type="submit" className="btn custom-btn center mt-2">
                  Registrarse
                </button>
              </form>
              <div className="text-center mt-3">
                <span className="newUser">¿Ya tienes cuenta?</span>
                <br />
                <button className="btn btn-newUser mt-2">Iniciar Sesión</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}

export default Register;
