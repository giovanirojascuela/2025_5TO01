import express from "express";
import cors from "cors";

import indexRouter from "../routes/index.js";
import ventasRoutes from "../routes/ventas.rutas.js";
import detalleVentasRoutes from "../routes/detalle_ventas.rutas.js";
import atencionRoutes from "../routes/atencion.rutas.js";
import productosRoutes from "../routes/productos.rutas.js"; // 👈 Correcto

const app = express(); // ✅ Mueve esto arriba, antes de cualquier uso de app
const PORT = process.env.PORT || 3005;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas principales
app.use("/api", indexRouter);
app.use("/api/productos", productosRoutes); // ✅ Aquí ya está bien
app.use("/api/ventas", ventasRoutes);
app.use("/api/detalle_ventas", detalleVentasRoutes);
app.use("/api/atencion_cliente", atencionRoutes);

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ message: "404 - Ruta no encontrada" });
});

// Manejo de errores generales
app.use((err, req, res, next) => {
  console.error("Error del servidor:", err.stack);
  res.status(500).json({ message: "Error interno del servidor" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
});