import React, { useState } from "react";
import { Form, Button, Row, Col, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RegistrarProducto() {
  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const guardarProducto = async (volver) => {
    try {
      await axios.post("http://localhost:3005/api/productos", producto);
      if (volver) {
        navigate("/productos");
      } else {
        setProducto({ nombre: "", descripcion: "", precio: "", stock: "" });
      }
    } catch (error) {
      console.error("Error al guardar producto:", error);
    }
  };

  return (
    <Container className="mt-5">
      <Card className="shadow">
        <Card.Body>
          <h3 className="text-center mb-4">Registrar Producto</h3>
          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="nombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={producto.nombre}
                    onChange={handleChange}
                    placeholder="Ingrese el nombre del producto"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="descripcion">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    type="text"
                    name="descripcion"
                    value={producto.descripcion}
                    onChange={handleChange}
                    placeholder="Ingrese una descripción"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={6}>
                <Form.Group controlId="precio">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                    type="number"
                    name="precio"
                    value={producto.precio}
                    onChange={handleChange}
                    placeholder="Ej. 12.50"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="stock">
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type="number"
                    name="stock"
                    value={producto.stock}
                    onChange={handleChange}
                    placeholder="Ej. 100"
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-center gap-3">
              <Button variant="success" onClick={() => guardarProducto(false)}>
                Guardar y Seguir
              </Button>
              <Button variant="primary" onClick={() => guardarProducto(true)}>
                Guardar y Volver
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default RegistrarProducto;
