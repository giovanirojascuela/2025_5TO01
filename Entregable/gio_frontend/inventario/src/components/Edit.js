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
            console.error("Erro ao carregar contato para edição:", error);
            setMessage("Erro ao carregar os dados do contato. Verifique o console.");
            setMessageVariant("danger");
        }
    }, [id, API_URL]); 

    useEffect(() => {
        if (id) {
            fetchContact();
        } else {
            setMessage("ID do contato não fornecido para edição.");
            setMessageVariant("danger");
        }
    }, [id, fetchContact]); 


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nombre.trim() || !profesion.trim()) {
            setMessage("Por favor, preencha todos os campos obrigatórios.");
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

            setMessage("Contato atualizado com sucesso!");
            setMessageVariant("success");
            console.log("Resposta do backend:", response.data);

            setTimeout(() => {
                history("/");
            }, 2000);

        } catch (error) {
            console.error("Erro ao atualizar contato:", error);
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
                <h2 className="text-center mb-4">Editar Contato</h2>

                {message && <Alert variant={messageVariant}>{message}</Alert>}

                <Form.Group className="mb-3" controlId="formBasicNombre">
                    <Form.Control
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        type="text"
                        placeholder="Digite o Nome"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicApellido">
                    <Form.Control
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        type="text"
                        placeholder="Digite o Sobrenome"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicProfesion">
                    <Form.Control
                        value={profesion}
                        onChange={(e) => setProfesion(e.target.value)}
                        type="text"
                        placeholder="Digite a Profissão"
                        required
                    />
                </Form.Group>

                <Button
                    onClick={handleSubmit}
                    variant="primary"
                    type="submit"
                    size="lg"
                >
                    Atualizar
                </Button>

                <Link className="d-grid gap-2 mt-3" to="/">
                    <Button variant="warning" size="lg">
                        Home
                    </Button>
                </Link>
            </Form>
        </div>
    );
}

export default Edit;