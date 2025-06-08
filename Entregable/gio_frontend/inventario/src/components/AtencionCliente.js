// src/components/AtencionCliente.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    Table,
    Button,
    Alert,
    Form,
    Modal,
} from "react-bootstrap";

const API_ATENCION = "http://localhost:3005/api/atencion_cliente";
const API_CLIENTES = "http://localhost:3005/api/clientes";

function AtencionCliente() {
    const [atenciones, setAtenciones] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [message, setMessage] = useState(null);
    const [variant, setVariant] = useState("success");
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        id_cliente: "",
        motivo: "",
        respuesta: "",
        estado: "Pendiente",
    });

    useEffect(() => {
        fetchAtenciones();
        fetchClientes();
    }, []);

    const fetchAtenciones = async () => {
        try {
            const res = await axios.get(API_ATENCION);
            setAtenciones(res.data);
        } catch (err) {
            console.error(err);
            setMessage("Error al obtener atenciones");
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

    const handleSubmit = async () => {
        try {
            await axios.post(API_ATENCION, formData);
            setMessage("Atención registrada correctamente");
            setVariant("success");
            setShowModal(false);
            fetchAtenciones();
            setFormData({
                id_cliente: "",
                motivo: "",
                respuesta: "",
                estado: "Pendiente",
            });
        } catch (err) {
            console.error(err);
            setMessage("Error al registrar atención");
            setVariant("danger");
        }
    };

    return (
        <div className="container mt-4">
            <h2>Atención al Cliente</h2>
            {message && <Alert variant={variant}>{message}</Alert>}

            <Button className="mb-3" onClick={() => setShowModal(true)}>
                Registrar Atención
            </Button>

            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cliente</th>
                        <th>Fecha</th>
                        <th>Motivo</th>
                        <th>Respuesta</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {atenciones.map((a) => (
                        <tr key={a.id_atencion}>
                            <td>{a.id_atencion}</td>
                            <td>{a.nombre_cliente || a.id_cliente}</td>
                            <td>{new Date(a.fecha).toLocaleString()}</td>
                            <td>{a.motivo}</td>
                            <td>{a.respuesta}</td>
                            <td>{a.estado}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Registrar Nueva Atención</Modal.Title>
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

                        <Form.Group className="mb-3">
                            <Form.Label>Motivo</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={formData.motivo}
                                onChange={(e) =>
                                    setFormData({ ...formData, motivo: e.target.value })
                                }
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Respuesta</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={2}
                                value={formData.respuesta}
                                onChange={(e) =>
                                    setFormData({ ...formData, respuesta: e.target.value })
                                }
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Estado</Form.Label>
                            <Form.Select
                                value={formData.estado}
                                onChange={(e) =>
                                    setFormData({ ...formData, estado: e.target.value })
                                }
                            >
                                <option value="Pendiente">Pendiente</option>
                                <option value="Resuelto">Resuelto</option>
                                <option value="En Proceso">En Proceso</option>
                            </Form.Select>
                        </Form.Group>
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

export default AtencionCliente;
