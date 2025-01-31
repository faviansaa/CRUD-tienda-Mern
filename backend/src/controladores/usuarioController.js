const mongoose = require('mongoose')
const Usuario = require('../modelos/usuario')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')


exports.registrarUsuario = async (req, res) => {
    try {
        const { nombre, correo, contraseña } = req.body;

        // Validar que todos los campos estén presentes
        if (!nombre || !correo || !contraseña) {
            return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
        }

        // Verificar si el usuario ya existe
        const usuarioExistente = await Usuario.findOne({ correo });
        if (usuarioExistente) {
            return res.status(400).json({ mensaje: 'Este usuario ya está registrado' });
        }

        // Cifrar la contraseña
        const contrasenaHash = await bcryptjs.hash(contraseña, 10);

        // Crear el nuevo usuario
        const nuevoUsuario = new Usuario({
            nombre,
            correo,
            contraseña: contrasenaHash,
        });

        // Guardar usuario en la base de datos
        await nuevoUsuario.save();

        // Generar el token JWT
        const token = jwt.sign({ id: nuevoUsuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Enviar la respuesta con el token
        return res.status(201).json({
            mensaje: 'Usuario registrado exitosamente',
            token,
        });
    } catch (e) {
        return res.status(500).json({
            mensaje: 'Error al registrar el usuario',
            error: e.message,
        });
    }
};

// Iniciar sesión
exports.IniciarSesion = async (req, res) => {
    const { correo, contraseña } = req.body;

    try {
        // Validar que ambos campos estén presentes
        if (!correo || !contraseña) {
            return res.status(400).json({ mensaje: 'Correo y contraseña son obligatorios' });
        }

        // Buscar al usuario en la base de datos
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        // Comparar la contraseña ingresada con la almacenada
        const esValida = await bcryptjs.compare(contraseña, usuario.contraseña);
        if (!esValida) {
            return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
        }

        // Generar el token JWT
        const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Responder con éxito
        return res.status(200).json({
            mensaje: 'Inicio de sesión exitoso',
            token,
        });
    } catch (e) {
        return res.status(500).json({
            mensaje: 'Error al iniciar sesión',
            error: e.message,
        });
    }
};

exports.obtenerPerfilUsuario = async (req, res) => {
    try {
        if (req.params.id) {
            const usuario = await Usuario.findById(req.params.id);
            
            if (!usuario) {
                return res.status(404).json({ mensaje: 'Usuario no encontrado' });
            }
            return res.status(200).json(usuario);

        } else {
            // Si no se pasa un ID, devolver todos los usuarios
            const usuarios = await Usuario.find();
            return res.status(200).json(usuarios);
        }
    } catch (e) {
        res.status(500).json({
            mensaje: 'Error al obtener los usuarios',
            error: e.message
        });
    }

};

exports.actualizarPerfilUsuario = async (req, res) => {
    try {
        const { id } = req.params; // Obtener el ID de los parámetros
        const datosActualizados = req.body; // Datos para actualizar

        // Buscar y actualizar el usuario
        const usuarioActualizado = await Usuario.findByIdAndUpdate(id, datosActualizados, {
            new: true, // Retorna el documento actualizado
            runValidators: true // Aplica las validaciones del esquema
        });

        if (!usuarioActualizado) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        res.status(200).json( {mensaje: 'Perfil actualizado', usuarioActualizado});
    } catch (e) {
        res.status(500).json({
            mensaje: 'Error al actualizar el usuario',
            error: e.message
        });
    }
};


exports.eliminarPerfilUsuario = async (req, res) => {
    try {
        const { id } = req.params; // Obtener el ID de los parámetros

        // Buscar y eliminar el usuario
        const usuarioEliminado = await Usuario.findByIdAndDelete(id);

        if (!usuarioEliminado) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        res.status(200).json({
            mensaje: 'Usuario eliminado correctamente',
            usuario: usuarioEliminado
        });
    } catch (e) {
        res.status(500).json({
            mensaje: 'Error al eliminar el usuario',
            error: e.message
        });
    }
};




