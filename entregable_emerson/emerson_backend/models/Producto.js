// models/Producto.js

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Ajusta esta ruta según sea necesario

const Producto = sequelize.define('Producto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  stock_minimo: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

// Sincronizar el modelo con la base de datos
sequelize.sync()
  .then(() => console.log('Tabla de productos sincronizada'))
  .catch((error) => console.log('Error al sincronizar tabla de productos:', error));

module.exports = Producto;
