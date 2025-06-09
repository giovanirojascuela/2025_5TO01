import React, { useEffect, useState } from "react";
import { Table, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import HeaderWithButton from "./HeaderWithButton";
import "../App.css";

function VentaList() {
    const [ventas, setVentas] = useState([]);
    const [message, setMessage] = useState(null);
    const [messageVariant, setMessageVariant] = useState("success");

    const API_URL = "http://localhost:3005/api/ventas";

    const fetchVentas = async () => {
        try {
            const response = await axios.get(API_URL);
            setVentas(response.data);
            setMessage(null);
        } catch (error) {
            console.error("Error al cargar ventas:", error);
            setMessage("Error al cargar ventas.");
            setMessageVariant("danger");
        }
    };

    const eliminarVenta = async (id) => {
        if (window.confirm("¿Está seguro de eliminar esta venta?")) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                setMessage("Venta eliminada correctamente!");
                setMessageVariant("success");
                fetchVentas();
            } catch (error) {
                console.error("Error al eliminar venta:", error);
                setMessage("Error al eliminar venta.");
                setMessageVariant("danger");
            }
        }
    };

    useEffect(() => {
        fetchVentas();
    }, []);

    return (
        <div className="my-5">
            <HeaderWithButton
                title="Historial de Ventas"
                buttonText="Registrar Nueva Venta"
                buttonLink="/ventas/create"
            />

            {message && <Alert variant={messageVariant}>{message}</Alert>}

            <Table bordered responsive className="shadow-sm text-center">
                <thead className="table-light">
                    <tr>
                        <th>Cliente</th>
                        <th>Fecha</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.length > 0 ? (
                        ventas.map((venta) => (
                            <tr key={venta.id}>
                                <td>{venta.nombre_cliente || venta.cliente_nombre || "N/A"}</td>
                                <td>{new Date(venta.fecha).toLocaleDateString()}</td>
                                <td>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => eliminarVenta(venta.id)}
                                    >
                                        Eliminar
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center">
                                No hay ventas registradas.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
}

export default VentaList;
