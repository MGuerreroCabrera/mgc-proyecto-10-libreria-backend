// Importar librería bcrypt - COMPROBACIÓN DE CONTRASEÑAS
const bcrypt = require("bcrypt");
const User = require("../models/users");
const { generateKey } = require("../../utils/jwt");

// Obtener registros
const getUsers = async (req, res, next) => {
    try {
        // Lanzar la consulta a BBDD y guardala en una variable
        const users = await User.find().populate("favorites");
        // Devolver resultado OK y listado de usuarios
        return res.status(200).json(users);
    } catch (error) {
        return res.status(400).json("Error al obtener usuarios de la BBDD");
    }
};

// Obtener registro por id
const getUserById = async (req, res, next) => {
    try {
        // Obtener el id de req.params
        const { id } = req.params;
        // Lanzar consulta a BBDD para obtener el usuario
        const user = await User.findById(id).populate("favorites");
        // Devolver resultado OK y datos del usuario
        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json("Error al obtener los datos del usuario");
    }
};

// Registro de usuario
const register = async (req, res, next) => {
    try {
        // Buscar usuario duplicado - campo email
        const userDuplicate = await User.findOne({ email: req.body.email });
        // Comprobar que la dirección de correo electrónico no exista
        if(userDuplicate) {
            // Devolver resultado OK y error de usuario duplicado
            return res.status(409).json("La dirección de correo electrónico ya está registrada");
        } 
        // Recoger datos a insertar
        const newUser = new User(req.body);
        // Lanzar orden a BBDD que guarde los datos del nuevo usuario
        const userSaved = await newUser.save();
        // Devolver resultado OK y datos guardados
        return res.status(201).json(userSaved);
    } catch (error) {
        return res.status(400).json(error);
    }
};

// Login de usuario
const login = async (req, res, next) => {
    try {
        // Recoger los valores email y password
        const { email, password } = req.body;
        // Validar que el usuario está registrado
        const userLoged = await User.findOne({ email }); // Utilizando Shortcut por haber desestructurizado el email.
        // Si no lo está devolver resultado KO y mensaje de error
        if(!userLoged) {
            return res.status(400).json("El nombre de usuario o la contraseña son incorrectos");            
        }
        // Comparar password con el método compareSumc de bcrypt
        if(bcrypt.compareSync(password, userLoged.password)) {
            // Crear el token pasándole el id de usuario            
            const token = generateKey(userLoged._id);
            // Devoler respuesta OK y datos del login
            return res.status(200).json({ token, userLoged })
        }
        // Devolver resultado KO y error
        return res.status(400).json("Usuario o contraseña incorrectos");
        
    } catch (error) {
        return res.status(400).json(error);
    }
};

// Actualizar el usuario
const putUser = async (req, res, next) => {
    try {
        // Recoger el id del usuario a modificar
        const { id } = req.params;
        // Comprobar que el usuario a modificar es el mismo que realiza la acción
        if(req.user._id.toString() !== id){
            return res.status(400).json("No puedes modificar otro usuario");
        }
        // Recoger los datos antiguos
        const oldUser = await User.findById(id);
        // Crear la variable que contendrá los nuevos datos
        const newUser = new User(req.body);
        // Asignar el mismo id al nuevo registro
        newUser._id = id;
        // Control cambio rol
        if(newUser.rol === "admin"){
            newUser.rol = "user";
        }
        // Asignar los que tenía como favoritos más los nuevos
        newUser.favorites = [...oldUser.favorites, ...newUser.favorites];
        console.log(newUser.favorites);
        // Lanzar la orden a la BBDD de actualizar el registro
        const userUpdated = await User.findByIdAndUpdate(id, newUser, { new: true });
        // Devolver resultado OK y registro actualizado
        return res.status(200).json(userUpdated);
    } catch (error) {
        return res.status(400).json(error);
    }
};

// Eliminar un libro de los favoritos
const deleteFavorite = async (req, res, next) => {
    try {
        // Recoger el id del usuario a modificar
        const { id } = req.params;

        // Recoger los datos antiguos
        const oldUser = await User.findById(id);
        
        // Recoger el id del libro del body
        const idBook = req.body.favorites;    
        
        // Crear array con los favoritos menos con el libro a eliminar
        const idx = oldUser.favorites.indexOf(idBook);
        oldUser.favorites.splice(idx, 1);

        // Crear la variable que contendrá los nuevos datos
        const newUser = new User(req.body);
        // Asignar el mismo id al nuevo registro
        newUser._id = id;

        // Asignar los que tenía como favoritos más los nuevos
        newUser.favorites = oldUser.favorites;
        // Lanzar la orden a la BBDD de actualizar el registro
        const userUpdated = await User.findByIdAndUpdate(id, newUser, { new: true });
        // Devolver resultado OK y registro actualizado
        return res.status(200).json(userUpdated);
        
    } catch (error) {
        return res.status(400).json(error);
    }
};

// Actualizar registro. Do admin
const doAdmin = async (req, res, next) => {
    try {
        // Recoger el id del registro a actualizar
        const { id } = req.params;
        // Crear variable con datos a actualizar
        const userToAdmin = new User({ rol: "admin" });
        // Poner el  mismo id
        userToAdmin._id = id;
        // Lanza la sentencia para actualiza el resgistro
        const userUpdated = await User.findByIdAndUpdate(id, userToAdmin, { new: true });
        // Devolver resultado ok y registro actualizado
        returnResult(res, 200, userUpdated);
    } catch (error) {
        // Devolver estado 400 y error
        returnResult(res, 400, error);
    }
};


// Eliminar registro. 
const deleteUser = async (req, res, next) => {
    try {
        // Recoger el id del usuario a eliminar
        const { id } = req.params;
        // Llamar a la BBDD para eliminar el usuario
        const userDeleted = await User.findByIdAndDelete(id);
        // Devolver resultado OK y datos del registro eliminado
        return res.status(200).json(userDeleted);
    } catch (error) {
        return res.status(400).json("Error al eliminar el usuario");
    }
};

// Exportar métodos
module.exports = { getUsers, getUserById, register, login, putUser, doAdmin, deleteUser, deleteFavorite }