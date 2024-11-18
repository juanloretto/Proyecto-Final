const Router = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos.js");
const { validarJWT } = require('../middlewares/validar-jwt.js');
const { esAdminRole } = require('../middlewares/validar-roles.js');
const {
  rolValido,
  emailValido,
  ConfirmoUsuarioId,
} = require("../helpers/db-validators.js");

const {
  getUsers,
  postUser,
  putUser,
  deleteUser,
} = require("../controllers/usuarios.js");
const router = Router();

// Ruta GET para obtener usuarios (solo accesible por admin)
router.get("/", [
  validarJWT,
  esAdminRole,  // El usuario debe ser admin
], getUsers);

// Ruta POST para crear un nuevo usuario
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("email", "El correo electrónico no es válido").isEmail(),
    check("email").custom(emailValido),
    check("password", "La contraseña debe tener al menos 6 caracteres, una mayúscula, un número y un símbolo especial")
      .isLength({ min: 6 })
      .matches(/[A-Z]/)
      .matches(/\d/)
      .matches(/[\W_]/),
    check("passwordConfirm", "Las contraseñas no coinciden").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Las contraseñas no coinciden");
      }
      return true;
    }),
    check("rol", 'El rol es obligatorio y debe ser "user" o "admin"').isIn(["user", "admin"]),
    check("terminos", "Debe aceptar los términos y condiciones").custom((value) => {
      if (value !== true) {
        throw new Error("Debe aceptar los términos y condiciones");
      }
      return true;
    }),
    validarCampos,
  ],
  postUser
);


// Ruta PUT para actualizar un usuario por ID
router.put(
  "/:id",
  [
    validarJWT,  // Asegurarse de que el usuario esté autenticado
    check("id", "No es un ID válido").isMongoId(),  // Verificar que el ID sea válido
    check("id").custom(ConfirmoUsuarioId),  // Verificar si el ID existe en la base de datos
    check("rol").custom(rolValido),  // Verificar si el rol es válido
    validarCampos,  // Middleware para validar los campos
  ],
  putUser  // Controlador para actualizar un usuario por ID
);

// Ruta DELETE para eliminar un usuario por ID
router.delete(
  "/:id",
  [
    validarJWT,  // Asegurarse de que el usuario esté autenticado
    esAdminRole,  // Asegurarse de que el usuario sea admin para eliminar otro usuario
    check("id", "No es un ID válido").isMongoId(),  // Verificar que el ID sea válido
    check("id").custom(ConfirmoUsuarioId),  // Verificar si el ID existe en la base de datos
    validarCampos,  // Middleware para validar los campos
  ],
  deleteUser  // Controlador para eliminar un usuario por ID
);

module.exports = router;
