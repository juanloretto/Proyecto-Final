const { validationResult } = require("express-validator");

const validarCampos = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Errores de validación",
      errors: errors.array().map(error => ({
        msg: error.msg,
        param: error.param,
        location: error.location,
      })),
    });
  }

  next();
};

module.exports = { validarCampos };