const { isAuth, isAdmin } = require("../../middlewares/auth");
const { getUserById, getUsers, register, login, deleteUser, putUser, doAdmin, deleteFavorite } = require("../controllers/users");

// Importar método Router de la librería express
const usersRouter = require("express").Router();

// Ruta para obtener registro por id
usersRouter.get("/:id", getUserById);

// Listado de registros
usersRouter.get("/", isAuth, getUsers);

// Regisgtro de usuario
usersRouter.post("/", register);

// Login
usersRouter.post("/login", login);

// Actualizar el usario
usersRouter.put("/:id", isAuth, putUser);

// Eliminar libro de favoritos
usersRouter.put("/delete-favorite/:id", isAuth, deleteFavorite);

// Actualizar el usuario a Admin
usersRouter.put("/do-admin/:id", isAdmin, doAdmin)

// Eliminar usuario
usersRouter.delete("/:id", isAdmin, deleteUser);


// Exportar enrutador
module.exports = usersRouter;