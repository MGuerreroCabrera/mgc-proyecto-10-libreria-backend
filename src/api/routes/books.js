const { isAuth, isAdmin } = require("../../middlewares/auth");
const { getBooks, getBookById, postBook, putBook, deleteBook } = require("../controllers/books");

// Importar librería express con el método Router
const booksRouter = require("express").Router();

// Ruta para listado de registro por id
booksRouter.get("/:id", isAuth, getBookById);

// Ruta para listado de registros
booksRouter.get("/", getBooks);

// Ruta para insertar registro
//booksRouter.post("/", isAuth, postBook);
booksRouter.post("/", postBook);

// Ruta para actualizar un registro
booksRouter.put("/:id", putBook);

// Ruta para eliminar un registro
booksRouter.delete("/:id", isAdmin, deleteBook);

// Exportar enrutador
module.exports = booksRouter;