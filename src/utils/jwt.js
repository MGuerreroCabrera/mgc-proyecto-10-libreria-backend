// Importar la librería jsonwebtoken
const jwt = require("jsonwebtoken");

// Crear función que genere el token
const generateKey = (id) => {
    // Devolver el token generado con el id del usuario
    return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "1w" });
};

// Crear función qeu verifica el token
const verifyToken = (token) => {
    // Devolver el resultado de la ejecución de la función verify
    return jwt.verify(token, process.env.SECRET_KEY);
};

// Exportar función
module.exports = { generateKey, verifyToken }

