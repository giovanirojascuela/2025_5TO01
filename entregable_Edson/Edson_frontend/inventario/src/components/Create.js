import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Create() {
    // 1. ESTADOS: Variables que guardan los valores del formulario y los mensajes
    const [nombre_producto, setNombreProducto] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio_venta, setPrecioVenta] = useState("");
    const [stock, setStock] = useState("");
    const [marca, setMarca] = useState("");
    const [codigo_barras, setCodigoBarras] = useState("");
    const [message, setMessage] = useState(null); // mensaje de error o éxito
    const [messageVariant, setMessageVariant] = useState("success"); // tipo de mensaje: success o danger

    // 2. NAVEGACIÓN: Permite redireccionar a otra página
    let history = useNavigate();

    // 3. URL DEL SERVIDOR BACKEND: Ruta donde se hará la solicitud POST
    const API_URL = "http://localhost:3005/api/productos";

    // 4. FUNCIÓN DE ENVÍO: Maneja el envío del formulario, validación y comunicación con el backend
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación de campos requeridos
        if (!nombre_producto.trim() || !precio_venta || !stock) {
            setMessage("Por favor, rellena todos los campos obligatorios: Nombre, Precio y Stock.");
            setMessageVariant("danger");
            return;
        }

        try {
            // Datos preparados para enviar al backend
            const newProductData = {
                nombre_producto: nombre_producto,
                descripcion: descripcion,
                precio_venta: parseFloat(precio_venta),
                stock: parseInt(stock, 10),
                marca: marca,
                codigo_barras: codigo_barras || null
            };

            // Envío de datos al backend
            const response = await axios.post(API_URL, newProductData);

            setMessage("Producto creado con éxito!");
            setMessageVariant("success");

            // Redirecciona al inicio después de mostrar el mensaje
            setTimeout(() => {
                history("/");
            }, 2000);

        } catch (error) {
            // Manejo de errores con distintos escenarios
            if (error.response) {
                setMessage(`Error ${error.response.status}: ${error.response.data.message || 'Ocurrió un error en el servidor.'}`);
            } else if (error.request) {
                setMessage("Error de red: El servidor no respondió. (API offline o CORS)");
            } else {
                setMessage(`Error desconocido: ${error.message}`);
            }
            setMessageVariant("danger");
        }
    };

    // 5. INTERFAZ DEL FORMULARIO: Formulario visual para crear productos
    return (
        <div>
            <Form className="d-grid gap-2" style={{ margin: "5rem" }}>
                <h2 className="text-center mb-4">Crear Nuevo Producto</h2>

                {message && <Alert variant={messageVariant}>{message}</Alert>}

                <Form.Group className="mb-3" controlId="formBasicNombreProducto">
                    <Form.Label>Nombre del Producto</Form.Label>
                    <Form.Control
                        onChange={(e) => setNombreProducto(e.target.value)}
                        type="text"
                        placeholder="Introduce el Nombre del Producto"
                        required
                        value={nombre_producto}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDescripcion">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control
                        onChange={(e) => setDescripcion(e.target.value)}
                        as="textarea"
                        rows={3}
                        placeholder="Introduce la Descripción del Producto"
                        value={descripcion}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPrecioVenta">
                    <Form.Label>Precio de Venta</Form.Label>
                    <Form.Control
                        onChange={(e) => setPrecioVenta(e.target.value)}
                        type="number"
                        step="0.01"
                        placeholder="Introduce el Precio de Venta"
                        required
                        value={precio_venta}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicStock">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control
                        onChange={(e) => setStock(e.target.value)}
                        type="number"
                        placeholder="Introduce el Stock"
                        required
                        value={stock}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicMarca">
                    <Form.Label>Marca</Form.Label>
                    <Form.Control
                        onChange={(e) => setMarca(e.target.value)}
                        type="text"
                        placeholder="Introduce la Marca"
                        value={marca}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCodigoBarras">
                    <Form.Label>Código de Barras</Form.Label>
                    <Form.Control
                        onChange={(e) => setCodigoBarras(e.target.value)}
                        type="text"
                        placeholder="Introduce el Código de Barras"
                        value={codigo_barras}
                    />
                </Form.Group>

                <Button
                    onClick={handleSubmit}
                    variant="primary"
                    type="submit"
                    size="lg"
                >
                    Crear Producto
                </Button>

                <Link className="d-grid gap-2 mt-3" to="/">
                    <Button variant="info" size="lg">
                        Inicio
                    </Button>
                </Link>
            </Form>
        </div>
    );
}
export default Create;
