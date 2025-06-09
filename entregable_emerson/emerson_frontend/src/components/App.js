import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { motion } from 'framer-motion';

function App() {
  const [productos, setProductos] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [newProducto, setNewProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    cantidad: '',
    stock_minimo: ''
  });
  const [editProducto, setEditProducto] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [ventaProducto, setVentaProducto] = useState({
    producto_id: '',
    cantidad: 0,
  });
  const [clientes, setClientes] = useState([]);
  const [activeMenu, setActiveMenu] = useState('productos');

  useEffect(() => {
    axios.get('http://localhost:5000/api/productos')
      .then((response) => setProductos(response.data))
      .catch((error) => console.error('Error al cargar productos:', error));

    axios.get('http://localhost:5000/api/ventas')
      .then((response) => setVentas(response.data))
      .catch((error) => console.error('Error al cargar ventas:', error));
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      axios.get('http://localhost:5000/api/productos')
        .then((response) => {
          const filtered = response.data.filter((producto) =>
            producto.nombre.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setProductos(filtered);
        });
    } else {
      axios.get('http://localhost:5000/api/productos')
        .then((response) => setProductos(response.data));
    }
  };

  const handleCreate = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/productos', newProducto)
      .then((response) => {
        alert(response.data.message);
        setNewProducto({ nombre: '', descripcion: '', precio: '', cantidad: '', stock_minimo: '' });
        setProductos([...productos, response.data]);
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (editProducto) {
      axios.put(`http://localhost:5000/api/productos/${editProducto.id}`, editProducto)
        .then((response) => {
          alert(response.data.message);
          setProductos((prev) =>
            prev.map((p) => (p.id === editProducto.id ? editProducto : p))
          );
          setEditProducto(null);
        });
    }
  };

  const handleVenta = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/venta', ventaProducto)
      .then((response) => {
        alert(response.data.message);
        axios.get('http://localhost:5000/api/productos')
          .then((res) => setProductos(res.data));
        axios.get('http://localhost:5000/api/ventas')
          .then((res) => setVentas(res.data));
      });
  };

  const handleEditClick = (producto) => {
    setEditProducto({ ...producto });
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Está seguro de eliminar este producto?')) {
      axios.delete(`http://localhost:5000/api/productos/${id}`)
        .then((response) => {
          alert(response.data.message);
          setProductos((prev) => prev.filter((p) => p.id !== id));
        });
    }
  };

  const handleAddClient = (e) => {
    e.preventDefault();
    const newClient = {
      nombre: e.target.nombre.value,
      email: e.target.email.value,
      telefono: e.target.telefono.value,
    };
    setClientes([...clientes, newClient]);
    alert('Cliente agregado exitosamente');
  };

  return (
    <div>
      {/* Navbar superior */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
        <div className="container-fluid">
          <img src="/logoBotica.png" alt="Logo" style={{ width: '40px', marginRight: '10px' }} />
          <span className="navbar-brand">BOTICA EMERSON VILCA</span>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><button className="btn btn-outline-light me-2" onClick={() => setActiveMenu('productos')}>Productos</button></li>
              <li className="nav-item"><button className="btn btn-outline-light me-2" onClick={() => setActiveMenu('ventas')}>Ventas</button></li>
              <li className="nav-item"><button className="btn btn-outline-light me-2" onClick={() => setActiveMenu('agregarProducto')}>Agregar</button></li>
              <li className="nav-item"><button className="btn btn-outline-light me-2" onClick={() => setActiveMenu('clientes')}>Clientes</button></li>
              <li className="nav-item"><button className="btn btn-danger" onClick={() => alert('Cerrar sesión')}>Cerrar sesión</button></li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        {/* SECCIÓN PRODUCTOS */}
        {activeMenu === 'productos' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <h3 className="text-center mb-4 text-primary">Gestión de Inventario</h3>

            {/* Búsqueda */}
            <div className="d-flex justify-content-center mb-4">
              <input type="text" className="form-control me-2" style={{ maxWidth: 300 }} placeholder="Buscar producto" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              <button className="btn btn-success" onClick={handleSearch}>Buscar</button>
            </div>

            {/* Lista de Productos */}
            <div className="row">
              {productos.length > 0 ? productos.map((producto) => (
                <div className="col-md-4" key={producto.id}>
                  <div className="card mb-4 border-0 shadow-sm" style={{ backgroundColor: "#f0f4f7", borderRadius: '12px' }}>
                    <div className="card-body">
                      <h5 className="card-title text-primary">{producto.nombre}</h5>
                      <p>{producto.descripcion}</p>
                      <p><strong>Precio:</strong> S/ {producto.precio}</p>
                      <p><strong>Stock:</strong> {producto.cantidad}</p>
                      <form onSubmit={handleVenta}>
                        <input type="number" min="1" max={producto.cantidad} value={ventaProducto.cantidad} onChange={(e) => setVentaProducto({ ...ventaProducto, cantidad: e.target.value, producto_id: producto.id })} className="form-control mb-2" placeholder="Cantidad" />
                        <div className="d-grid gap-2">
                          <button type="submit" className="btn btn-outline-success">Vender</button>
                          <button type="button" className="btn btn-outline-warning" onClick={() => handleEditClick(producto)}>Editar</button>
                          <button type="button" className="btn btn-outline-danger" onClick={() => handleDelete(producto.id)}>Eliminar</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )) : <p>No hay productos.</p>}
            </div>
          </motion.div>
        )}

        {/* SECCIÓN VENTAS */}
        {activeMenu === 'ventas' && (
          <div>
            <h3 className="text-center text-primary">Historial de Ventas</h3>
            <table className="table table-hover mt-3">
              <thead className="table-light">
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Total</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {ventas.map((venta) => (
                  <tr key={venta.id}>
                    <td>{venta.producto}</td>
                    <td>{venta.cantidad}</td>
                    <td>S/ {venta.total}</td>
                    <td>{new Date(venta.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* SECCIÓN CLIENTES */}
        {activeMenu === 'clientes' && (
          <div className="card p-4 shadow-sm">
            <h3 className="text-primary">Registrar Cliente</h3>
            <form onSubmit={handleAddClient}>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input type="text" className="form-control" name="nombre" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" name="email" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Teléfono</label>
                <input type="text" className="form-control" name="telefono" required />
              </div>
              <button className="btn btn-primary">Agregar Cliente</button>
            </form>
          </div>
        )}

        {/* SECCIÓN AGREGAR/EDITAR PRODUCTO */}
        {activeMenu === 'agregarProducto' && (
          <div className="card p-4 shadow-sm">
            <h3 className="text-primary">{editProducto ? 'Actualizar Producto' : 'Nuevo Producto'}</h3>
            <form onSubmit={editProducto ? handleUpdate : handleCreate}>
              {['nombre', 'descripcion', 'precio', 'cantidad', 'stock_minimo'].map((field, i) => (
                <div className="mb-3" key={i}>
                  <label className="form-label">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    type={field === 'precio' || field === 'cantidad' || field === 'stock_minimo' ? 'number' : 'text'}
                    className="form-control"
                    value={editProducto ? editProducto[field] : newProducto[field]}
                    onChange={(e) => {
                      const value = e.target.value;
                      editProducto
                        ? setEditProducto({ ...editProducto, [field]: value })
                        : setNewProducto({ ...newProducto, [field]: value });
                    }}
                    required
                  />
                </div>
              ))}
              <button type="submit" className="btn btn-success">
                {editProducto ? 'Actualizar' : 'Crear'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
