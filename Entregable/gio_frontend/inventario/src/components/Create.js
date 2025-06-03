// Filename - components/Create.js
import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap"; // Importe Alert para mensagens
import "bootstrap/dist/css/bootstrap.min.css";
// import array from "./array"; // REMOVA esta linha
// import { v4 as uuid } from "uuid"; // REMOVA esta linha
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Importe axios

function Create() {
    // Definindo estados para os campos do formulário, ajustados para o seu ContactoModel
    // Assumindo que seu ContactoModel tem 'nombre', 'apellido', 'profesion'
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState(""); // Adicione este campo se for necessário
    const [profesion, setProfesion] = useState(""); // Ajustado de 'age' para 'profesion'
    
    // Estado para lidar com mensagens de erro ou sucesso
    const [message, setMessage] = useState(null);
    const [messageVariant, setMessageVariant] = useState("success");

    // Usando useNavigate para redirecionar
    let history = useNavigate();

    // URL base da sua API Express para criar um novo contato
    const API_URL = "http://localhost:3005/api/contactos"; // Verifique a porta e o endpoint

    // Função para lidar com o envio do formulário
    const handleSubmit = async (e) => { // Tornar a função assíncrona
        e.preventDefault(); // Previne o recarregamento da página

        // Validação básica dos campos
        // Adapte os campos conforme seu ContactoModel (ex: nombre, profesion)
        if (!nombre.trim() || !profesion.trim()) { // .trim() para verificar se não está vazio ou só com espaços
            setMessage("Por favor, preencha todos os campos obrigatórios.");
            setMessageVariant("danger");
            return;
        }
        try {
            // Crie o objeto de dados que será enviado ao backend
            // As chaves devem corresponder EXATAMENTE aos nomes esperados pelo seu backend (ContactoModel)
            const newContactData = {
                nombre: nombre,
                apellido: apellido, // Inclua se você adicionar o campo de input
                profesion: profesion // Use 'profesion' em vez de 'age'
            };

            // Faz uma requisição POST para a sua API
            const response = await axios.post(API_URL, newContactData);

            setMessage("Contato criado com sucesso!");
            setMessageVariant("success");
            console.log("Resposta do backend:", response.data);

            // Redireciona para a página inicial após 2 segundos (tempo para o usuário ver a mensagem)
            setTimeout(() => {
                history("/");
            }, 2000); 

        } catch (error) {
            console.error("Erro ao criar contato:", error);
            // Captura e exibe mensagens de erro mais detalhadas
            if (error.response) {
                // O servidor respondeu com um status de erro (4xx ou 5xx)
                setMessage(`Erro ${error.response.status}: ${error.response.data.message || 'Ocorreu um erro no servidor.'}`);
            } else if (error.request) {
                // A requisição foi feita, mas nenhuma resposta foi recebida (ex: CORS, rede, API offline)
                setMessage("Erro de rede: O servidor não respondeu. (API offline ou CORS)");
            } else {
                // Algo aconteceu ao configurar a requisição que disparou um erro
                setMessage(`Erro desconhecido: ${error.message}`);
            }
            setMessageVariant("danger");
        }
    };

    return (
        <div>
            <Form className="d-grid gap-2" style={{ margin: "5rem" }}>
                <h2 className="text-center mb-4">Criar Novo Contato</h2>

                {/* Exibe mensagens de erro/sucesso */}
                {message && <Alert variant={messageVariant}>{message}</Alert>}

                <Form.Group className="mb-3" controlId="formBasicNombre">
                    <Form.Control
                        onChange={(e) => setNombre(e.target.value)}
                        type="text"
                        placeholder="Digite o Nome"
                        required
                        value={nombre} // Controla o valor do input com o estado
                    />
                </Form.Group>

                {/* Se você precisar de 'apellido', adicione um campo similar a este: */}
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
                        type="text" // Ou "text" dependendo do que você espera para profissão
                        placeholder="Digite a Profissão"
                        required
                        value={profesion} // Controla o valor do input com o estado
                    />
                </Form.Group>

                {/* Botão de Submit */}
                <Button
                    onClick={handleSubmit} // Chama a função assíncrona
                    variant="primary"
                    type="submit"
                >
                    Enviar
                </Button>

                {/* Link para voltar à página inicial */}
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