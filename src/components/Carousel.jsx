import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importa Link
import './Carousel.css';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      src: 'https://static.vecteezy.com/system/resources/thumbnails/020/723/325/small_2x/close-up-of-a-soccer-striker-ready-to-kicks-the-ball-in-the-football-goal-photo.jpg',
      alt: 'Slide 1',
      link: '/slide1' 
    },
    {
      id: 2,
      src: 'https://static.vecteezy.com/system/resources/thumbnails/012/406/445/small_2x/soccer-template-design-football-banner-sport-layout-design-green-theme-illustration-vector.jpg',
      alt: 'Slide 2',
      link: '/slide2' 
    },
    {
      id: 3,
      src: 'https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg',
      alt: 'Slide 3',
      link: '/slide3' 
    },
  ];

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="carousel-container">
      <button className="carousel-btn prev-btn" onClick={handlePrev}>❮</button>
      <div className="carousel-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide) => (
          <div className="carousel-slide" key={slide.id}>
            <Link to={slide.link}> 
              <img src={slide.src} alt={slide.alt} className="carousel-image" />
            </Link>
          </div>
        ))}
      </div>
      <button className="carousel-btn next-btn" onClick={handleNext}>❯</button>
      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
