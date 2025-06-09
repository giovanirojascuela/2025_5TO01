import React, { useEffect, useState, useCallback } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function Edit() {
    const [nombre, setNombre] = useState("");
    const [direccion, setDireccion] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState(null);
    const [messageVariant, setMessageVariant] = useState("success");

    const history = useNavigate();
    const { id } = useParams();

    const API_URL = "http://localhost:3005/api/clientes";

    const fetchCliente = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            const data = response.data;
            setNombre(data.nombre || "");
            setDireccion(data.direccion || "");
            setTelefono(data.telefono || "");
            setEmail(data.email || "");
            setMessage(null);
        } catch (error) {
            console.error("Error al cargar cliente para edición:", error);
            setMessage("Error al cargar cliente para edición. Verifique en la consola.");
            setMessageVariant("danger");
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            fetchCliente();
        } else {
            setMessage("ID del cliente no encontrado.");
            setMessageVariant("danger");
        }
    }, [id, fetchCliente]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nombre.trim() || !direccion.trim() || !telefono.trim() || !email.trim()) {
            setMessage("Por favor, complete todos los campos.");
            setMessageVariant("danger");
            return;
        }

        try {
            const updatedCliente = {
                nombre,
                direccion,
                telefono,
                email,
            };

            const response = await axios.put(`${API_URL}/${id}`, updatedCliente);

            setMessage("Cliente actualizado correctamente!");
            setMessageVariant("success");
            console.log("Respuesta del backend:", response.data);

            setTimeout(() => {
                history("/");
            }, 2000);

        } catch (error) {
            console.error("Error al actualizar cliente:", error);
            if (error.response) {
                setMessage(`Error ${error.response.status}: ${error.response.data.message || 'Ocurrió un error en el servidor.'}`);
            } else if (error.request) {
                setMessage("Error de red: el servidor no responde.");
            } else {
                setMessage(`Error desconocido: ${error.message}`);
            }
            setMessageVariant("danger");
        }
    };

    return (
        <div>
            <Form className="d-grid gap-2" style={{ margin: "5rem" }}>
                <h2 className="text-center mb-4">Editar Cliente</h2>

                {message && <Alert variant={messageVariant}>{message}</Alert>}

                <Form.Group className="mb-3" controlId="formNombre">
                    <Form.Control
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        type="text"
                        placeholder="Nombre"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDireccion">
                    <Form.Control
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                        type="text"
                        placeholder="Dirección"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formTelefono">
                    <Form.Control
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        type="text"
                        placeholder="Teléfono"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Control
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Correo electrónico"
                        required
                    />
                </Form.Group>

                <Button
                    onClick={handleSubmit}
                    variant="primary"
                    type="submit"
                    size="lg"
                >
                    Actualizar
                </Button>

                <Link className="d-grid gap-2 mt-3" to="/">
                    <Button variant="warning" size="lg">
                        Volver a Inicio
                    </Button>
                </Link>
            </Form>
        </div>
    );
}

export default Edit;
