import axios from "axios";

const api = axios.create({
    baseURL: "https://crud-backend-hvmw.onrender.com"
})



// Productos
export const getProducto = () => api.get('/api/producto/')
export const createProducto = (producto) => api.post('/api/producto/crear', producto)
export const updateProducto = (id, producto) => api.put(`/api/producto/${id}`, producto);
export const deleteProducto = (id) => api.delete(`/api/producto/${id}`);

//usuarios


export const getUsuario = (id) => api.get(`/api/usuario/${id}`);
export const crearUsuario = (usuario) => api.post('/api/usuario/auth/registrar', usuario);
export const iniciarSesion = (credentials) => api.post('/api/usuario/auth/iniciarSesion', credentials);

// Obtener perfil del usuario autenticado
export const obtenerPerfil = () => api.get('/api/usuario/perfil', {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Suponiendo que se almacena el token en localStorage
    }
});

// Actualizar perfil del usuario autenticado
export const actualizarPerfil = (perfil) => api.put('/api/usuario/perfil', perfil, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Token en headers para autenticación
    }
});

// Eliminar usuario (opcional: con autenticación)
export const eliminarUsuario = (id) => api.delete(`/api/usuario/vaciar/${id}`, {
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Token en headers para autenticación
    }
});



export default api;