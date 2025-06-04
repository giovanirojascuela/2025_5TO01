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
            setMessage("Por favor, preencha todos os campos obrigatórios.");
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

            setMessage("Contato criado com sucesso!");
            setMessageVariant("success");
            console.log("Resposta do backend:", response.data);

            setTimeout(() => {
                history("/");
            }, 2000); 

        } catch (error) {
            console.error("Erro ao criar contato:", error);
            if (error.response) {
                setMessage(`Erro ${error.response.status}: ${error.response.data.message || 'Ocorreu um erro no servidor.'}`);
            } else if (error.request) {
                setMessage("Erro de rede: O servidor não respondeu. (API offline ou CORS)");
            } else {
                setMessage(`Erro desconhecido: ${error.message}`);
            }
            setMessageVariant("danger");
        }
    };

    return (
        <div>
            <Form className="d-grid gap-2" style={{ margin: "5rem" }}>
                <h2 className="text-center mb-4">Criar Novo Contato</h2>

                {message && <Alert variant={messageVariant}>{message}</Alert>}

                <Form.Group className="mb-3" controlId="formBasicNombre">
                    <Form.Control
                        onChange={(e) => setNombre(e.target.value)}
                        type="text"
                        placeholder="Digite o Nome"
                        required
                        value={nombre} 
                    />
                </Form.Group>

                {
                <Form.Group className="mb-3" controlId="formBasicApellido">
                    <Form.Control
                        onChange={(e) => setApellido(e.target.value)}
                        type="text"
                        placeholder="Digite o Sobrenome"
                        required
                        value={apellido}
                    />
                </Form.Group>
                }

                <Form.Group className="mb-3" controlId="formBasicProfesion">
                    <Form.Control
                        onChange={(e) => setProfesion(e.target.value)}
                        type="text" 
                        placeholder="Digite a Profissão"
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