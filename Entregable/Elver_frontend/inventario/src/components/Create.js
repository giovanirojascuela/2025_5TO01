import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Create() {
    // Estados solo para los campos que deseas mantener
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");

    const [message, setMessage] = useState(null);
    const [messageVariant, setMessageVariant] = useState("success");

    const navigate = useNavigate();
    const API_URL = "http://localhost:3005/api/clientes";

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación para asegurarse que todos los campos sean completados
        if (!nombre.trim() || !correo.trim() || !telefono.trim() || !direccion.trim()) {
            setMessage("Por favor, complete todos los campos.");
            setMessageVariant("danger");
            return;
        }

        // Mostrar los datos antes de enviarlos
        console.log("Datos a enviar:", { nombre, correo, telefono, direccion });  // Esto te mostrará los datos en la consola

        try {
            const nuevoCliente = {
                nombre,
                correo,
                telefono,
                direccion,
            };

            // Enviar los datos al backend
            const response = await axios.post(API_URL, nuevoCliente);

            // Mostrar el mensaje de éxito
            setMessage("Cliente creado correctamente!");
            setMessageVariant("success");
            console.log("Respuesta del backend:", response.data);  // Ver la respuesta del backend

            // Redirigir después de 2 segundos
            setTimeout(() => {
                navigate("/"); // Redirige a la página principal
            }, 2000);
        } catch (error) {
            console.error("Error al crear cliente:", error);

            // Manejo de errores
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

                {/* Campo de correo */}
                <Form.Group className="mb-3" controlId="formCorreo">
                    <Form.Control
                        type="email"
                        placeholder="Correo"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        required
                    />
                </Form.Group>

                {/* Campo de teléfono */}
                <Form.Group className="mb-3" controlId="formTelefono">
                    <Form.Control
                        type="text"
                        placeholder="Teléfono"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        required
                    />
                </Form.Group>

                {/* Campo de dirección */}
                <Form.Group className="mb-3" controlId="formDireccion">
                    <Form.Control
                        type="text"
                        placeholder="Dirección"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
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
