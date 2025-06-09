import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Inicio</Link>
      <Link to="/create" className="nav-link">Clientes</Link>
      <Link to="/productos/create" className="nav-link">Productos</Link>
      <Link to="/ventas/create" className="nav-link">Ventas</Link>
    </nav>
  );
};

export default Navbar;
