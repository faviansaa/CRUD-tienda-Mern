const mongoose =require('mongoose')
const Categoria = require('../modelos/categoria');


exports.crearCategoria = async (req,res)=>{
    try{
        const nuevaCategoria = new Categoria(req.body);
        await nuevaCategoria.save();
        res.status(201).json(nuevaCategoria);
        

    }catch(e){
        res.status(500).json({mensaje: 'Error al crear la Categoria', error: error.message})

    };
};

exports.obtenerCategoria = async(req, res)=>{
    try{
        if(req.params.id){
            const categoria = await Categoria.findById(req.params.id);
            if(!categoria){
                return res.status(404).json({mensaje: 'Categoria no encontrada'})
            }
            return res.status(200).json(categoria)
        }else{
            const categorias = await categoria.find();
            return res.status(201).json(categorias)
        };
        

    }catch(e){
        return res.status(500).json({
            mensaje: 'Error al obtener las categorias', error: e.message
        });

    };

};


exports.actualizarCategoria = async(req,res) =>{
    try{
        const categoriaActualizada = await Categoria.findByIdAndUpdate(req.params.id , req.body, {new: true});
        res.status(200).json(categoriaActualizada);

    }catch(e){
        res.status(500).json({
            mensaje: 'Error al actualizar la categoria',
            error: e.message
        });

    };
};

exports.eliminarCategoria = async (req, res)=>{
    try{
        const categoriaEliminada = await Categoria.findByIdAndDelete(req.params.id)
        res.status(200).json({mensaje: 'Categoria Eliminada exitosamente'})

    }catch(e){
        res.status(500).json({
            mensaje:'Error al eliminar la categoria',
            error: e.message
        });

    };
};

