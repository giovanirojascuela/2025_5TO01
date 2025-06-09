import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, Table, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function VentaCreate() {
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [venta, setVenta] = useState({
    cliente_id: "",
    productos: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const resClientes = await axios.get("http://localhost:3005/api/clientes");
      const resProductos = await axios.get("http://localhost:3005/api/productos");
      setClientes(resClientes.data);
      setProductos(resProductos.data);
    }

    fetchData();
  }, []);

  const handleProductoAdd = () => {
    setVenta({
      ...venta,
      productos: [...venta.productos, { producto_id: "", cantidad: 1 }],
    });
  };

  const handleProductoChange = (index, field, value) => {
    const nuevos = [...venta.productos];
    nuevos[index][field] = value;
    setVenta({ ...venta, productos: nuevos });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3005/api/ventas", venta);
      alert("Venta registrada correctamente");
      navigate("/");
    } catch (error) {
      console.error("Error al registrar la venta:", error);
      alert("Error al registrar la venta");
    }
  };

  const calcularTotal = () => {
    return venta.productos.reduce((total, item) => {
      const prod = productos.find(p => p.id == item.producto_id);
      return total + (prod ? prod.precio * item.cantidad : 0);
    }, 0);
  };

  return (
    <Container className="mt-5">
      <Card className="shadow">
        <Card.Body>
          <h3 className="text-center mb-4">Registrar Nueva Venta</h3>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Cliente</Form.Label>
              <Form.Select
                value={venta.cliente_id}
                onChange={(e) =>
                  setVenta({ ...venta, cliente_id: e.target.value })
                }
                required
              >
                <option value="">Seleccione un cliente</option>
                {clientes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nombre}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <hr />
            <h5>Productos</h5>

            <div className="d-flex justify-content-end mb-2">
              <Button onClick={handleProductoAdd} variant="outline-primary">
                + Agregar Producto
              </Button>
            </div>

            <Table striped bordered hover responsive>
              <thead className="table-light">
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {venta.productos.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <Form.Select
                        value={item.producto_id}
                        onChange={(e) =>
                          handleProductoChange(index, "producto_id", e.target.value)
                        }
                        required
                      >
                        <option value="">Seleccione</option>
                        {productos.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.nombre}
                          </option>
                        ))}
                      </Form.Select>
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        min="1"
                        value={item.cantidad}
                        onChange={(e) =>
                          handleProductoChange(index, "cantidad", parseInt(e.target.value))
                        }
                        required
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <h5 className="mt-3">Total: <strong>S/. {calcularTotal().toFixed(2)}</strong></h5>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <Button type="submit" variant="success">
                Guardar Venta
              </Button>
              <Button variant="secondary" onClick={() => navigate("/")}>
                Volver
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default VentaCreate;
