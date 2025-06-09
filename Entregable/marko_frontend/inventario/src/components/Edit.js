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

    let history = useNavigate();
    const { id } = useParams();

    const API_URL = "http://localhost:3005/api/contactos";

    const fetchContact = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            setNombre(response.data.nombre);
            setApellido(response.data.apellido || '');
            setProfesion(response.data.profesion);
            setMessage(null);
        } catch (error) {
            console.error("Error al cargar contacto para edicion:", error);
            setMessage("Error al cargar contacto para edicion. Verifique en la consola.");
            setMessageVariant("danger");
        }
    }, [id, API_URL]); 

    useEffect(() => {
        if (id) {
            fetchContact();
        } else {
            setMessage("ID de contacto no encotrado.");
            setMessageVariant("danger");
        }
    }, [id, fetchContact]); 


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nombre.trim() || !profesion.trim()) {
            setMessage("Por favor, ingrese todos los campos.");
            setMessageVariant("danger");
            return;
        }

        try {
            const updatedContactData = {
                nombre: nombre,
                apellido: apellido,
                profesion: profesion
            };

            const response = await axios.put(`${API_URL}/${id}`, updatedContactData);

            setMessage("Contacto actualiado correctamente!");
            setMessageVariant("success");
            console.log("Respuesta de backend:", response.data);

            setTimeout(() => {
                history("/");
            }, 2000);

        } catch (error) {
            console.error("Error al actualizar contacto:", error);
            if (error.response) {
                setMessage(`Erro ${error.response.status}: ${error.response.data.message || 'Ocurrio un error en el servidor.'}`);
            } else if (error.request) {
                setMessage("Error de red: el servidor no responde. (API offline en el CORS)");
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

                <Form.Group className="mb-3" controlId="formBasicNombre">
                    <Form.Control
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        type="text"
                        placeholder="Escriba su nombre"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicApellido">
                    <Form.Control
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        type="text"
                        placeholder="Escriba su apellido"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicProfesion">
                    <Form.Control
                        value={profesion}
                        onChange={(e) => setProfesion(e.target.value)}
                        type="text"
                        placeholder="Escriba su producto"
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
                        Inicio
                    </Button>
                </Link>
            </Form>
        </div>
    );
}

export default Edit;