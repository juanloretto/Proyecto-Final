import React, { useEffect, useState } from 'react';
import { Carousel, Card, Button, Row, Col } from 'react-bootstrap';
import '../css/Gallery.css';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulando comentarios de clientes felices
  const customerComments = [
    { name: "Juan Pérez", comment: "¡Excelente experiencia! El lugar es increíble, muy bien organizado y con una atención de primera." },
    { name: "María López", comment: "Me encantó el servicio. Todo es muy limpio y moderno, definitivamente volveré." },
    { name: "Carlos García", comment: "Un ambiente perfecto para entrenar. Los entrenadores son muy profesionales y atentos." },
    { name: "Ana Martín", comment: "El mejor lugar para mejorar tu bienestar. Lo recomiendo al 100%." }
  ];

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Obtener el token del localStorage
        const token = localStorage.getItem('token');
        
        if (!token) {
          console.error('no se encontro el token, el usuario debe iniciar sesion');
          return;
        }

        const response = await fetch('https://backend-proyecto-final-xuul.onrender.com/api/imagenes?limite=9&desde=0', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-token': token
          }
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log("Imágenes recibidas:", data);  
        setImages(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar las imágenes", error);
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="gallery-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      {/* Carrusel de imágenes */}
      <Carousel className="mb-4" interval={3000} controls={true} indicators={true}>
        {images.slice(0, 3).map((image, index) => (
          <Carousel.Item key={image._id}>
            <img
              className="d-block w-100"
              src={image.urlImagen}
              alt={`carousel-image-${index + 1}`}
              style={{ objectFit: 'cover', height: '400px' }}
            />
            <Carousel.Caption>
              <h3>{image.titulo}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <h2>Conocé nuestras instalaciones</h2>

      {/* Tarjetas de imágenes */}
      <Row xs={1} sm={1} md={2} lg={3} className="g-4" style={{ margin: '0 auto' }}>
        {images.slice(0, 9).map((image, index) => (
          <Col key={image._id}>
            <Card>
              <Card.Img variant="top" src={image.urlImagen} />
              <Card.Body>
                <Card.Title>{image.titulo}</Card.Title>
                <Card.Text>{image.descripcion}</Card.Text>
                <div className="d-flex justify-content-center">
                  <Button variant="success" href="/" target="_blank">Saber más</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <h2>Lo que dicen nuestros clientes</h2>

      {/* Carrusel de comentarios de clientes */}
      <Carousel className="customer-comments-carousel " interval={2000} controls={false} indicators={true}>
        {customerComments.map((comment, index) => (
          <Carousel.Item key={index}>
            <div className="customer-comment  ">
              <p><strong>{comment.name}</strong></p>
              <p>{comment.comment}</p>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default Gallery;
