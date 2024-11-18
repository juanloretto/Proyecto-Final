const jwt = require("jsonwebtoken");


const generarJWT = (id) => {
  return new Promise((resolve, reject) => {
    const payload = { id };
    jwt.sign(
      payload,
      process.env.PRIVATESECRETKEY,
      { expiresIn: "5h" },
      (error, token) => {
        if (error) {
          console.log(error);
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports =  {generarJWT} ;
