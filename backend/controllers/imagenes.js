const Imagen = require("../models/imagenes");

const crearImagen = async (req, res) => {
  try {
    const { descripcion, urlImagen } = req.body;
    const titulo = req.body.titulo.toUpperCase();
    const imagenExistente = await Imagen.findOne({ urlImagen });

    if (imagenExistente) {
      return res.status(400).json({
        msg: `La imagen con la URL ${urlImagen} ya existe.`,
      });
    }

    const nuevaImagen = new Imagen({ titulo, descripcion, urlImagen });
    await nuevaImagen.save();

    res
      .status(201)
      .json({ mensaje: "Imagen creada con éxito.", imagen: nuevaImagen });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al crear la imagen.", error: error.message });
  }
};

const obtenerTodasLasImagenes = async (req, res) => {
  try {
    const { limite = 9, desde = 0 } = req.query;
    const limiteNumero = parseInt(limite, 10);
    const desdeNumero = parseInt(desde, 10);
    if (isNaN(limiteNumero) || isNaN(desdeNumero)) {
      return res.status(400).json({
        mensaje: "Los valores de 'limite' y 'desde' deben ser números válidos.",
      });
    }
    const imagenes = await Imagen.find()
      .skip(desdeNumero)
      .limit(limiteNumero)
      .sort({ createdAt: -1 });
    res.status(200).json(imagenes);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener las imágenes.",
      error: error.message,
    });
  }
};

// Nueva función para obtener las primeras 9 imágenes
const obtenerTop9Imagenes = async (req, res) => {
  try {
    
    const imagenes = await Imagen.find().limit(9); // Recuperamos las primeras 9 imágenes
    
    res.status(200).json(imagenes); // Respondemos con las imágenes obtenidas
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener las imágenes.", error: error.message });
  }
};

const obtenerImagenPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const imagen = await Imagen.findById(id);

    if (!imagen) {
      return res.status(404).json({ mensaje: "Imagen no encontrada." });
    }

    res.status(200).json(imagen);
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al obtener la imagen.", error: error.message });
  }
};

const actualizarImagenPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, urlImagen } = req.body;

    const imagenActualizada = await Imagen.findByIdAndUpdate(
      id,
      { titulo, descripcion, urlImagen },
      { new: true, runValidators: true }
    );

    if (!imagenActualizada) {
      return res.status(404).json({ mensaje: "Imagen no encontrada." });
    }

    res.status(200).json({
      mensaje: "Imagen actualizada con éxito.",
      imagen: imagenActualizada,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al actualizar la imagen.",
      error: error.message,
    });
  }
};

const eliminarImagenPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const imagenEliminada = await Imagen.findByIdAndDelete(id);

    if (!imagenEliminada) {
      return res.status(404).json({ mensaje: "Imagen no encontrada." });
    }

    res.status(200).json({ mensaje: "Imagen eliminada con éxito." });
  } catch (error) {
    res
      .status(500)
      .json({ mensaje: "Error al eliminar la imagen.", error: error.message });
  }
};

module.exports = {
  crearImagen,
  obtenerTodasLasImagenes,
  obtenerTop9Imagenes, // Exportamos la nueva función
  obtenerImagenPorId,
  actualizarImagenPorId,
  eliminarImagenPorId,
};
