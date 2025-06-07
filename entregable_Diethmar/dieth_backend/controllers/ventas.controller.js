const db = require('../config/database');

// Registrar una venta
exports.registrarVenta = (req, res) => {
  const { producto_id, cantidad } = req.body;

  db.query('SELECT * FROM productos WHERE id = ?', [producto_id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error al verificar el stock', error: err });
    }

    const producto = result[0];
    if (producto.cantidad < cantidad) {
      return res.status(400).json({ message: 'No hay suficiente stock' });
    }

    const total = producto.precio * cantidad;

    // Registrar la venta
    db.query('INSERT INTO ventas (producto_id, cantidad, total) VALUES (?, ?, ?)', [producto_id, cantidad, total], (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error al registrar la venta', error: err });
      }

      // Actualizar el stock del producto
      db.query('UPDATE productos SET cantidad = cantidad - ? WHERE id = ?', [cantidad, producto_id], (err) => {
        if (err) {
          return res.status(500).json({ message: 'Error al actualizar el stock', error: err });
        }
        res.status(201).json({ message: 'Venta registrada exitosamente' });
      });
    });
  });
};
