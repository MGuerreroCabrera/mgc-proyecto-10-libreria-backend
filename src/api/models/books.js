// Importar librería mongoose
const mongoose = require("mongoose");

// Crear el Schema
const bookSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        cover: { type: String, required: true },
        author: { type: String, required: false, trim: true },
        price: { type: Number, required: true },
        publishedOn: { type: String, required: false }
    }, 
    {
        timestamps: true,
        collection: "books"
    });

// Crear el modelo
const Book = mongoose.model("books", bookSchema, "books");

// Exportar el modelo
module.exports = Book;