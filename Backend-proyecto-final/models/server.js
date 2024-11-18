const express = require('express');
const cors = require('cors');
const dbConnection = require('../database/config');  // Ruta correcta al archivo de configuración de la base de datos

class Server {
  constructor() {
    console.log("Iniciando el servidor...");  // Verifica que el código comienza a ejecutarse
    this.app = express();
    this.app.use(cors());
    this.port = process.env.PORT || 3000;  // Usar el puerto desde el entorno o el puerto 3000 por defecto
    this.usuarioPath = '/api/usuarios';
    this.authPath = '/api/auth';
    this.conectarDB();  // Conectar a la base de datos
    this.middlewares();  // Configuración de middlewares
    this.routes();  // Definir rutas
  }

  // Conectar a la base de datos
  async conectarDB() {
    try {
      console.log("Conectando a la base de datos...");
      await dbConnection();  // Llama a la conexión de la base de datos
      console.log('Base de datos conectada exitosamente');
    } catch (error) {
      console.error('Error al conectar a la base de datos:', error);
      process.exit(1);  // Detener el proceso si no se puede conectar a la base de datos
    }
  }

  // Definir las rutas
  routes() {
    // Ruta de usuarios
    this.app.use(this.usuarioPath, require('../routes/usuarios'));  // Asegúrate de que la ruta de usuarios sea correcta
    console.log(`Ruta de usuarios registrada en ${this.usuarioPath}`);

    // Ruta de autenticación
    this.app.use(this.authPath, require('../routes/auth'));  // Asegúrate de que la ruta de autenticación sea correcta
    console.log(`Ruta de autenticación registrada en ${this.authPath}`);

    // Ruta de prueba para verificar que el servidor esté funcionando
    this.app.get('/', (req, res) => {
      res.send('Servidor funcionando correctamente');
    });
  }

  // Configuración de middlewares
  middlewares() {
    this.app.use(cors());  // Habilitar CORS
    this.app.use(express.json());  // Permitir solicitudes JSON
    this.app.use(express.static('public'));  // Sirve archivos estáticos desde la carpeta 'public'
  }

  // Iniciar el servidor
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor online en el puerto ${this.port}`);
    });
  }
}

// Exportar la clase Server
module.exports = Server;
