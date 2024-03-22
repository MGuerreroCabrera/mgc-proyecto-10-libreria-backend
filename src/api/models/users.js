// Importar librería mongoose
const mongoose = require("mongoose");
// Importar librería bcrypt
const bcrypt = require("bcrypt");

// Crear Schema
const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        lastName: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true },
        password: { type: String, required: true },
        favorites: [ { type: mongoose.Types.ObjectId, required: false, ref: "books" } ],
        rol: { type: String, required: true, enum: [ "admin", "user" ], default: "user" }
    }, 
    {
        timestamps: true,
        collection: "users"
    });

// Crear función que encripta la contraseña
userSchema.pre("save", function() {
    this.password = bcrypt.hashSync(this.password, 10);
})

// Crear modelo
const User = mongoose.model("users", userSchema, "users");

// Exportar modelo
module.exports = User;