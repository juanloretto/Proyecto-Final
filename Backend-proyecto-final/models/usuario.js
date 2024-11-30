const { model, Schema } = require("mongoose");

const UsuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"], 
  },
  email: {
    type: String,
    required: [true, "El email es obligatorio"],
    unique: true, 
    match: [/\S+@\S+\.\S+/, "Por favor, ingrese un correo válido"], 
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"], 
    match: [
      /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/, 
      "La contraseña debe tener al menos 6 caracteres, una mayúscula, un número y un símbolo especial",
    ],
  },
  rol: {
    type: String,
    required: [true, "El rol es obligatorio"],
    enum: ["user", "admin"], 
  },
  status: {
    type: Boolean,
    default: true,
  },
});


UsuarioSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password; 
  return userObject;
};


module.exports = model("Usuario", UsuarioSchema);
