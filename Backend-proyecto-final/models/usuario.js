const { model, Schema } = require("mongoose");

// Definimos el esquema de Usuario
const UsuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"], // Asegura que el nombre no sea vacío
  },
  email: {
    type: String,
    required: [true, "El email es obligatorio"], // Asegura que el correo no sea vacío
    unique: true, // Asegura que el correo sea único
    match: [/\S+@\S+\.\S+/, "Por favor, ingrese un correo válido"], // Expresión regular para validar el correo
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"], // Asegura que la contraseña no sea vacía
    match: [
      /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/, // Al menos 6 caracteres, 1 mayúscula, 1 número y 1 símbolo
      "La contraseña debe tener al menos 6 caracteres, una mayúscula, un número y un símbolo especial",
    ],
  },
  rol: {
    type: String,
    required: [true, "El rol es obligatorio"],
    enum: ["user", "admin"], // Enum para restringir los valores del rol
  },
  status: {
    type: Boolean,
    default: true, // Establece el valor por defecto a 'true' (usuario activo)
  },
});

// Método para eliminar la contraseña antes de enviar la respuesta
UsuarioSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password; // Elimina la contraseña antes de enviar la respuesta
  return userObject;
};

// Creamos el modelo de Usuario con el esquema definido
module.exports = model("Usuario", UsuarioSchema);
