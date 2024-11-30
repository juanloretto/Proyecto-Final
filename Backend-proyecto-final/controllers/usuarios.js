const { request, response } = require("express");
const Usuario = require("../models/usuario.js");
const bcrypt = require("bcryptjs"); 

const getUsers = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;

  try {
    const usuarios = await Usuario.find().limit(Number(limite)).skip(Number(desde)); 
    const total = await Usuario.countDocuments();

    res.json({
      total,
      usuarios,
      message: "Petición GET desde controllers", 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener usuarios",
      error: error.message,
    });
  }
};


const postUser = async (req = request, res = response) => {
  const { nombre, email, password, rol } = req.body;

  try {
    
    const existingUser = await Usuario.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "El correo ya está registrado",
      });
    }

   
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const usuario = new Usuario({
      nombre,
      email,
      password: hashedPassword, 
      rol,
    });

   
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


const putUser = async (req, res) => {
  const { id } = req.params; 
  const { password, _id, email, ...resto } = req.body;

  try {
    if (password) {
      
      const salt = await bcrypt.genSalt(10);
      resto.password = await bcrypt.hash(password, salt);
    }

  
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


const deleteUser = async (req, res) => {
  const { id } = req.params;  

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
