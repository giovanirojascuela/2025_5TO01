import React, { useEffect, useState, useCallback } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function Edit() {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [profesion, setProfesion] = useState("");
    const [message, setMessage] = useState(null);
    const [messageVariant, setMessageVariant] = useState("success");

    const navigate = useNavigate();
    const { id } = useParams();

    const API_URL = "http://localhost:3005/api/clientes";

    const fetchCliente = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            setNombre(response.data.nombre || "");
            setApellido(response.data.apellido || "");
            setProfesion(response.data.profesion || "");
            setMessage(null);
        } catch (error) {
            console.error("Error al cargar cliente para edición:", error);
            setMessage("Error al cargar cliente para edición. Verifique la consola.");
            setMessageVariant("danger");
        }
    }, [id]);

    useEffect(() => {
        if (id) {
            fetchCliente();
        } else {
            setMessage("ID de cliente no encontrado.");
            setMessageVariant("danger");
        }
    }, [id, fetchCliente]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nombre.trim() || !apellido.trim() || !profesion.trim()) {
            setMessage("Por favor, complete todos los campos.");
            setMessageVariant("danger");
            return;
        }

        try {
            const clienteActualizado = {
                nombre,
                apellido,
                profesion
            };

            const response = await axios.put(`${API_URL}/${id}`, clienteActualizado);

            setMessage("Cliente actualizado correctamente!");
            setMessageVariant("success");
            console.log("Respuesta del backend:", response.data);

            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (error) {
            console.error("Error al actualizar cliente:", error);
            if (error.response) {
                setMessage(`Error ${error.response.status}: ${error.response.data.message || 'Ocurrió un error en el servidor.'}`);
            } else if (error.request) {
                setMessage("Error de red: El servidor no responde.");
            } else {
                setMessage(`Error desconocido: ${error.message}`);
            }
            setMessageVariant("danger");
        }
    };

    return (
        <div>
            <Form className="d-grid gap-2" style={{ margin: "5rem" }} onSubmit={handleSubmit}>
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

                <Form.Group className="mb-3" controlId="formApellido">
                    <Form.Control
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        type="text"
                        placeholder="Apellido"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formProfesion">
                    <Form.Control
                        value={profesion}
                        onChange={(e) => setProfesion(e.target.value)}
                        type="text"
                        placeholder="Profesión"
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" size="lg">
                    Actualizar
                </Button>

                <Link className="d-grid gap-2 mt-3" to="/">
                    <Button variant="warning" size="lg">
                        Inicio
                    </Button>
                </Link>
            </Form>
        </div>
    );
}

export default Edit;
