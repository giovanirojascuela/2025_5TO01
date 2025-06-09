import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Create from "./components/Create";
import Edit from "./components/Edit";
import Home from "./components/Home";
import ProductoCreate from "./components/ProductoCreate";
import VentaCreate from "./components/VentaCreate";
import VentaDetalle from "./components/VentaDetalle";
import Venta from "./components/Venta";
import Navbar from "./components/Navbar"; 
function App() {
  return (
    <div className="App">
      <h1 className="geeks">BOTICA NOVA SALUD</h1>
      <h3>Gestión Centralizada de Inventario, Ventas</h3>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/productos/create" element={<ProductoCreate />} />
        <Route path="/ventas" element={<Venta />} />
        <Route path="/ventas/create" element={<VentaCreate />} />
        <Route path="/ventas/:id" element={<VentaDetalle />} />
      </Routes>
    </div>
  );
}
export default App;





