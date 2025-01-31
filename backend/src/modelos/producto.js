const mongoose = require('mongoose')

const productoSchema = new mongoose.Schema({
    nombre:{type: String, required: true},
    descripcion:{type: String, required: true},
    precio:{type: Number, required: true},
    categoria:{type: mongoose.Schema.Types.ObjectId, ref:'categoria', required:true},
    cantidad :{type: Number, required:true},
    fechaCreacion: { type: Date, default: Date.now, required: true }

})

module.exports = mongoose.model('producto', productoSchema)