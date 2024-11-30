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

router.get("/", [
  validarJWT,
  esAdminRole,  
], getUsers);

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


router.put(
  "/:id",
  [
    validarJWT,  
    check("id", "No es un ID válido").isMongoId(),  
    check("id").custom(ConfirmoUsuarioId),  
    check("rol").custom(rolValido),  
    validarCampos, 
  ],
  putUser  
);


router.delete(
  "/:id",
  [
    validarJWT,  
    esAdminRole,  
    check("id", "No es un ID válido").isMongoId(),  
    check("id").custom(ConfirmoUsuarioId),  
    validarCampos,  
  ],
  deleteUser  
);

module.exports = router;
