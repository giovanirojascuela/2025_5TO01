import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Table, Button } from "react-bootstrap";

function VentaDetalle() {
  const { id } = useParams();
  const [venta, setVenta] = useState(null);

  useEffect(() => {
    async function fetchVenta() {
      try {
        const res = await axios.get(`http://localhost:3005/api/ventas/${id}`);
        setVenta(res.data);
      } catch (error) {
        console.error("Error al cargar la venta:", error);
      }
    }

    fetchVenta();
  }, [id]);

  if (!venta) return <p>Cargando...</p>;

  return (
    <div className="container mt-4">
      <h2>Detalle de Venta #{venta.id}</h2>
      <p><strong>Cliente:</strong> {venta.cliente_nombre}</p>
      <p><strong>Fecha:</strong> {new Date(venta.fecha).toLocaleString()}</p>

      <Table striped bordered>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {venta.detalles.map((item, i) => (
            <tr key={i}>
              <td>{item.nombre_producto}</td>
              <td>{item.cantidad}</td>
              <td>S/. {item.precio_unitario.toFixed(2)}</td>
              <td>S/. {(item.cantidad * item.precio_unitario).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      
      <Link to="/">
        <Button variant="secondary">Volver al Inicio</Button>
      </Link>
    </div>
  );
}

export default VentaDetalle;
