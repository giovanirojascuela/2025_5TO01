// Filename - Edit.js

import React, { useEffect, useState, useCallback } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function Edit() {
    // Estados para almacenar los datos del producto
    const [nombre_producto, setNombreProducto] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio_venta, setPrecioVenta] = useState("");
    const [stock, setStock] = useState("");
    const [marca, setMarca] = useState("");
    const [codigo_barras, setCodigoBarras] = useState(""); // Campo adicional

    // Estados para mostrar mensajes al usuario
    const [message, setMessage] = useState(null);
    const [messageVariant, setMessageVariant] = useState("success");

    const history = useNavigate(); // Hook para redirigir
    const { id } = useParams();    // Obtener el parámetro `id` desde la URL

    const API_URL = "http://localhost:3005/api/productos"; // URL de la API

    // Función para obtener los datos del producto con el ID proporcionado
    const fetchProduct = useCallback(async () => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            // Asignar los datos al estado
            setNombreProducto(response.data.nombre_producto);
            setDescripcion(response.data.descripcion || ''); // Si es null, usar ''
            setPrecioVenta(response.data.precio_venta);
            setStock(response.data.stock);
            setMarca(response.data.marca || '');
            setCodigoBarras(response.data.codigo_barras || '');
            setMessage(null); // Limpiar mensaje anterior
        } catch (error) {
            console.error("Error al cargar producto para edición:", error);
            setMessage("Error al cargar los datos del producto. Verifica la consola.");
            setMessageVariant("danger");
        }
    }, [id, API_URL]);

    // Ejecutar fetchProduct cuando el componente se monte o cambie el ID
    useEffect(() => {
        if (id) {
            fetchProduct();
        } else {
            setMessage("ID del producto no proporcionado para edición.");
            setMessageVariant("danger");
        }
    }, [id, fetchProduct]);

    // Función que se ejecuta al enviar el formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Evitar recarga de página

        // Validación básica: campos obligatorios
        if (!nombre_producto.trim() || !precio_venta || !stock) {
            setMessage("Por favor, rellena todos los campos obligatorios: Nombre, Precio y Stock.");
            setMessageVariant("danger");
            return;
        }

        try {
            // Crear objeto con los datos a enviar
            const updatedProductData = {
                nombre_producto: nombre_producto,
                descripcion: descripcion,
                precio_venta: parseFloat(precio_venta),  // Convertir a número decimal
                stock: parseInt(stock, 10),               // Convertir a número entero
                marca: marca,
                codigo_barras: codigo_barras || null      // Si está vacío, enviar null
            };

            // Enviar solicitud PUT a la API
            const response = await axios.put(`${API_URL}/${id}`, updatedProductData);

            setMessage("Producto actualizado con éxito!");
            setMessageVariant("success");
            console.log("Respuesta del backend:", response.data);

            // Redirigir a la página principal después de 2 segundos
            setTimeout(() => {
                history("/");
            }, 2000);

        } catch (error) {
            console.error("Error al actualizar producto:", error);
            if (error.response) {
                setMessage(`Error ${error.response.status}: ${error.response.data.message || 'Ocurrió un error en el servidor.'}`);
            } else if (error.request) {
                setMessage("Error de red: El servidor no respondió. (API offline o problema de CORS)");
            } else {
                setMessage(`Error desconocido: ${error.message}`);
            }
            setMessageVariant("danger");
        }
    };

    return (
        <div>
            <Form className="d-grid gap-2" style={{ margin: "5rem" }}>
                <h2 className="text-center mb-4">Editar Producto</h2>

                {/* Mensaje de éxito o error */}
                {message && <Alert variant={messageVariant}>{message}</Alert>}

                {/* Campo: Nombre del Producto */}
                <Form.Group className="mb-3" controlId="formBasicNombreProducto">
                    <Form.Label>Nombre del Producto</Form.Label>
                    <Form.Control
                        value={nombre_producto}
                        onChange={(e) => setNombreProducto(e.target.value)}
                        type="text"
                        placeholder="Introduce el Nombre del Producto"
                        required
                    />
                </Form.Group>

                {/* Campo: Descripción */}
                <Form.Group className="mb-3" controlId="formBasicDescripcion">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        as="textarea"
                        rows={3}
                        placeholder="Introduce la Descripción del Producto"
                    />
                </Form.Group>

                {/* Campo: Precio Venta */}
                <Form.Group className="mb-3" controlId="formBasicPrecioVenta">
                    <Form.Label>Precio Venta</Form.Label>
                    <Form.Control
                        value={precio_venta}
                        onChange={(e) => setPrecioVenta(e.target.value)}
                        type="number"
                        step="0.01"
                        placeholder="Introduce el Precio de Venta"
                        required
                    />
                </Form.Group>

                {/* Campo: Stock */}
                <Form.Group className="mb-3" controlId="formBasicStock">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        type="number"
                        placeholder="Introduce el Stock"
                        required
                    />
                </Form.Group>

                {/* Campo: Marca */}
                <Form.Group className="mb-3" controlId="formBasicMarca">
                    <Form.Label>Marca</Form.Label>
                    <Form.Control
                        value={marca}
                        onChange={(e) => setMarca(e.target.value)}
                        type="text"
                        placeholder="Introduce la Marca"
                    />
                </Form.Group>

                {/* Campo: Código de Barras */}
                <Form.Group className="mb-3" controlId="formBasicCodigoBarras">
                    <Form.Label>Código de Barras</Form.Label>
                    <Form.Control
                        value={codigo_barras}
                        onChange={(e) => setCodigoBarras(e.target.value)}
                        type="text"
                        placeholder="Introduce el Código de Barras"
                    />
                </Form.Group>

                {/* Botón para enviar los datos actualizados */}
                <Button
                    onClick={handleSubmit}
                    variant="primary"
                    type="submit"
                    size="lg"
                >
                    Actualizar Producto
                </Button>

                {/* Botón para regresar al inicio */}
                <Link className="d-grid gap-2 mt-3" to="/">
                    <Button variant="warning" size="lg">
                        Volver a Inicio
                    </Button>
                </Link>
            </Form>
        </div>
    );
}

export default Edit;
