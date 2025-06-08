import ClienteModel from "../models/clientes.model.js";

// Crear cliente
export const crearCliente = (req, res) => {
  const { nombre, correo, telefono, direccion } = req.body;

  if (!nombre) {
    return res.status(400).json({ message: "El nombre es obligatorio." });
  }

  const cliente = {
    nombre,
    correo: correo || null,
    telefono: telefono || null,
    direccion: direccion || null,
  };

  ClienteModel.create(cliente, (err, data) => {
    if (err) {
      return res.status(500).json({
        message: err.message || "Error al crear el cliente.",
      });
    }
    res.status(201).json(data);
  });
};

// Obtener todos los clientes
export const getClientes = (req, res) => {
  ClienteModel.getAll((err, data) => {
    if (err) {
      return res.status(500).json({
        message: err.message || "Error al obtener los clientes.",
      });
    }
    res.status(200).json(data);
  });
};

// Obtener cliente por ID
export const getCliente = (req, res) => {
  const id = req.params.id;

  ClienteModel.findById(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).json({
          message: `Cliente con ID ${id} no encontrado.`,
        });
      }
      return res.status(500).json({
        message: `Error al obtener el cliente con ID ${id}.`,
      });
    }
    res.status(200).json(data);
  });
};

// Modificar cliente
export const modificarCliente = (req, res) => {
  const id = req.params.id;
  const datos = req.body;

  if (!datos || Object.keys(datos).length === 0) {
    return res.status(400).json({
      message: "Los datos para modificar no pueden estar vacíos.",
    });
  }

  ClienteModel.updateById(id, datos, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).json({
          message: `Cliente con ID ${id} no encontrado.`,
        });
      }
      return res.status(500).json({
        message: `Error al actualizar el cliente con ID ${id}.`,
      });
    }
    res.status(200).json(data);
  });
};

// Eliminar cliente
export const eliminarCliente = (req, res) => {
  const id = req.params.id;

  ClienteModel.remove(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        return res.status(404).json({
          message: `Cliente con ID ${id} no encontrado.`,
        });
      }
      return res.status(500).json({
        message: `Error al eliminar el cliente con ID ${id}.`,
      });
    }
    res.status(200).json({
      message: `Cliente con ID ${id} eliminado correctamente.`,
    });
  });
};
