// src/components/Ventas.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Table,
    Button,
    Alert,
    Form,
    Modal,
    Row,
    Col,
} from "react-bootstrap";

const API_VENTAS = "http://localhost:3005/api/ventas";
const API_CLIENTES = "http://localhost:3005/api/clientes";
const API_PRODUCTOS = "http://localhost:3005/api/productos";

function Ventas() {
    const [ventas, setVentas] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [productos, setProductos] = useState([]);
    const [message, setMessage] = useState(null);
    const [variant, setVariant] = useState("success");
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        id_cliente: "",
        productos: [],
        total: 0,
    });

    useEffect(() => {
        fetchVentas();
        fetchClientes();
        fetchProductos();
    }, []);

    const fetchVentas = async () => {
        try {
            const res = await axios.get(API_VENTAS);
            setVentas(res.data);
        } catch (err) {
            console.error(err);
            setMessage("Error al obtener ventas");
            setVariant("danger");
        }
    };

    const fetchClientes = async () => {
        try {
            const res = await axios.get(API_CLIENTES);
            setClientes(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchProductos = async () => {
        try {
            const res = await axios.get(API_PRODUCTOS);
            setProductos(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleProductoChange = (id_producto, field, value) => {
        const updated = [...formData.productos];
        const index = updated.findIndex(p => p.id_producto === id_producto);
        if (index === -1) {
            updated.push({
                id_producto,
                cantidad: field === "cantidad" ? parseInt(value) : 1,
                precio_unitario: productos.find(p => p.id_producto === id_producto)?.precio || 0,
            });
        } else {
            updated[index][field] = field === "cantidad" ? parseInt(value) : value;
        }
        const total = updated.reduce((acc, item) => acc + (item.cantidad * item.precio_unitario), 0);
        setFormData({ ...formData, productos: updated, total });
    };

    const handleSubmit = async () => {
        try {
            await axios.post(API_VENTAS, formData);
            setMessage("Venta registrada correctamente");
            setVariant("success");
            setShowModal(false);
            fetchVentas();
            setFormData({ id_cliente: "", productos: [], total: 0 });
        } catch (err) {
            console.error(err);
            setMessage("Error al registrar venta");
            setVariant("danger");
        }
    };

    return (
        <div className="container mt-4">
            <h2>Registro de Ventas</h2>
            {message && <Alert variant={variant}>{message}</Alert>}

            <Button className="mb-3" onClick={() => setShowModal(true)}>
                Registrar Venta
            </Button>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cliente</th>
                        <th>Fecha</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.map((venta) => (
                        <tr key={venta.id_venta}>
                            <td>{venta.id_venta}</td>
                            <td>{venta.nombre_cliente || venta.id_cliente}</td>
                            <td>{new Date(venta.fecha_venta).toLocaleString()}</td>
                            <td>S/ {venta.total}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Registrar Nueva Venta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Cliente</Form.Label>
                            <Form.Select
                                value={formData.id_cliente}
                                onChange={(e) =>
                                    setFormData({ ...formData, id_cliente: e.target.value })
                                }
                            >
                                <option value="">Seleccione un cliente</option>
                                {clientes.map((c) => (
                                    <option key={c.id_cliente} value={c.id_cliente}>
                                        {c.nombre}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <h5>Productos</h5>
                        {productos.map((p) => (
                            <Row key={p.id_producto} className="mb-2 align-items-center">
                                <Col md={4}>{p.nombre}</Col>
                                <Col md={4}>
                                    <Form.Control
                                        type="number"
                                        placeholder="Cantidad"
                                        min={1}
                                        onChange={(e) =>
                                            handleProductoChange(
                                                p.id_producto,
                                                "cantidad",
                                                e.target.value
                                            )
                                        }
                                    />
                                </Col>
                                <Col md={4}>S/ {p.precio}</Col>
                            </Row>
                        ))}

                        <hr />
                        <h5>Total: S/ {formData.total.toFixed(2)}</h5>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Registrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Ventas;