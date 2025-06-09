import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Ventas = () => {
  const [productos, setProductos] = useState([]);
  const [venta, setVenta] = useState({
    producto_id: '',
    cantidad: ''
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/productos', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((response) => {
        setProductos(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener los productos:', error);
      });
  }, []);

  const handleVenta = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/venta', venta, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      alert('Venta registrada correctamente');
      setVenta({
        producto_id: '',
        cantidad: ''
      });
    } catch (error) {
      console.error('Error al registrar la venta:', error);
      alert('No se pudo registrar la venta');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registrar Venta</h2>
      <form onSubmit={handleVenta}>
        <div className="form-group">
          <label>Producto</label>
          <select
            className="form-control"
            value={venta.producto_id}
            onChange={(e) => setVenta({ ...venta, producto_id: e.target.value })}
          >
            {productos.map((producto) => (
              <option key={producto.id} value={producto.id}>
                {producto.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Cantidad</label>
          <input
            type="number"
            className="form-control"
            value={venta.cantidad}
            onChange={(e) => setVenta({ ...venta, cantidad: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Realizar Venta
        </button>
      </form>
    </div>
  );
};

export default Ventas;
