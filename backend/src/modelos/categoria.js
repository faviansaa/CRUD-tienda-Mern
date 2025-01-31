const mongoose = require('mongoose')

const categoriaSchema = new mongoose.Schema({
    nombre:{type:String , required:true},
    descripcion:{type:String, required:true},
    fechaCreacion: { type: Date, default: Date.now, required: true }

})

module.exports = mongoose.model('categoria', categoriaSchema)