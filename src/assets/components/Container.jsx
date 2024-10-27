import React from 'react';
import Card from './Card.jsx';

const Container = () => {
  const cardsData = [
    { id: 1, title: 'Card 1', description: 'Descripción de la Card 1' },
    { id: 2, title: 'Card 2', description: 'Descripción de la Card 2' },
    { id: 3, title: 'Card 3', description: 'Descripción de la Card 3' },
    { id: 4, title: 'Card 4', description: 'Descripción de la Card 4' },
    { id: 5, title: 'Card 5', description: 'Descripción de la Card 5' },
    { id: 6, title: 'Card 6', description: 'Descripción de la Card 6' },
  ];

  const cardsSection2 = [
    { id: 7, title: 'Card 7', description: 'Descripción de la Card 7' },
    { id: 8, title: 'Card 8', description: 'Descripción de la Card 8' },
    { id: 9, title: 'Card 9', description: 'Descripción de la Card 9' },
    { id: 10, title: 'Card 10', description: 'Descripción de la Card 10' },
  ]



  return (
    <div className="container-fluid mt-5 d-flex flex-column flex-lg-row p-5">
      <div className="sidebar">
        <h2>Publicidad</h2>
        <p>¡Anúnciate aquí!</p>
        {<div className="ad">
          <h3>¡Aprovecha nuestras promociones!</h3>
          <p>Inscríbete ahora y obtén un 20% de descuento en tu primera reserva.</p>
          <img src="../images/espaciopublicitario.png" alt="Publicidad" className="ad-image" />
          <button className="btn btn-primary">Más información</button>
        </div>}
      </div>
      <div className="content flex-grow-1">
        <h1 className='text-center mt-5 mb-5'>Nuestras canchas!</h1>
        <div className="row">
          {cardsData.map(card => (
            <div className="col-12 col-md-4 mb-4" key={card.id}>
              <Card title={card.title} description={card.description} />
            </div>
          ))}
        </div>
        <h2 className='text-center mt-5 mb-5'>Paddle</h2>
        <div className="row">
          {cardsSection2.map(card => (
            <div className="col-12 col-md-4 mb-4" key={card.id}>
              <Card title={card.title} description={card.description} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


export default Container