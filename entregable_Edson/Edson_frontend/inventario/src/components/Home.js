// Filename - components/Home.js
import React, { useEffect, useState } from "react";
import { Button, Table, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
    // Hook de React Router para redireccionamiento
    let history = useNavigate();

    // Estado para almacenar la lista de productos
    const [products, setProducts] = useState([]);

    // Estado para mostrar mensajes de éxito o error
    const [message, setMessage] = useState(null);
    const [messageVariant, setMessageVariant] = useState("success"); // Puede ser "success" o "danger"

    // Dirección base de la API que conecta con el backend (Express)
    const API_URL = "http://localhost:3005/api/productos";

    // Función asincrónica para obtener todos los productos desde el backend
    const fetchProducts = async () => {
        try {
            // Solicita todos los productos al backend
            const response = await axios.get(API_URL);
            // Guarda la respuesta en el estado
            setProducts(response.data);
            // Limpia mensajes anteriores
            setMessage(null);
        } catch (error) {
            // En caso de error, lo muestra en consola y en un mensaje visible
            console.error("Error al cargar productos:", error);
            setMessage("Error al cargar productos. Verifica la consola para detalles.");
            setMessageVariant("danger");
        }
    };

    // Hook que se ejecuta solo una vez cuando se monta el componente
    useEffect(() => {
        fetchProducts();
    }, []);

    // Función para eliminar un producto por su ID
    async function deleteProduct(id) {
        // Confirma si el usuario realmente quiere eliminar el producto
        if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
            try {
                // Realiza la solicitud DELETE al backend
                await axios.delete(`${API_URL}/${id}`);
                // Muestra mensaje de éxito y actualiza lista
                setMessage("Producto eliminado con éxito!");
                setMessageVariant("success");
                fetchProducts(); // Refresca la lista de productos
            } catch (error) {
                // Muestra mensaje de error si falla la eliminación
                console.error("Error al eliminar producto:", error);
                setMessage("Error al eliminar producto. Verifica la consola para detalles.");
                setMessageVariant("danger");
            }
        }
    }

    return (
        <div style={{ margin: "2rem" }}>
            <h1 className="text-center mb-4">Administración de Productos</h1>

            {/* Muestra una alerta si hay un mensaje */}
            {message && <Alert variant={messageVariant}>{message}</Alert>}

            {/* Tabla con listado de productos */}
            <Table striped bordered hover responsive className="shadow-sm">
                <thead className="thead-dark">
                    <tr>
                        <th>Nombre del Producto</th>
                        <th>Precio Venta</th>
                        <th>Stock</th>
                        <th>Marca</th>
                        <th>Código de Barras</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Muestra los productos si existen */}
                    {products.length > 0 ? (
                        products.map((product) => (
                            <tr key={product.id_producto}>
                                <td>{product.nombre_producto}</td>
                                <td>{product.precio_venta ? `$${product.precio_venta.toFixed(2)}` : 'N/A'}</td>
                                <td>{product.stock}</td>
                                <td>{product.marca}</td>
                                <td>{product.codigo_barras || 'N/A'}</td>
                                <td>
                                    {/* Botón para actualizar el producto */}
                                    <Link to={`/edit/${product.id_producto}`}>
                                        <Button variant="info" className="me-2">
                                            Actualizar
                                        </Button>
                                    </Link>
                                    {/* Botón para eliminar el producto */}
                                    <Button
                                        onClick={() => deleteProduct(product.id_producto)}
                                        variant="danger"
                                    >
                                        Eliminar
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        // Si no hay productos, muestra un mensaje en la tabla
                        <tr>
                            <td colSpan="6" className="text-center">
                                No hay productos registrados.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>

            {/* Botón para redirigir al formulario de creación de un nuevo producto */}
            <div className="d-grid gap-2 mt-4">
                <Link to="/create">
                    <Button variant="success" size="lg">
                        Crear Nuevo Producto
                    </Button>
                </Link>
            </div>
        </div>
    );
}
export default Home;
