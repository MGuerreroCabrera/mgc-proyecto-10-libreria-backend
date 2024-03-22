// Importar librería mongoose
const mongoose = require("mongoose");

// Crear función que conecta con la BBDD
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Conectado con la BBDD");
    } catch (error) {
        console.log("Error conectando con la BBDD");
    }
}

// Exportar la función de conexión
module.exports = { connectDB }