const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos"); // Middleware de validación
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/usuario"); // Asegúrate de tener un modelo de usuario

const routerAuth = Router(); // Crear el enrutador

// Registro de usuario
const register = async (req, res) => {
  console.log('Petición de registro recibida'); // Log para saber si la ruta es alcanzada
  const { nombre, email, password, passwordConfirm, rol } = req.body;

  try {
    // Verificar si las contraseñas coinciden
    if (password !== passwordConfirm) {
      return res.status(400).json({ message: "Las contraseñas no coinciden" });
    }

    // Validación adicional para el rol
    if (!["user", "admin"].includes(rol)) {
      return res.status(400).json({
        message: "Rol inválido. Debe ser 'user' o 'admin'",
      });
    }

    // Verificar si el correo ya está registrado
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear el nuevo usuario con la contraseña encriptada
    const newUser = new User({
      nombre,
      email,
      password: hashedPassword,
      rol, // Incluye el rol en el nuevo usuario
    });

    // Guardar el usuario en la base de datos
    await newUser.save();

    // Responder con un mensaje de éxito
    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (err) {
    console.error("Error al registrar el usuario:", err);
    res.status(500).json({
      message: "Error al registrar el usuario",
      error: err.message, // Proveer detalles sobre el error
    });
  }
};


// Login de usuario
const login = async (req, res) => {
  console.log('Petición de login recibida'); // Log para saber si la ruta es alcanzada
  // Validar los resultados de las validaciones
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Buscar al usuario en la base de datos
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    // Verificar la contraseña
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // Generar el token
    const token = jwt.sign({ userId: user._id }, process.env.PRIVATESECRETKEY, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (err) {
    console.error("Error en el login:", err);
    res.status(500).json({
      message: "Error en el servidor",
      error: err.message, // Proveer detalles sobre el error
    });
  }
};

// Definir las rutas en el enrutador
routerAuth.post(
  "/register",  // Esto es '/api/auth/register' cuando se combina con el prefijo en el servidor
  [
    check("email", "El correo es obligatorio").isEmail(),
    check(
      "password",
      "La contraseña debe tener al menos 6 caracteres, una mayúscula, un número y un símbolo especial"
    )
      .isLength({ min: 6 })
      .matches(/[A-Z]/) // Al menos una mayúscula
      .matches(/\d/) // Al menos un número
      .matches(/[\W_]/), // Al menos un símbolo especial
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

module.exports = routerAuth; // Exportar el enrutador
