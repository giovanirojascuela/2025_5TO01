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

    let history = useNavigate();

    const API_URL = "http://localhost:3005/api/contactos"; 

    const handleSubmit = async (e) => { 
        e.preventDefault(); 
 
        if (!nombre.trim() || !profesion.trim()) { 
            setMessage("Por favor, ingrese todos lo campos obligatorios.");
            setMessageVariant("danger");
            return;
        }
        try {
          
            const newContactData = {
                nombre: nombre,
                apellido: apellido, 
                profesion: profesion 
            };

            const response = await axios.post(API_URL, newContactData);

            setMessage("Contacto creado correctamente!");
            setMessageVariant("success");
            console.log("Respuesta del backend:", response.data);

            setTimeout(() => {
                history("/");
            }, 2000); 

        } catch (error) {
            console.error("Error al crear contacto:", error);
            if (error.response) {
                setMessage(`Error ${error.response.status}: ${error.response.data.message || 'Ocurrio un error en el servidor.'}`);
            } else if (error.request) {
                setMessage("Error de red: El servidor no responde. (API offline en el CORS)");
            } else {
                setMessage(`Error desconocido: ${error.message}`);
            }
            setMessageVariant("danger");
        }
    };

    return (
        <div>
            <Form className="d-grid gap-2" style={{ margin: "5rem" }}>
                <h2 className="text-center mb-4">Crear nuevo contacto</h2>

                {message && <Alert variant={messageVariant}>{message}</Alert>}

                <Form.Group className="mb-3" controlId="formBasicNombre">
                    <Form.Control
                        onChange={(e) => setNombre(e.target.value)}
                        type="text"
                        placeholder="Escriba el nombre"
                        required
                        value={nombre} 
                    />
                </Form.Group>

                {
                <Form.Group className="mb-3" controlId="formBasicApellido">
                    <Form.Control
                        onChange={(e) => setApellido(e.target.value)}
                        type="text"
                        placeholder="Escriba el apellido"
                        required
                        value={apellido}
                    />
                </Form.Group>
                }

                <Form.Group className="mb-3" controlId="formBasicProfesion">
                    <Form.Control
                        onChange={(e) => setProfesion(e.target.value)}
                        type="text" 
                        placeholder="Escriba la profesion"
                        required
                        value={profesion} 
                    />
                </Form.Group>

                <Button
                    onClick={handleSubmit} 
                    variant="primary"
                    type="submit"
                >
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