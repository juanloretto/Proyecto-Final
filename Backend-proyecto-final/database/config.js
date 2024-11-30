const mongoose = require('mongoose');
require('dotenv').config(); 

const dbConnection = async () => {
    try {
      
        const uri = process.env.DATABASE_CNN;

     
        if (!uri) {
            console.error('La variable de entorno DATABASE_CNN no está definida en el archivo .env');
            process.exit(1); 
        }

        console.log('Intentando conectar a la base de datos:', uri);
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Conexión exitosa a la base de datos');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
};

module.exports = dbConnection;
