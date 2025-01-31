import React, { useState } from 'react';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    if (!correo || !contraseña) {
      setError('Por favor, complete todos los campos.');
    } else {
      setError('');

      try {
        // Enviar las credenciales al backend para obtener el token
        const response = await axios.post('http://localhost:5000/api/usuario/auth/iniciarSesion', {
          correo,
          contraseña
        });

        if (response.status === 200) {
          // El login fue exitoso, guardar el token
          const { token } = response.data;

          // Verificar el token en la consola del navegador
          console.log('Token generado:', token);

          localStorage.setItem('token', token); // Guardar el token en el localStorage
          alert('Iniciar sesión exitoso');
          navigate('/productos'); // Redirigir al usuario a la página de productos
        }
      } catch (error) {
        // Si hay un error en la solicitud (por ejemplo, credenciales incorrectas)
        setError(error.response?.data?.mensaje || 'Correo o contraseña incorrectos');
      }
    }
  }

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <div className="p-4 bg-white rounded shadow-lg w-100" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4 text-primary">Bienvenido</h2>
        <p className="text-muted text-center mb-4">Por favor, inicie sesión para continuar</p>
        {error && <div className="alert alert-danger text-center">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="correo" className="form-label">Correo electrónico</label>
            <input
              type="email"
              id="correo"
              placeholder="Escriba su correo"
              className="form-control"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="contraseña" className="form-label">Contraseña</label>
            <input
              type="password"
              id="contraseña"
              placeholder="Escriba su contraseña"
              className="form-control"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
}
