const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();  // Cargar variables de entorno desde el archivo .env

const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // Para poder manejar solicitudes con JSON

// Verificar si el puerto está definido en .env
const port = process.env.PORT || 3000; // Si no está definido, usar 3000 por defecto

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error de conexión a MongoDB: ', err.message));

// Rutas
const imageRoutes = require('./routes/imagenes');
app.use('/api', imageRoutes); // Las rutas de imágenes estarán bajo /api

// Iniciar el servidor<
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
