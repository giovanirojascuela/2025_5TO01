import React, { useEffect, useState } from "react";
import { Button, Table, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
    const navigate = useNavigate();
    const [clientes, setClientes] = useState([]);
    const [message, setMessage] = useState(null);
    const [messageVariant, setMessageVariant] = useState("success");

    const API_URL = "http://localhost:3005/api/clientes";

    const fetchClientes = async () => {
        try {
            const response = await axios.get(API_URL);
            setClientes(response.data);
            setMessage(null);
        } catch (error) {
            console.error("Error al cargar clientes:", error);
            setMessage("Error al cargar clientes. Verifique la consola para más detalles.");
            setMessageVariant("danger");
        }
    };

    useEffect(() => {
        fetchClientes();
    }, []);

    const eliminarCliente = async (id) => {
        if (window.confirm("¿Desea eliminar este cliente?")) {
            try {
                // CORRECCIÓN: Uso de backticks para interpolar el URL correctamente
                await axios.delete(`${API_URL}/${id}`);
                setMessage("Cliente eliminado correctamente!");
                setMessageVariant("success");
                fetchClientes();
            } catch (error) {
                console.error("Error al eliminar cliente:", error);
                setMessage("Error al eliminar cliente. Revise la consola para más información.");
                setMessageVariant("danger");
            }
        }
    };

    return (
        <div style={{ margin: "2rem" }}>
            <h1 className="text-center mb-4">Lista de Clientes</h1>

            {message && <Alert variant={messageVariant}>{message}</Alert>}

            <Table striped bordered hover responsive className="shadow-sm">
                <thead className="thead-dark">
                    <tr>
                        <th>Nombre</th>
                        <th>Correo</th> {/* Nueva columna */}
                        <th>Teléfono</th> {/* Nueva columna */}
                        <th>Dirección</th> {/* Nueva columna */}
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.length > 0 ? (
                        clientes.map((cliente) => (
                            <tr key={cliente.id_cliente}>
                                <td>{cliente.nombre}</td>
                                <td>{cliente.correo}</td> {/* Mostrar correo */}
                                <td>{cliente.telefono}</td> {/* Mostrar teléfono */}
                                <td>{cliente.direccion}</td> {/* Mostrar dirección */}
                                <td>
                                    {/* CORRECCIÓN: Uso de backticks para interpolar correctamente la URL */}
                                    <Link to={`/edit/${cliente.id_cliente}`}>
                                        <Button variant="info" className="me-2">
                                            Editar
                                        </Button>
                                    </Link>
                                    <Button
                                        onClick={() => eliminarCliente(cliente.id_cliente)}
                                        variant="danger"
                                    >
                                        Eliminar
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">
                                No hay clientes registrados.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

            <div className="d-grid gap-2 mt-4">
                <Link to="/create">
                    <Button variant="success" size="lg">
                        Crear Nuevo Cliente
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default Home;
