import React, { useState, useEffect } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Edit() {
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");

    const [message, setMessage] = useState(null);
    const [messageVariant, setMessageVariant] = useState("success");

    const navigate = useNavigate();
    const { id } = useParams();  // Obtener el id del cliente desde la URL

    const API_URL = `http://localhost:3005/api/clientes/${id}`;

    // Obtener los datos actuales del cliente al cargar la página
    useEffect(() => {
        axios.get(API_URL)
            .then(response => {
                const cliente = response.data;
                setNombre(cliente.nombre);
                setCorreo(cliente.correo);
                setTelefono(cliente.telefono);
                setDireccion(cliente.direccion);
            })
            .catch(error => {
                console.error("Error al obtener el cliente:", error);
                setMessage("No se pudo obtener los datos del cliente.");
                setMessageVariant("danger");
            });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación para asegurarse de que todos los campos sean completados
        if (!nombre.trim() || !correo.trim() || !telefono.trim() || !direccion.trim()) {
            setMessage("Por favor, complete todos los campos.");
            setMessageVariant("danger");
            return;
        }

        // Mostrar los datos antes de enviarlos
        console.log("Datos a enviar:", { nombre, correo, telefono, direccion });

        try {
            const clienteActualizado = {
                nombre,
                correo,
                telefono,
                direccion,
            };

            // Enviar los datos al backend para actualizar el cliente
            const response = await axios.put(API_URL, clienteActualizado);

            // Mostrar el mensaje de éxito
            setMessage("Cliente actualizado correctamente!");
            setMessageVariant("success");
            console.log("Respuesta del backend:", response.data);

            // Redirigir después de 2 segundos
            setTimeout(() => {
                navigate("/"); // Redirige a la página principal
            }, 2000);
        } catch (error) {
            console.error("Error al actualizar cliente:", error);

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
                <h2 className="text-center mb-4">Editar Cliente</h2>

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

export default Edit;
