import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function Venta() {
  const [ventas, setVentas] = useState([]);

  useEffect(() => {
    async function fetchVentas() {
      try {
        const res = await axios.get("http://localhost:3005/api/ventas");
        setVentas(res.data);
      } catch (error) {
        console.error("Error al cargar ventas:", error);
      }
    }

    fetchVentas();
  }, []);

  return (
    <Container className="mt-5">
      <Card className="shadow">
        <Card.Body>
          <h3 className="text-center mb-4">Lista de Ventas</h3>

          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Fecha</th>
                <th>Total</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ventas.length > 0 ? (
                ventas.map((venta) => (
                  <tr key={venta.id}>
                    <td>{venta.id}</td>
                    <td>{venta.cliente_nombre || "N/A"}</td>
                    <td>{venta.fecha ? new Date(venta.fecha).toLocaleString() : "No disponible"}</td>
                    <td>S/. {venta.total != null ? venta.total.toFixed(2) : "0.00"}</td>
                    <td className="text-center">
                      <Link to={`/ventas/${venta.id}`}>
                        <Button variant="primary" size="sm">
                          Ver Detalle
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No hay ventas registradas.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Venta;
