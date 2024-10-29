import React, { useState } from 'react';
import './ContactPage.css';
import { isEmpty, validatePhoneNumber, isValidEmail, limitMaxLength, getErrorMessage } from './Helpers/helperform';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    message: '',
  });

  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => { e.preventDefault();
    console.log('datos del formulario cargados!!:', formData);
    alert(`Gracias por contactarnos, ${formData.name}!`);
  };

  const newErrors = {};
        if (isEmpty(formData.name)) newErrors.name = getErrorMessage('Nombre', formData.name);
        if (!isValidEmail(formData.email)) newErrors.email = getErrorMessage('Email', formData.email);
        if (!validatePhoneNumber(formData.number, 500)) newErrors.number = getErrorMessage('numero', formData.number);
        if (!limitMaxLength(formData.message, 500)) newErrors.message = getErrorMessage('Mensaje', formData.message);

        if ((newErrors).length > 0) {
          setErrors(newErrors);
          return;
        }
    

  return (
    <div className="contact-container">
      <h2>Página de Contacto</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            maxLength={40}
            placeholder="Ingresa tu nombre"
            required
            />
            {errors.name && <span>{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            maxLength={40}
            placeholder="Ingresa tu correo electrónico"
            required
          />
            {errors.email && <span>{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="number">Numero De Celular:</label>
          <input
            type="number"
            id="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
            maxLength={20}
            placeholder="Ingresa tu número"
            required
          />
          {errors.number && <span>{errors.number}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="message">Mensaje:</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            max={500}
            min={5}
            placeholder="Escribe tu mensaje"
            required
          />
           {errors.message && <span>{errors.message}</span>}
        </div>

        <button type="submit" className="submit-button">
          Enviar
        </button>
      </form>
      
    </div>
  );
}
console.log('Formulario cargado exitosamente');

export default ContactPage;
