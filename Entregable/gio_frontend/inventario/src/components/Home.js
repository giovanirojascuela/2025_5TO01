// Filename - components/Home.js
import React, { useEffect, useState } from "react";
import { Button, Table, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
    let history = useNavigate();
    // Estado para armazenar os usuários carregados da API
    const [users, setUsers] = useState([]);
    // Estado para lidar com mensagens de erro ou sucesso
    const [message, setMessage] = useState(null);
    const [messageVariant, setMessageVariant] = useState("success"); // 'success' ou 'danger'

    // URL base da sua API Express. Certifique-se de que está correto!
    const API_URL = "http://localhost:3005/api/contactos"; // Exemplo: ajuste a porta e o endpoint conforme seu backend

    // Função para carregar os usuários do backend
    const fetchUsers = async () => {
        try {
            const response = await axios.get(API_URL);
            // Assumindo que sua API retorna um array de usuários diretamente
            setUsers(response.data);
            setMessage(null); // Limpa mensagens anteriores de sucesso/erro
        } catch (error) {
            console.error("Erro ao carregar usuários:", error);
            setMessage("Erro ao carregar usuários. Verifique o console para detalhes.");
            setMessageVariant("danger");
        }
    };

    // useEffect para carregar os usuários quando o componente for montado
    useEffect(() => {
        fetchUsers();
    }, []); // O array vazio [] garante que isso execute apenas uma vez ao montar
    // Function to delete an entry
    async function deleted(id) {
        if (window.confirm("Você tem certeza que deseja deletar este usuário?")) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                setMessage("Usuário deletado com sucesso!");
                setMessageVariant("success");
                // Atualiza a lista de usuários após a exclusão
                fetchUsers();
            } catch (error) {
                console.error("Erro ao deletar usuário:", error);
                setMessage("Erro ao deletar usuário. Verifique o console para detalhes.");
                setMessageVariant("danger");
            }
        }
    }

    return (
        <div style={{ margin: "2rem" }}>
            <h1 className="text-center mb-4">Administracion de Contactos</h1>

            {message && <Alert variant={messageVariant}>{message}</Alert>}

            <Table striped bordered hover responsive className="shadow-sm">
                <thead className="thead-dark">
                    <tr>
                        {/* Adapte os cabeçalhos da tabela para o seu modelo de dados do backend */}
                        <th>Nombre</th>
                        <th>Apellido</th> {/* Exemplo: se ContactoModel tiver 'profesion' */}
                        <th>Profesion</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Renderiza os usuários do estado 'users' */}
                    {users.length > 0 ? (
                        users.map((item) => (
                            <tr key={item.id}> {/* Use item.id como key, assumindo que sua API retorna um 'id' */}
                                <td>{item.nombre}</td> {/* Adapte para o nome da propriedade no seu backend (e.g., 'nombre') */}
                                <td>{item.apellido}</td> {/* Adapte para o nome da propriedade no seu backend (e.g., 'nombre') */}
                                <td>{item.profesion}</td> {/* Adapte para o nome da propriedade no seu backend (e.g., 'profesion') */}
                                <td>
                                    <Link to={`/edit/${item.id}`}> {/* <<< CORREÇÃO AQUI: Passando o ID na URL */}
                                        <Button
                                            // onClick={() => setID(item.id, item.nombre, item.profesion)} // <<< REMOVA esta linha ou comente-a, pois não é mais usada para carregar dados no Edit.js
                                            variant="info"
                                            className="me-2"
                                        >
                                            Atualizar
                                        </Button>
                                    </Link>
                                    <Button
                                        onClick={() => deleted(item.id)}
                                        variant="danger"
                                    >
                                        Deletar
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center">
                                Não há usuários cadastrados.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <div className="d-grid gap-2 mt-4">
                <Link to="/create">
                    <Button variant="success" size="lg">
                        Crear Nuevo Usuario
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default Home;