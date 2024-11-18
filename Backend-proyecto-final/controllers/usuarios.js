const { request, response } = require("express");
const Usuario = require("../models/usuario.js");
const bcrypt = require("bcryptjs"); // Usamos bcryptjs para encriptar las contraseñas de forma segura

// Obtener usuarios (con paginación)
const getUsers = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;

  try {
    const usuarios = await Usuario.find().limit(Number(limite)).skip(Number(desde)); // Asegurarse de que límite y desde sean números
    const total = await Usuario.countDocuments();

    res.json({
      total,
      usuarios,
      message: "Petición GET desde controllers", // Mensaje opcional para depuración
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener usuarios",
      error: error.message,
    });
  }
};

// Crear un nuevo usuario
const postUser = async (req = request, res = response) => {
  const { nombre, email, password, rol } = req.body;

  try {
    // Verificar si el correo ya está registrado
    const existingUser = await Usuario.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "El correo ya está registrado",
      });
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const usuario = new Usuario({
      nombre,
      email,
      password: hashedPassword, // Guardamos la contraseña encriptada
      rol,
    });

    // Guardar en la base de datos
    await usuario.save();
    res.status(201).json({
      message: "Usuario creado con éxito",
      usuario,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al crear el usuario",
      error: error.message,
    });
  }
};

// Actualizar un usuario
const putUser = async (req, res) => {
  const { id } = req.params;  // ID del usuario a actualizar
  const { password, _id, email, ...resto } = req.body;  // Excluimos el _id que no debe actualizarse

  try {
    if (password) {
      // Encriptar la contraseña solo si se pasa una nueva
      const salt = await bcrypt.genSalt(10);
      resto.password = await bcrypt.hash(password, salt);
    }

    // Actualizar el usuario en la base de datos
    const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

    if (!usuario) {
      return res.status(404).json({
        error: "Usuario no encontrado",
      });
    }

    res.status(200).json({
      message: "Usuario actualizado",
      usuario,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error al actualizar el usuario",
      details: error.message,
    });
  }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
  const { id } = req.params;  // ID del usuario a eliminar

  try {
    const borrarUsuario = await Usuario.findByIdAndDelete(id);

    if (!borrarUsuario) {
      return res.status(404).json({
        message: "Usuario no encontrado para eliminar",
      });
    }

    res.json({
      message: "Usuario eliminado",
      usuario: borrarUsuario,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al eliminar el usuario",
      error: error.message,
    });
  }
};

module.exports = { getUsers, postUser, putUser, deleteUser };
