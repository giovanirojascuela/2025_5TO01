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
  const [editProducto, setEditProducto] = useState(null);  // Producto que estamos editando
  const [searchQuery, setSearchQuery] = useState("");
  const [ventaProducto, setVentaProducto] = useState({
    producto_id: '',
    cantidad: 0,
  });
  const [clientes, setClientes] = useState([]); // Estado para almacenar los clientes
  const [activeMenu, setActiveMenu] = useState('productos');  // Estado para el menú activo

  // Fetch productos y ventas
  useEffect(() => {
    axios.get('http://localhost:5000/api/productos')
      .then((response) => {
        setProductos(response.data);
      })
      .catch((error) => {
        console.error('Error al cargar productos:', error);
      });

    axios.get('http://localhost:5000/api/ventas')
      .then((response) => {
        setVentas(response.data);
      })
      .catch((error) => {
        console.error('Error al cargar ventas:', error);
      });
  }, []);

  // Barra de búsqueda
  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      axios.get('http://localhost:5000/api/productos')
        .then((response) => {
          const filteredProducts = response.data.filter((producto) =>
            producto.nombre.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setProductos(filteredProducts);
        })
        .catch((error) => {
          console.error('Error al cargar productos:', error);
        });
    } else {
      axios.get('http://localhost:5000/api/productos')
        .then((response) => {
          setProductos(response.data);
        })
        .catch((error) => {
          console.error('Error al cargar productos:', error);
        });
    }
  };

  // Crear un nuevo producto
  const handleCreate = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/productos', newProducto)
      .then((response) => {
        setNewProducto({
          nombre: '',
          descripcion: '',
          precio: '',
          cantidad: '',
          stock_minimo: '',
        });
        alert(response.data.message);
        setProductos((prevProductos) => [...prevProductos, response.data]);
      })
      .catch((error) => {
        console.error('Error al crear producto:', error);
      });
  };

  // Actualizar producto
  const handleUpdate = (e) => {
    e.preventDefault();
    if (editProducto) {
      axios.put(`http://localhost:5000/api/productos/${editProducto.id}`, editProducto)
        .then((response) => {
          alert(response.data.message);
          setProductos((prevProductos) =>
            prevProductos.map((producto) =>
              producto.id === editProducto.id ? editProducto : producto
            )
          );
          setEditProducto(null);  // Limpiar el estado de edición
        })
        .catch((error) => {
          console.error('Error al actualizar producto:', error);
        });
    }
  };

  // Registrar venta
  const handleVenta = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/venta', ventaProducto)
      .then((response) => {
        alert(response.data.message);
        axios.get('http://localhost:5000/api/productos')
          .then((response) => {
            setProductos(response.data);
          })
          .catch((error) => {
            console.error('Error al cargar productos después de venta:', error);
          });
        axios.get('http://localhost:5000/api/ventas')
          .then((response) => {
            setVentas(response.data);
          })
          .catch((error) => {
            console.error('Error al cargar ventas después de venta:', error);
          });
      })
      .catch((error) => {
        console.error('Error al registrar la venta:', error);
      });
  };

  // Handle edit button click
  const handleEditClick = (producto) => {
    setEditProducto({ ...producto });  // Cargar los datos del producto en el formulario de edición
  };

  // Eliminar producto
  const handleDelete = (id) => {
    if (window.confirm('¿Está seguro de eliminar este producto?')) {
      axios.delete(`http://localhost:5000/api/productos/${id}`)
        .then((response) => {
          alert(response.data.message);
          setProductos((prevProductos) => prevProductos.filter((producto) => producto.id !== id));
        })
        .catch((error) => {
          console.error('Error al eliminar producto:', error);
        });
    }
  };

  // Agregar un cliente (Formulario de clientes)
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
    <div className="d-flex">
      {/* Barra lateral */}
      <div className="bg-dark text-white p-3" style={{ width: '250px', height: '100vh' }}>
        <h4>Menú</h4>
        <div className="d-flex flex-column">
          <button className="btn btn-light mb-3" onClick={() => setActiveMenu('productos')}>Productos</button>
          <button className="btn btn-light mb-3" onClick={() => setActiveMenu('ventas')}>Ventas</button>
          <button className="btn btn-light mb-3" onClick={() => setActiveMenu('agregarProducto')}>Agregar Producto</button>
          <button className="btn btn-light mb-3" onClick={() => setActiveMenu('clientes')}>Clientes</button>
          <button className="btn btn-light mb-3" onClick={() => alert('Cerrar sesión')}>Cerrar sesión</button>
          {/* Agregar más botones falsos */}
          <button className="btn btn-light mb-3" onClick={() => alert('Reporte de Inventarios')}>Reporte de Inventarios</button>
          <button className="btn btn-light mb-3" onClick={() => alert('Historial de Clientes')}>Historial de Clientes</button>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container mt-5" style={{ flex: 1 }}>
        {/* Logo y Título Botica Vélez */}
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <img src="/logoBotica.png" alt="Logo Botica Vélez" style={{ width: '50px', marginRight: '10px', verticalAlign: 'middle' }} />
          <h1 style={{ margin: 0 }}>BOTICA VÉLEZ</h1>
        </motion.div>

        {/* Sección de Productos */}
        {activeMenu === 'productos' && (
          <div>
            <motion.h2
              className="text-center mb-4"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Gestión de Inventario
            </motion.h2>

            {/* Barra de búsqueda */}
            <div className="search-bar mb-4 d-flex justify-content-center">
              <input
                type="text"
                className="form-control mr-2"
                placeholder="Buscar producto"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button onClick={handleSearch} className="btn btn-success">Buscar</button>
            </div>

            {/* Lista de productos */}
            <h3>Lista de Productos</h3>
            <div className="row">
              {productos.length > 0 ? (
                productos.map((producto) => (
                  <div key={producto.id} className="col-md-4">
                    <div className="card mb-3 shadow-sm" style={{ backgroundColor: "#74ebd5", borderRadius: '10px' }}>
                      <div className="card-body">
                        <h5 className="card-title">{producto.nombre}</h5>
                        <p className="card-text">{producto.descripcion}</p>
                        <p className="card-text"><strong>Precio:</strong> S/ {producto.precio}</p>
                        <p className="card-text"><strong>Stock:</strong> {producto.cantidad}</p>
                        <form onSubmit={handleVenta}>
                          <input
                            type="number"
                            min="1"
                            max={producto.cantidad}
                            value={ventaProducto.cantidad}
                            onChange={(e) => setVentaProducto({
                              ...ventaProducto,
                              cantidad: e.target.value,
                              producto_id: producto.id,
                            })}
                            placeholder="Cantidad a comprar"
                            className="form-control mb-2"
                          />
                          <button type="submit" className="btn btn-primary me-2">Vender</button>
                        </form>
                        <button onClick={() => handleEditClick(producto)} className="btn btn-warning me-2">Editar</button>
                        <button onClick={() => handleDelete(producto.id)} className="btn btn-danger">Eliminar</button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No hay productos disponibles.</p>
              )}
            </div>
          </div>
        )}

        {/* Sección de Ventas */}
        {activeMenu === 'ventas' && (
          <div>
            <h3>Historial de Ventas</h3>
            <table className="table">
              <thead>
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

        {/* Sección de Clientes */}
        {activeMenu === 'clientes' && (
          <div>
            <h3>Formulario de Clientes</h3>
            <form onSubmit={handleAddClient}>
              <div className="form-group">
                <label>Nombre</label>
                <input type="text" className="form-control" name="nombre" required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" name="email" required />
              </div>
              <div className="form-group">
                <label>Teléfono</label>
                <input type="text" className="form-control" name="telefono" required />
              </div>
              <button type="submit" className="btn btn-primary mt-3">Agregar Cliente</button>
            </form>
          </div>
        )}

        {/* Sección para Agregar Producto */}
        {activeMenu === 'agregarProducto' && (
          <div>
            <h3>{editProducto ? 'Actualizar Producto' : 'Agregar Producto'}</h3>
            <form onSubmit={editProducto ? handleUpdate : handleCreate}>
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  name="nombre"
                  value={editProducto ? editProducto.nombre : newProducto.nombre}
                  onChange={(e) => {
                    if (editProducto) {
                      setEditProducto({ ...editProducto, nombre: e.target.value });
                    } else {
                      setNewProducto({ ...newProducto, nombre: e.target.value });
                    }
                  }}
                  required
                />
              </div>
              <div className="form-group">
                <label>Descripción</label>
                <input
                  type="text"
                  className="form-control"
                  name="descripcion"
                  value={editProducto ? editProducto.descripcion : newProducto.descripcion}
                  onChange={(e) => {
                    if (editProducto) {
                      setEditProducto({ ...editProducto, descripcion: e.target.value });
                    } else {
                      setNewProducto({ ...newProducto, descripcion: e.target.value });
                    }
                  }}
                  required
                />
              </div>
              <div className="form-group">
                <label>Precio</label>
                <input
                  type="number"
                  className="form-control"
                  name="precio"
                  value={editProducto ? editProducto.precio : newProducto.precio}
                  onChange={(e) => {
                    if (editProducto) {
                      setEditProducto({ ...editProducto, precio: e.target.value });
                    } else {
                      setNewProducto({ ...newProducto, precio: e.target.value });
                    }
                  }}
                  required
                />
              </div>
              <div className="form-group">
                <label>Cantidad</label>
                <input
                  type="number"
                  className="form-control"
                  name="cantidad"
                  value={editProducto ? editProducto.cantidad : newProducto.cantidad}
                  onChange={(e) => {
                    if (editProducto) {
                      setEditProducto({ ...editProducto, cantidad: e.target.value });
                    } else {
                      setNewProducto({ ...newProducto, cantidad: e.target.value });
                    }
                  }}
                  required
                />
              </div>
              <div className="form-group">
                <label>Stock Mínimo</label>
                <input
                  type="number"
                  className="form-control"
                  name="stock_minimo"
                  value={editProducto ? editProducto.stock_minimo : newProducto.stock_minimo}
                  onChange={(e) => {
                    if (editProducto) {
                      setEditProducto({ ...editProducto, stock_minimo: e.target.value });
                    } else {
                      setNewProducto({ ...newProducto, stock_minimo: e.target.value });
                    }
                  }}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                {editProducto ? 'Actualizar Producto' : 'Crear Producto'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
