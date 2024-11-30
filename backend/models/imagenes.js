const mongoose = require('mongoose');

const SchemaImagen = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
      trim: true,
    },
    descripcion: {
      type: String,
      trim: true,
    },
    urlImagen: {
      type: String, 
      required: true,
      unique: true,  // Validación para que la URL sea única
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,  // Campo para almacenar la fecha de actualización
      default: Date.now,
    },
  },
  {
    timestamps: true,  // Esto automáticamente manejará createdAt y updatedAt
  }
);

module.exports = mongoose.model('Imagen', SchemaImagen);
