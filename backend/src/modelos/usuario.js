const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    nombre: {type:String, required:true},
    correo:{type:String, required:true},
    contraseña:{type:String, required:true},
    fechaCreacion: { type: Date, default: Date.now, required: true }
})

module.exports = mongoose.model('usuario', UsuarioSchema)