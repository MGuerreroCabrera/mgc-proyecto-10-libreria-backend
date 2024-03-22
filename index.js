// Importar librería express
const express = require("express");
const { connectDB } = require("./src/config/db");
const booksRouter = require("./src/api/routes/books");
const usersRoutes = require("./src/api/routes/users");
const usersRouter = require("./src/api/routes/users");

// Configurar librería dotenv para poder trabajar con variables de entorno
require("dotenv").config();

// Crear el servidor
const app = express();

// Definir puerto de escucha
const port = 3000;

// Indicar al servidor que puede recibir cuerpos en formato json
app.use(express.json());

// Indicar rutas para los libros
app.use("/api/v1/books", booksRouter);
// Indicar rutas para los usuarios
app.use("/api/v1/users", usersRouter)

// Definir acceso cualquier ruta no creada
app.use("*", (req, res, next) => {
    return res.status(404).json("Route not found");
});

// Levantar el servidor
app.listen(port, () => {
    console.log("Servidor levantado en http://localhost:" + port);
});

// Conectar con la BBDD
connectDB();