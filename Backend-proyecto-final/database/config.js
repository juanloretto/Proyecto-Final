const mongoose = require('mongoose');
require('dotenv').config(); // Cargar las variables de entorno

const dbConnection = async () => {
    try {
        // Obtener la URL de la base de datos desde la variable de entorno DATABASE_CNN
        const uri = process.env.DATABASE_CNN;

        // Verificar que la URI esté definida
        if (!uri) {
            console.error('La variable de entorno DATABASE_CNN no está definida en el archivo .env');
            process.exit(1); // Terminar el proceso si no está definida la URI
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
