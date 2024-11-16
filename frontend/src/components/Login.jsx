import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Si la respuesta es exitosa, obtenemos los datos (incluido el token)
        const data = await response.json();
        console.log('Login exitoso:', data);

        // Guardar el token en localStorage
        localStorage.setItem('token', data.token);

        // Redirigir al usuario a la página deseada, por ejemplo, el Dashboard
        navigate('/'); // Cambia esta ruta si es necesario
      } else {
        // Si la respuesta es un error, mostramos el mensaje correspondiente
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (err) {
      setError('Hubo un error en la solicitud. Intenta de nuevo.');
      console.error('Error al hacer la solicitud:', err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto">
          <div className="login-card">
            <div className="card-body">
              <h3 className="card-title login-title text-center mb-4">Iniciar Sesión</h3>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Contraseña
                  </label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                <div className="text-center">
                  <button type="submit" className="btn btn-success mt-3">
                    Iniciar Sesión
                  </button>
                </div>
              </form>
              <div className="mt-3 text-center">
                <p>¿Nuevo usuario?</p>
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate("/register")}
                >
                  Registrarse
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
