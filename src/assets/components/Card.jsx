import React from 'react';
import '../css/Card.css';

const Card = ({ title, description }) => {
  return (
    <div className="card" style={{ width: '100%' }}>
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/1/1d/Football_Pallo_valmiina-cropped.jpg" 
        className="card-img-top" 
        alt="Card image cap" 
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <a href="#" className="btn btn-primary">Reservar</a>
      </div>
    </div>
  );
};

export default Card;