import React, { useEffect, useState } from "react";
import { Button, Table, Alert, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
    const navigate = useNavigate();
    const [clientes, setClientes] = useState([]);
    const [message, setMessage] = useState(null);
    const [messageVariant, setMessageVariant] = useState("success");
    const [loading, setLoading] = useState(false);

    const API_URL = "http://localhost:3005/api/clientes";

    const fetchClientes = async () => {
        setLoading(true);
        try {
            const response = await axios.get(API_URL);
            setClientes(response.data);
            setMessage(null);
        } catch (error) {
            console.error("Error al cargar clientes:", error);
            setMessage("Error al cargar clientes. Verifique la consola para más detalles.");
            setMessageVariant("danger");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClientes();
    }, []);

    const eliminarCliente = async (id) => {
        if (window.confirm("¿Desea eliminar este cliente?")) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                setMessage("Cliente eliminado correctamente.");
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
        <div
            style={{
                minHeight: "100vh",
                backgroundImage: "url('/descarga.jg')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                padding: "2rem",
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
            }}
        >
            <div className="container bg-white p-4 rounded shadow-sm" style={{ opacity: 0.95 }}>
                <h1 className="text-center mb-4">Lista de Clientes</h1>

                {message && <Alert variant={messageVariant}>{message}</Alert>}

                {loading ? (
                    <div className="text-center">
                        <Spinner animation="border" role="status" />
                    </div>
                ) : (
                    <Table striped bordered hover responsive className="shadow-sm">
                        <thead className="table-dark">
                            <tr>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Teléfono</th>
                                <th>Dirección</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.length > 0 ? (
                                clientes.map((cliente) => (
                                    <tr key={cliente.id_cliente}>
                                        <td>{cliente.nombre}</td>
                                        <td>{cliente.correo || "-"}</td>
                                        <td>{cliente.telefono || "-"}</td>
                                        <td>{cliente.direccion || "-"}</td>
                                        <td>
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
                )}
            </div>
        </div>
    );
}

export default Home;
