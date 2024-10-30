import React from 'react';
import { Link } from 'react-router-dom';
import './Error404.css';

const Error404 = () => {
    return (
        <div className="error-container">
            <div className="text-container">
                <h1 className="error-title">404</h1>
                <p className="error-message">¡Offside! La página que buscas está fuera de juego.</p>
                <p className="error-message">No te desanimes, ¡hay más partidos por jugar!</p>
                <Link to="/" className="error-link">Regresar al inicio</Link>
            </div>
        </div>
    );
};

export default Error404;
