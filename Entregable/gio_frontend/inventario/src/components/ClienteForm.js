// src/components/ClienteForm.js
import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";

const API_CLIENTES = "http://localhost:3005/api/clientes";

function ClienteForm() {
    const [formData, setFormData] = useState({
        nombre: "",
        correo: "",
        telefono: "",
        direccion: ""
    });

    const [message, setMessage] = useState(null);
    const [variant, setVariant] = useState("success");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.nombre.trim()) {
            setMessage("El nombre es obligatorio.");
            setVariant("danger");
            return;
        }

        try {
            await axios.post(API_CLIENTES, formData);
            setMessage("Cliente registrado correctamente.");
            setVariant("success");
            setFormData({
                nombre: "",
                correo: "",
                telefono: "",
                direccion: ""
            });
        } catch (err) {
            console.error(err);
            setMessage("Error al registrar cliente.");
            setVariant("danger");
        }
    };

    return (
        <div className="container mt-4">
            <h2>Registrar Nuevo Cliente</h2>
            {message && <Alert variant={variant}>{message}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Nombre *</Form.Label>
                    <Form.Control
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Correo</Form.Label>
                    <Form.Control
                        type="email"
                        name="correo"
                        value={formData.correo}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control
                        type="text"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button type="submit" variant="primary">
                    Guardar Cliente
                </Button>
            </Form>
        </div>
    );
}

export default ClienteForm;
