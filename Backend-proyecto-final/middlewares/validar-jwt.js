const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario.js')

const validarJWT=async(req,res,next)=>{
//recibir token
const token = req.header('x-token')

if(!token){
    return res.status(401).json({
        msg:'Debe haber un token en la peticion'
    })
}
try {
    const {id}= jwt.verify(token,process.env.PRIVATESECRETKEY)
    console.log('UID extraído del token:', id);
const usuario = await Usuario.findById(id)
//Verificar si existe usuario
if(!usuario){
    return res.status(401).json({
        msg: "El usuario no existe en la BD"
    })
}
req.usuario = usuario;
next();
} catch (error) {
    console.log(error)
    res.status(401).json({
        msg:"Token invalido"
    })
}
}

module.exports = {validarJWT}