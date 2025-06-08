// src/components/Productos.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Alert, Form, Modal } from "react-bootstrap";

const API_URL = "http://localhost:3005/api/productos";

function Productos() {
    const [productos, setProductos] = useState([]);
    const [message, setMessage] = useState(null);
    const [variant, setVariant] = useState("success");
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        stock: ""
    });

    useEffect(() => {
        fetchProductos();
    }, []);

    const fetchProductos = async () => {
        try {
            const res = await axios.get(API_URL);
            setProductos(res.data);
        } catch (err) {
            console.error(err);
            setMessage("Error al obtener productos");
            setVariant("danger");
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            await axios.post(API_URL, formData);
            setMessage("Producto agregado correctamente");
            setVariant("success");
            setShowModal(false);
            fetchProductos();
        } catch (err) {
            console.error(err);
            setMessage("Error al agregar producto");
            setVariant("danger");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Deseas eliminar este producto?")) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                setMessage("Producto eliminado correctamente");
                setVariant("success");
                fetchProductos();
            } catch (err) {
                console.error(err);
                setMessage("Error al eliminar producto");
                setVariant("danger");
            }
        }
    };

    return (
        <div className="container mt-4">
            <h2>Inventario de Productos</h2>
            {message && <Alert variant={variant}>{message}</Alert>}

            <Button className="mb-3" onClick={() => setShowModal(true)}>
                Agregar Producto
            </Button>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((prod) => (
                        <tr key={prod.id_producto}>
                            <td>{prod.nombre}</td>
                            <td>{prod.descripcion}</td>
                            <td>{prod.precio}</td>
                            <td>{prod.stock}</td>
                            <td>
                                {/* Puedes implementar edición aquí también */}
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDelete(prod.id_producto)}
                                >
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal para crear producto */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                name="descripcion"
                                value={formData.descripcion}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                                type="number"
                                name="precio"
                                value={formData.precio}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Stock</Form.Label>
                            <Form.Control
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Productos;