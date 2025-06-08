import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Create() {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [profesion, setProfesion] = useState("");

    const [message, setMessage] = useState(null);
    const [messageVariant, setMessageVariant] = useState("success");

    const navigate = useNavigate();
    const API_URL = "http://localhost:3005/api/clientes";

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación
        if (!nombre.trim() || !apellido.trim() || !profesion.trim()) {
            setMessage("Por favor, complete todos los campos.");
            setMessageVariant("danger");
            return;
        }

        try {
            const nuevoCliente = {
                nombre,
                apellido,
                profesion,
            };

            const response = await axios.post(API_URL, nuevoCliente);

            setMessage("Cliente creado correctamente!");
            setMessageVariant("success");
            console.log("Respuesta del backend:", response.data);

            // Redireccionar después de 2 segundos
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (error) {
            console.error("Error al crear cliente:", error);

            if (error.response) {
                setMessage(`Error ${error.response.status}: ${error.response.data.message || "Ocurrió un error en el servidor."}`);
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
                <h2 className="text-center mb-4">Crear nuevo cliente</h2>

                {message && <Alert variant={messageVariant}>{message}</Alert>}

                <Form.Group className="mb-3" controlId="formNombre">
                    <Form.Control
                        type="text"
                        placeholder="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formApellido">
                    <Form.Control
                        type="text"
                        placeholder="Apellido"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formProfesion">
                    <Form.Control
                        type="text"
                        placeholder="Profesión"
                        value={profesion}
                        onChange={(e) => setProfesion(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Enviar
                </Button>

                <Link className="d-grid gap-2 mt-3" to="/">
                    <Button variant="info" size="lg">
                        Home
                    </Button>
                </Link>
            </Form>
        </div>
    );
}

export default Create;
