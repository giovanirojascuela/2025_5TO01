import React, { useEffect, useState } from "react";
import { Button, Table, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderWithButton from "./HeaderWithButton";
import "../App.css";

function ClienteList() {
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
            setMessage("Error al cargar clientes.");
            setMessageVariant("danger");
        }
    };

    useEffect(() => {
        fetchClientes();
    }, []);

    const deleted = async (id) => {
        if (window.confirm("¿Está seguro de eliminar este cliente?")) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                setMessage("Cliente eliminado correctamente!");
                setMessageVariant("success");
                fetchClientes();
            } catch (error) {
                console.error("Error al eliminar cliente:", error);
                setMessage("Error al eliminar cliente.");
                setMessageVariant("danger");
            }
        }
    };

    return (
        <div className="my-5">
            <HeaderWithButton
                title="Administración de Clientes"
                buttonText="Crear Nuevo Cliente"
                buttonLink="/create"
            />

            {message && <Alert variant={messageVariant}>{message}</Alert>}

            <Table bordered responsive className="shadow-sm text-center">
                <thead className="table-light">
                    <tr>
                        <th>Nombre</th>
                        <th>Dirección</th>
                        <th>Teléfono</th>
                        <th>Email</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.length > 0 ? (
                        clientes.map((cliente) => (
                            <tr key={cliente.id}>
                                <td>{cliente.nombre}</td>
                                <td>{cliente.direccion}</td>
                                <td>{cliente.telefono}</td>
                                <td>{cliente.email}</td>
                                <td>
                                    <div className="d-flex justify-content-center gap-2">
                                        <Link to={`/edit/${cliente.id}`}>
                                            <Button variant="info" size="sm">
                                                Actualizar
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => deleted(cliente.id)}
                                        >
                                            Eliminar
                                        </Button>
                                    </div>
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
        </div>
    );
}

export default ClienteList;
