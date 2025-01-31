CRUD Tienda MERN Stack

Descripción
Sistema de gestión de tienda desarrollado con el stack MERN (MongoDB, Express, React y Node.js). Permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) para productos, categorías y usuarios.
Características
•	Gestión de productos
•	Gestión de categorías
•	Autenticación y autorización de usuarios
•	Validación de datos
•	Manejo de errores

Tecnologías Utilizadas
Backend
•	Node.js
•	Express
•	MongoDB
•	Mongoose
•	JWT para autenticación
•	Bcrypt para encriptación
•	Cors
•	Dotenv
Frontend
•	React
•	React Router DOM
•	bootstrap


Instalación Backend
1. Clonar el repositorio:
git clone https://github.com/faviansaa/CRUD-tienda-Mern.git
cd CRUD-tienda-mern/backend

2. Instalar dependencias:
npm install

3. Crear archivo .env y configurar variables de entorno:
PORT = 5000
MONGO_URI= mongodb://127.0.0.1:27017/Tienda
JWT_SECRET = mi_clave_secreta

4. Iniciar el servidor:
npm run dev

Dependencias Principales Backend
- express: Framework web para Node.js
- mongoose: ODM para MongoDB
- dotenv: Manejo de variables de entorno
- bcrypt: Encriptación de contraseñas
- jsonwebtoken: Implementación de JWT
- cors: Middleware para habilitar CORS
- body-parser: Middleware para parsear el body de las peticiones


Características Backend
- Sistema de autenticación con JWT
- Protección de rutas con middleware
- Validación de datos
- CRUD completo para:

- Productos
- Categorías
- Usuarios

- Conexión segura a MongoDB
- Encriptación de contraseñas

Usuarios
- POST /api/usuario/auth/registrar - Registro de usuarios
- POST /api/usuario/auth/iniciarSesion - Inicio de sesión de usuarios
- GET /api/usuario/:id? - Obtener perfil de usuario
- PUT /api/usuario/actualizar/:id - Actualizar perfil de usuario
- DELETE /api/usuario/vaciar/:id? - Eliminar perfil de usuario

Productos
- GET /api/producto - Obtener todos los productos
- POST /api/producto - Crear producto
- PUT /api/producto/:id - Actualizar producto
- DELETE /api/producto/:id - Eliminar producto

Categorías
- GET /api/categoria - Obtener todas las categorías
- POST /api/categoria - Crear categoría
- PUT /api/categoria/:id - Actualizar categoría
- DELETE /api/categoria/:id - Eliminar categoría
