const express = require('express');
const cors = require('cors');
const dbConnection = require('../database/config');  

class Server {
  constructor() {
    console.log("Iniciando el servidor...");  
    this.app = express();
    this.app.use(cors());
    this.port = process.env.PORT || 3000;  
    this.usuarioPath = '/api/usuarios';
    this.authPath = '/api/auth';
    this.conectarDB();  
    this.middlewares(); 
    this.routes();  
  }

 
  async conectarDB() {
    try {
      console.log("Conectando a la base de datos...");
      await dbConnection();  
      console.log('Base de datos conectada exitosamente');
    } catch (error) {
      console.error('Error al conectar a la base de datos:', error);
      process.exit(1);  
    }
  }


  routes() {
   
    this.app.use(this.usuarioPath, require('../routes/usuarios'));  
    console.log(`Ruta de usuarios registrada en ${this.usuarioPath}`);


    this.app.use(this.authPath, require('../routes/auth'));  
    console.log(`Ruta de autenticación registrada en ${this.authPath}`);

    
    this.app.get('/', (req, res) => {
      res.send('Servidor funcionando correctamente');
    });
  }

  middlewares() {
    this.app.use(cors()); 
    this.app.use(express.json()); 
    this.app.use(express.static('public'));  
  }


  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor online en el puerto ${this.port}`);
    });
  }
}


module.exports = Server;
