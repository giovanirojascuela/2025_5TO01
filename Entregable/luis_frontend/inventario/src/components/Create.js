import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Create() {
    const [form, setForm] = useState({
        nombre: "",
        direccion: "",
        telefono: "",
        correo: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await fetch("http://localhost:3005/api/clientes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            navigate("/");
        } catch (error) {
            console.error("Error al guardar cliente:", error);
        }
    };

    return (
        <Container className="mt-5 d-flex justify-content-center">
            <Card className="p-4 shadow" style={{ maxWidth: "600px", width: "100%" }}>
                <h3 className="text-center mb-4">Registrar Cliente</h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="nombre">
                        <Form.Control
                            type="text"
                            placeholder="Nombre"
                            name="nombre"
                            value={form.nombre}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="direccion">
                        <Form.Control
                            type="text"
                            placeholder="Dirección"
                            name="direccion"
                            value={form.direccion}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="telefono">
                        <Form.Control
                            type="text"
                            placeholder="Teléfono"
                            name="telefono"
                            value={form.telefono}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="correo">
                        <Form.Control
                            type="email"
                            placeholder="Correo electrónico"
                            name="correo"
                            value={form.correo}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <div className="d-grid mb-2">
                        <Button variant="primary" type="submit">
                            Guardar Cliente
                        </Button>
                    </div>
                    <div className="d-grid">
                        <Button variant="secondary" onClick={() => navigate("/")}>
                            Volver al Inicio
                        </Button>
                    </div>
                </Form>
            </Card>
        </Container>
    );
}

export default Create;
