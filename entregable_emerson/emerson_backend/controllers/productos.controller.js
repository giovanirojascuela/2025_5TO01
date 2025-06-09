const db = require('../config/database');

// Obtener todos los productos
exports.getProductos = (req, res) => {
  db.query('SELECT * FROM productos', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error al obtener los productos', error: err });
    }
    res.json(results);
  });
};

// Crear un nuevo producto
exports.createProducto = (req, res) => {
  const { nombre, descripcion, precio, cantidad, stock_minimo } = req.body;
  db.query(
    'INSERT INTO productos (nombre, descripcion, precio, cantidad, stock_minimo) VALUES (?, ?, ?, ?, ?)',
    [nombre, descripcion, precio, cantidad, stock_minimo],
    (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error al crear el producto', error: err });
      }
      res.status(201).json({ message: 'Producto creado exitosamente', id: result.insertId });
    }
  );
};

// Actualizar un producto
exports.updateProducto = (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, cantidad, stock_minimo } = req.body;

  db.query(
    'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, cantidad = ?, stock_minimo = ? WHERE id = ?',
    [nombre, descripcion, precio, cantidad, stock_minimo, id],
    (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error al actualizar el producto', error: err });
      }
      res.json({ message: 'Producto actualizado exitosamente' });
    }
  );
};

// Eliminar un producto
exports.deleteProducto = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM productos WHERE id = ?', [id], (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error al eliminar el producto', error: err });
    }
    res.json({ message: 'Producto eliminado exitosamente' });
  });
};
