const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos"); 
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/usuario"); 

const routerAuth = Router(); 


const register = async (req, res) => {
  console.log('Petición de registro recibida'); 
  const { nombre, email, password, passwordConfirm, rol } = req.body;

  try {
  
    if (password !== passwordConfirm) {
      return res.status(400).json({ message: "Las contraseñas no coinciden" });
    }

   
    if (!["user", "admin"].includes(rol)) {
      return res.status(400).json({
        message: "Rol inválido. Debe ser 'user' o 'admin'",
      });
    }

   
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    
    const newUser = new User({
      nombre,
      email,
      password: hashedPassword,
      rol, 
    });

    
    await newUser.save();

 
    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (err) {
    console.error("Error al registrar el usuario:", err);
    res.status(500).json({
      message: "Error al registrar el usuario",
      error: err.message, 
    });
  }
};


const login = async (req, res) => {
  console.log('Petición de login recibida'); 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

   
    const token = jwt.sign({ userId: user._id }, process.env.PRIVATESECRETKEY, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    console.error("Error en el login:", err);
    res.status(500).json({
      message: "Error en el servidor",
      error: err.message, 
    });
  }
};


routerAuth.post(
  "/register",  
  [
    check("email", "El correo es obligatorio").isEmail(),
    check(
      "password",
      "La contraseña debe tener al menos 6 caracteres, una mayúscula, un número y un símbolo especial"
    )
      .isLength({ min: 6 })
      .matches(/[A-Z]/) 
      .matches(/\d/) 
      .matches(/[\W_]/), 
    check("rol", 'El rol es obligatorio y debe ser "user" o "admin"').isIn([
      "user",
      "admin",
    ]),
    validarCampos,
  ],
  register
);

routerAuth.post(
  "/login",  
  [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").exists(),
    validarCampos,
  ],
  login
);

module.exports = routerAuth; 
