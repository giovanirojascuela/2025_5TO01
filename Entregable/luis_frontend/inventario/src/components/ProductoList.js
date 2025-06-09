import React, { useEffect, useState } from "react";
import { Button, Table, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import HeaderWithButton from "./HeaderWithButton";
import "../App.css";

function ProductoList() {
    const [productos, setProductos] = useState([]);
    const [message, setMessage] = useState(null);
    const [messageVariant, setMessageVariant] = useState("success");

    const API_URL = "http://localhost:3005/api/productos";

    const fetchProductos = async () => {
        try {
            const response = await axios.get(API_URL);
            setProductos(response.data);
            setMessage(null);
        } catch (error) {
            console.error("Error al cargar productos:", error);
            setMessage("Error al cargar productos.");
            setMessageVariant("danger");
        }
    };

    useEffect(() => {
        fetchProductos();
    }, []);

    const eliminarProducto = async (id) => {
        if (window.confirm("¿Está seguro de eliminar este producto?")) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                setMessage("Producto eliminado correctamente!");
                setMessageVariant("success");
                fetchProductos();
            } catch (error) {
                console.error("Error al eliminar producto:", error);
                setMessage("Error al eliminar producto.");
                setMessageVariant("danger");
            }
        }
    };

    return (
        <div className="my-5">
            <HeaderWithButton
                title="Inventario de Productos"
                buttonText="Agregar Nuevo Producto"
                buttonLink="/productos/create"
            />

            {message && <Alert variant={messageVariant}>{message}</Alert>}

            <Table bordered responsive className="shadow-sm text-center">
                <thead className="table-light">
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.length > 0 ? (
                        productos.map((producto) => (
                            <tr key={producto.id}>
                                <td>{producto.nombre}</td>
                                <td>S/. {producto.precio.toFixed(2)}</td>
                                <td>{producto.stock}</td>
                                <td>
                                    <div className="d-flex justify-content-center gap-2">
                                        <Link to={`/productos/edit/${producto.id}`}>
                                        
                                        </Link>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => eliminarProducto(producto.id)}
                                        >
                                            Eliminar
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">
                                No hay productos registrados.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
}

export default ProductoList;
