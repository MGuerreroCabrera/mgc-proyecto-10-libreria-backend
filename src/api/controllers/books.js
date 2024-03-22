const Book = require("../models/books");

// Listado de registros
const getBooks = async (req, res, next) => {
    try {
        // Crear variable que contendrá los registros
        const books = await Book.find();
        // Devolver resultado OK y registros
        return res.status(200).json(books);
    } catch (error) {
        return res.status(400).json(error);
    }
};

// Listado de registro por ID
const getBookById = async (req, res, next) => {
    try {
        // Recoger el id con object destructuring
        const { id } = req.params;
        // Lanzar consulta a BBDD con el id y guardar resultado
        const book = await Book.findById(id);
        // Devolver estado a OK y registro
        return res.status(200).json(book);
    } catch (error) {
        return res.status(400).json(error);
    }
};

// Insertar registro
const postBook = async (req, res, next) => {
    try {
        // Recoger datos del nuevo registro
        const newBook = new Book(req.body);
        // Lanzar la orden a BBDD de guardar registro
        const bookSaved = await newBook.save();
        // Devoler resultado OK y registro guardado
        return res.status(201).json(bookSaved);
    } catch (error) {
        return res.status(400).json(error);
    }
};

// Actualizar registro
const putBook = async (req, res, next) => {
    try {
        // Obtener el id del registro a actualizar
        const { id } = req.params;
        // Recoger los datos a actualizar
        const newBook = new Book(req.body);
        // Poner mismo id al nuevo registro
        newBook._id = id;
        // Lanzar orden a BBDD para actualizar el registro
        const bookUpaded = await Book.findByIdAndUpdate(id, newBook, { new: true });
        // Devolver resultado OK y registro actualizado
        return res.status(200).json(bookUpaded);
    } catch (error) {
        return res.status(400).json(error);
    }
};

// Eliminar registro
const deleteBook = async (req, res, next) => {
    try {
        // Recoger el id del registro a eliminar
        const { id } = req.params;
        // Lanzar orden a BBDD de eliminar el registro
        const bookDeleted = await Book.findByIdAndDelete(id);
        // Devolver resultado OK y registro eliminado
        return res.status(200).json(bookDeleted);
    } catch (error) {
        return res.status(400).json(error);
    }
};

// Exportar lo métodos
module.exports = { getBooks, getBookById, postBook, putBook, deleteBook }