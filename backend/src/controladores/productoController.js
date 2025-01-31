const mongoose = require('mongoose')
const Producto = require('../modelos/producto')

exports.crearProducto  = async (req,res)=>{
    try{
        const nuevoProducto = new Producto(req.body);
         await nuevoProducto.save();
         res.status(201).json(nuevoProducto);


    }catch(e){
        res.status(500).json({mensaje:'Error al crear producto', error: error.message})

    }
    
};

exports.obtenerProducto = async (req, res, next)=>{
    try{
        if (req.params.id){
            const producto = await Producto.findById(req.params.id);

            if(!producto){
                return res.status(404).json({ mensaje: 'Producto no encontrado'})
            }
            return res.status(201).json(producto)
            
        }else{
            const productos = await Producto.find();
            return res.status(200).json(productos);
        }

    }catch(e){
        res.status(500).json({
            mensaje: 'Error al obtener los usuarios',
            error: e.message
        });

    };
};


exports.actualizarProducto = async(req, res)=>{
    try{
        const procductoActualizado = await Producto.findByIdAndUpdate(req.params.id , req.body, {new:true});
        res.status(200).json(procductoActualizado);

    }catch(e){
        res.status(500).json({
            mensaje: 'Error al Actualizar Producto',
            error: e.message
        })

    }
};

exports.eliminarProducto = async(req, res) =>{
    try{      
        const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
        res.status(200).json({mensaje: 'Producto eliminado exitosamente'})

    }catch(e){
        res.status(500).json({
            mensaje:'Error al eliminar el producto',
            error : e.message
        })

    }
    
}