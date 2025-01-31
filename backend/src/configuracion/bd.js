const mongoose = require('mongoose');

const connectBD = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('conexion Exitosa')
        
    } catch (err) {
        console.log('Error al conectar con MongoDB', err)
        process.exit(1)
        
    }
    

}


module.exports = connectBD;