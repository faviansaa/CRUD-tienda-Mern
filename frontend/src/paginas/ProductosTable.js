import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { getProducto, createProducto, updateProducto, deleteProducto } from '../api';  // Importa las funciones de la API

export default function ProductosTable() {
  const [showCreate, setShowCreate] = useState(false);
  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] =  useState(false);
  const [productos, setProductos] = useState([]);  // Inicializa la lista de productos vacía
  const [newProduct, setNewProduct] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: '',
    cantidad: '',
  });

  // Fetch productos al cargar el componente
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await getProducto();
        setProductos(response.data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };
    fetchProductos();
  }, []);

  // Métodos
  const handleView = (producto) => {
    setSelectedProduct(producto);
    setShowView(true);
  };

  const handleEdit = (producto) => {
    console.log("Producto seleccionado para editar:", producto); // Verifica que el producto contiene el `id`
    setSelectedProduct(producto); // Guarda el producto en el estado
    setShowEdit(true); // Muestra el formulario de edición
  };

  const handleDelete = async (id) => {
    console.log("ID recibido en handleDelete:", id);
    try {
      await deleteProducto(id); 
      setProductos(productos.filter((producto) => producto._id !== id)); 
      alert(`Producto con ID ${id} eliminado.`);
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      alert(`Error al eliminar el producto ${id}`);
    }
  };
  

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("Producto seleccionado para actualizar:", selectedProduct); // Asegúrate de que tiene el `id`
  
    try {
      await updateProducto(selectedProduct._id, selectedProduct); // Usa `_id` si tu backend usa MongoDB
      setProductos(
        productos.map((producto) =>
          producto._id === selectedProduct._id ? selectedProduct : producto
        )
      );
      setShowEdit(false);
      alert("Producto actualizado con éxito.");
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      alert("Error al actualizar el producto.");
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct({ ...selectedProduct, [name]: value });
  };

  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const newProducto = { ...newProduct, precio: parseFloat(newProduct.precio), cantidad: parseInt(newProduct.cantidad, 10) };
    try {
      const response = await createProducto(newProducto);  // Llama a la función createProducto
      setProductos([...productos, response.data]);
      setNewProduct({ nombre: '', descripcion: '', precio: '', categoria: '', cantidad: '' });
      setShowCreate(false);
      alert('Producto creado con éxito.');
    } catch (error) {
      console.error('Error al crear el producto:', error);
      alert('Error al crear el producto.');
    }
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <div className="text-center">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1>Lista De Productos</h1>
          <button className="btn btn-success btn-sm ms-3" onClick={() => setShowCreate(true)}>
            <i className="bi bi-plus-circle"></i> Crear
          </button>
        </div>

        <table className="table mt-4">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Descripción</th>
              <th scope="col">Precio</th>
              <th scope="col">Categoría</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Acción</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {productos.map((producto) => (
              <tr key={producto._id}>
                <th scope="row">{producto._id}</th>
                <td>{producto.nombre}</td>
                <td>{producto.descripcion}</td>
                <td>{producto.precio}</td>
                <td>{producto.categoria}</td>
                <td>{producto.cantidad}</td>
                <td>
                  <button className="btn btn-primary btn-sm me-2" onClick={() => handleView(producto)}>
                    <i className="bi bi-eye"></i> Ver
                  </button>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(producto)}>
                    <i className="bi bi-pencil-square"></i> Editar
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(producto._id)}>
                    <i className="bi bi-trash3"></i> Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modales */}
        {showCreate && (
          <div className="card p-3" style={{ width: '18rem', margin: '10px auto' }}>
            <h5 className="card-title">Crear Producto</h5>
            <form onSubmit={handleCreate}>
              <div className="mb-2">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  value={newProduct.nombre}
                  onChange={handleNewProductChange}
                  required
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Descripción</label>
                <input
                  type="text"
                  className="form-control"
                  name="descripcion"
                  value={newProduct.descripcion}
                  onChange={handleNewProductChange}
                  required
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Precio</label>
                <input
                  type="number"
                  className="form-control"
                  name="precio"
                  value={newProduct.precio}
                  onChange={handleNewProductChange}
                  required
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Categoría</label>
                <input
                  type="text"
                  className="form-control"
                  name="categoria"
                  value={newProduct.categoria}
                  onChange={handleNewProductChange}
                  required
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Cantidad</label>
                <input
                  type="number"
                  className="form-control"
                  name="cantidad"
                  value={newProduct.cantidad}
                  onChange={handleNewProductChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success btn-sm me-2">
                Guardar
              </button>
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowCreate(false)}>
                Cancelar
              </button>
            </form>
          </div>
        )}

        {showView && selectedProduct && (
          <div className="card p-3" style={{ width: '18rem', margin: '10px auto' }}>
            <h5 className="card-title">Detalles del Producto</h5>
            <p><strong>Nombre:</strong> {selectedProduct.nombre}</p>
            <p><strong>Descripción:</strong> {selectedProduct.descripcion}</p>
            <p><strong>Precio:</strong> {selectedProduct.precio}</p>
            <p><strong>Categoría:</strong> {selectedProduct.categoria}</p>
            <p><strong>Cantidad:</strong> {selectedProduct.cantidad}</p>
            <button className="btn btn-secondary btn-sm" onClick={() => setShowView(false)}>
              Cerrar
            </button>
          </div>
        )}

        {showEdit && selectedProduct && (
          <div className="card p-3" style={{ width: '18rem', margin: '10px auto' }}>
            <h5 className="card-title">Editar Producto</h5>
            <form onSubmit={handleUpdate}>
              <div className="mb-2">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  value={selectedProduct.nombre}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Descripción</label>
                <input
                  type="text"
                  className="form-control"
                  name="descripcion"
                  value={selectedProduct.descripcion}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Precio</label>
                <input
                  type="number"
                  className="form-control"
                  name="precio"
                  value={selectedProduct.precio}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Categoría</label>
                <input
                  type="text"
                  className="form-control"
                  name="categoria"
                  value={selectedProduct.categoria}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-2">
                <label className="form-label">Cantidad</label>
                <input
                  type="number"
                  className="form-control"
                  name="cantidad"
                  value={selectedProduct.cantidad}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="btn btn-success btn-sm me-2">
                Guardar
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setShowEdit(false)}
              >
                Cancelar
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
