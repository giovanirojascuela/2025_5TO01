import React, { useEffect, useState } from "react";
import { Button, Table, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
    let history = useNavigate();
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState(null);
    const [messageVariant, setMessageVariant] = useState("success"); 

    const API_URL = "http://localhost:3005/api/contactos"; 
    const fetchUsers = async () => {
        try {
            const response = await axios.get(API_URL);
            setUsers(response.data);
            setMessage(null); 
        } catch (error) {
            console.error("Error al cargar contactos:", error);
            setMessage("Error al cargar contactos. Verifique en la consola los detalles.");
            setMessageVariant("danger");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []); 
    async function deleted(id) {
        if (window.confirm("Ud. desea eliminar el cliente?")) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                setMessage("Cliente eliminado correctamente!");
                setMessageVariant("success");
                fetchUsers();
            } catch (error) {
                console.error("Error al eliminar cliente:", error);
                setMessage("Error al eliminar usuario. Verifique en la console para detalles.");
                setMessageVariant("danger");
            }
        }
    }

    return (
        <div style={{ margin: "2rem" }}>
            <h1 className="text-center mb-4">Administracion de Clientes</h1>

            {message && <Alert variant={messageVariant}>{message}</Alert>}

            <Table striped bordered hover responsive className="shadow-sm">
                <thead className="thead-dark">
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th> 
                        <th>Producto</th>
                        <th>Cliente</th>
                    </tr>
                </thead>
                <tbody>
                   
                    {users.length > 0 ? (
                        users.map((item) => (
                            <tr key={item.id}> 
                                <td>{item.nombre}</td> 
                                <td>{item.apellido}</td> 
                                <td>{item.profesion}</td> 
                                <td>
                                    <Link to={`/edit/${item.id}`}> 
                                        <Button
                                            variant="info"
                                            className="me-2"
                                        >
                                            Actualizar
                                        </Button>
                                    </Link>
                                    <Button
                                        onClick={() => deleted(item.id)}
                                        variant="danger"
                                    >
                                        Elimnar
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center">
                                No hay contactos encontrados.
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