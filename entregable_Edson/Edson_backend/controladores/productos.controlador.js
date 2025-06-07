import ProductoModel from "../models/productos.model.js"; // Asegúrate de que esta ruta sea correcta para tu modelo de productos

// --- CREAR PRODUCTO ---
export const crearProducto = (req, res) => {
    // Validación si el cuerpo de la requisición está vacío o incompleto
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send({ message: "El cuerpo de la requisición no puede ser vacío para crear un producto." });
    }

    // Crea una instancia del ProductoModel con los datos del cuerpo de la requisición
    // Las chaves del objeto deben corresponder a las propiedades de tu ProductoModel
    const producto = new ProductoModel({
        nombre_producto: req.body.nombre_producto,
        descripcion: req.body.descripcion || null, // Puede ser opcional
        precio_venta: req.body.precio_venta,
        stock: req.body.stock || 0, // Si no se provee, el stock por defecto es 0
        // Eliminado: fecha_vencimiento: req.body.fecha_vencimiento || null, // Eliminado por la nueva estructura de la tabla
        marca: req.body.marca || null, // Puede ser opcional
        codigo_barras: req.body.codigo_barras || null // Incluido para coincidir con la tabla, puede ser opcional
    });

    // Llama al método 'create' del modelo
    ProductoModel.create(producto, (err, data) => {
        if (err) {
            // Si hay un error, envía un status 500 con la mensaje de error
            return res.status(500).send({
                message: err.message || "Ocurrió algún error al crear el producto."
            });
        }
        // Si hay éxito, envía el nuevo producto con status 201 Created
        res.status(201).send(data);
    });
};

// --- OBTENER TODOS LOS PRODUCTOS ---
export const getProductos = (req, res) => {
    ProductoModel.getAll((err, data) => {
        if (err) {
            // Si hay un error, envía un status 500
            return res.status(500).send({
                message: err.message || "Ocurrió algún error al buscar los productos."
            });
        }
        // Si hay éxito, envía la lista de productos
        res.status(200).send(data);
    });
};

// --- OBTENER UN PRODUCTO POR ID ---
export const getProducto = (req, res) => {
    ProductoModel.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                // Si el producto no es encontrado, envía un status 404
                return res.status(404).send({
                    message: `No encontrado producto con id ${req.params.id}.`
                });
            }
            // Si hay otro tipo de error, envía un status 500
            return res.status(500).send({
                message: "Error al buscar producto con id " + req.params.id
            });
        }
        // Si hay éxito, envía el producto encontrado
        res.status(200).send(data);
    });
};

// --- MODIFICAR (ACTUALIZAR) PRODUCTO ---
export const modificarProducto = (req, res) => {
    // Validación si el cuerpo de la requisición está vacío
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).send({ message: "Datos para actualización del producto no pueden ser vacíos!" });
    }

    // Llama al método 'updateById' del modelo
    ProductoModel.updateById(
        req.params.id, // Pega el ID de la URL
        new ProductoModel({
            nombre_producto: req.body.nombre_producto,
            descripcion: req.body.descripcion || null,
            precio_venta: req.body.precio_venta,
            stock: req.body.stock || 0,
            // Eliminado: fecha_vencimiento: req.body.fecha_vencimiento || null, // Eliminado por la nueva estructura de la tabla
            marca: req.body.marca || null,
            codigo_barras: req.body.codigo_barras || null // Incluido para coincidir con la tabla, puede ser opcional
        }), // Crea una nueva instancia con los datos del cuerpo
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    // Si el producto no es encontrado, envía un status 404
                    return res.status(404).send({
                        message: `No encontrado producto con id ${req.params.id}.`
                    });
                }
                // Si hay otro tipo de error, envía un status 500
                return res.status(500).send({
                    message: "Error al actualizar producto con id " + req.params.id
                });
            }
            // Si hay éxito, envía el producto actualizado
            res.status(200).send(data);
        }
    );
};

// --- ELIMINAR (BORRAR) PRODUCTO ---
export const eliminarProducto = (req, res) => {
    ProductoModel.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                // Si el producto no es encontrado, envía un status 404
                return res.status(404).send({
                    message: `No encontrado producto con id ${req.params.id}.`
                });
            }
            // Si hay otro tipo de error, envía un status 500
            return res.status(500).send({
                message: "No fue posible eliminar el producto con id " + req.params.id
            });
        }
        // Si hay éxito, envía una mensaje de éxito
        res.status(200).send({ message: `Producto eliminado con éxito!` });
    });
};
