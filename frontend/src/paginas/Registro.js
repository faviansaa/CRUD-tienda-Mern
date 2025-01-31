import React, { useState } from 'react'
import Bootstrap from 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function Registro() {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        if (!nombre || !correo || !contraseña) {
            setError('Debe ingresar todos los campos');
        } else {
            setError("");

            try {
                // Enviar los datos del formulario al backend para registrar al usuario
                const response = await axios.post('http://localhost:5000/api/usuario/auth/registrar', {
                    nombre,
                    correo,
                    contraseña
                });

                if (response.status === 201) {
                    // Registro exitoso, iniciar sesión automáticamente
                    const { token } = response.data;
                    localStorage.setItem('token', token); // Guardar el token en el almacenamiento local
                    alert("Registro Exitoso");
                    navigate('/iniciarSesion'); // Redirigir al usuario a la página de inicio de sesión
                }

            } catch (error) {
                // Si hay un error durante el registro, mostrarlo
                setError(error.response?.data?.mensaje || 'Hubo un error al registrar el usuario');
            }
        }
    }

    return (
        <div className='d-flex vh-100 justify-content-center align-items-center bg-light'>
            <div className='p-4 bg-white rounded shadow-lg w-100' style={{ maxWidth: "400px" }}>
                <h1 className='text-center mb-4 text-primary'>Registro</h1>
                <p className='text-center mb-4 text-muted'>Por favor, Registrese para continuar</p>
                {error && <div className="alert alert-danger text-center">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nombre</label>
                        <input 
                            type='text'
                            id='nombre'
                            placeholder='Escriba su nombre'
                            value={nombre}
                            className='form-control'
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Correo Electronico</label>
                        <input 
                            type="email"
                            id='correo'
                            placeholder='Escriba su correo'
                            className='form-control'
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Contraseña</label>
                        <input 
                            type='password'
                            id='contraseña'
                            placeholder='Escriba su contraseña'
                            className='form-control'
                            value={contraseña}
                            onChange={(e) => setContraseña(e.target.value)}
                        />
                    </div>
                    <button type='submit' className='btn btn-primary w-100'>Registrarme</button>
                </form>
            </div>
        </div>
    );
};
