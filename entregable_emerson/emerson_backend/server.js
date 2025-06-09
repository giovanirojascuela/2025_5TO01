const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();

// Configuración body-parser y CORS
app.use(bodyParser.json());
app.use(cors());

// Conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Emersonvelez$3',  // Tu contraseña
  database: 'botica_velez',
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

// Rutas CRUD para Productos
// Obtener todos los productos
app.get('/api/productos', (req, res) => {
  db.query('SELECT * FROM productos', (err, results) => {
    if (err) return res.status(500).json({ message: 'Error al obtener los productos', error: err });
    res.json(results);
  });
});

// Crear un nuevo producto
app.post('/api/productos', (req, res) => {
  const { nombre, descripcion, precio, cantidad, stock_minimo } = req.body;
  db.query(
    'INSERT INTO productos (nombre, descripcion, precio, cantidad, stock_minimo) VALUES (?, ?, ?, ?, ?)',
    [nombre, descripcion, precio, cantidad, stock_minimo],
    (err, result) => {
      if (err) return res.status(500).json({ message: 'Error al crear el producto', error: err });
      res.status(201).json({ message: 'Producto creado exitosamente', id: result.insertId });
    }
  );
});

// Actualizar un producto
app.put('/api/productos/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, cantidad, stock_minimo } = req.body;
  db.query(
    'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, cantidad = ?, stock_minimo = ? WHERE id = ?',
    [nombre, descripcion, precio, cantidad, stock_minimo, id],
    (err) => {
      if (err) return res.status(500).json({ message: 'Error al actualizar el producto', error: err });
      res.json({ message: 'Producto actualizado exitosamente' });
    }
  );
});

// Eliminar un producto
app.delete('/api/productos/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM productos WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ message: 'Error al eliminar el producto', error: err });
    res.json({ message: 'Producto eliminado exitosamente' });
  });
});

// Ruta para registrar una venta
app.post('/api/venta', (req, res) => {
  const { producto_id, cantidad } = req.body;

  // Verificar si el producto existe y si hay suficiente stock
  db.query('SELECT * FROM productos WHERE id = ?', [producto_id], (err, result) => {
    if (err) return res.status(500).json({ message: 'Error al verificar el stock', error: err });

    const producto = result[0];  // Seleccionamos el primer producto de la respuesta
    if (producto.cantidad < cantidad) {
      return res.status(400).json({ message: 'No hay suficiente stock' });
    }

    // Calcular el total de la venta
    const total = producto.precio * cantidad;

    // Registrar la venta en la base de datos
    db.query('INSERT INTO ventas (producto_id, cantidad, total) VALUES (?, ?, ?)', [producto_id, cantidad, total], (err) => {
      if (err) return res.status(500).json({ message: 'Error al registrar la venta', error: err });

      // Actualizar la cantidad del producto en la base de datos
      db.query('UPDATE productos SET cantidad = cantidad - ? WHERE id = ?', [cantidad, producto_id], (err) => {
        if (err) return res.status(500).json({ message: 'Error al actualizar el stock', error: err });
        res.status(201).json({ message: 'Venta registrada exitosamente' });
      });
    });
  });
});

// Configurar el puerto para el servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});


// Ruta para obtener el historial de ventas
app.get('/api/ventas', (req, res) => {
  db.query('SELECT v.id, p.nombre AS producto, v.cantidad, v.total, v.created_at FROM ventas v JOIN productos p ON v.producto_id = p.id', (err, results) => {
    if (err) return res.status(500).json({ message: 'Error al obtener el historial de ventas', error: err });
    res.json(results);  // Devuelve todas las ventas como respuesta
  });
});
