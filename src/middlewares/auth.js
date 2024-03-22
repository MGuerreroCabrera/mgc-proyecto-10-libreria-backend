const User = require("../api/models/users");
const { verifyToken } = require("../utils/jwt");

// Crear función que valida si el usuario está autenticado
const isAuth = async (req, res, next) => {
    try {
        // Recoger el token del req.headers.authorization
        const token = req.headers.authorization;
        // Limpiar el token. Quitar Bearer 
        const parsedToken = token.replace("Bearer ", "");
        // Verificar el token Recoger el id del usuario
        const { id } = verifyToken(parsedToken);
        // Obtener datos del usuario
        const user = await User.findById(id);        
        // Eliminar el dato password
        user.password = null;    
        // Meter los datos del usuario en los datos de la petición
        req.user = user;
        // Pasar a lo siguiente
        next();
    } catch (error) {
        return res.status(400).json("Usuario no autorizado");
    }
};

// Crear función que el usuario es Administrador
const isAdmin = async (req, res, next) => {
    try {
        // Recoger el token del usuario
        const token = req.headers.authorization;
        // Limpiar token y quitar Bearer
        const parsedToken = token.replace("Bearer ", "");
        // Verificar el token y recoger el id del usuario
        const { id } = verifyToken(parsedToken);
        // Obtener datos del usuario
        const user = await User.findById(id);
        // Comprobar el rol del usuario
        if(user.rol !== "admin"){
            return res.status(400).json("Operación permitida únicamente a Administradores");
        }
        // Inicializar a null la contraseña del usuario
        user.password = null;
        // Inyectar datos del usuario en la petición
        req.user = user;
        // Pasar a lo siguiente
        next();

    } catch (error) {
        return res.status(400).json("Doy error");
    }
};

module.exports = { isAuth, isAdmin }