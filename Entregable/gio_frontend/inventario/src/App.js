// App.js

import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link,
} from "react-router-dom";
import "./App.css";

import Create from "./components/Create";
import Edit from "./components/Edit";
import Home from "./components/Home";
import Productos from "./components/Productos";
import Ventas from "./components/Ventas";
import AtencionCliente from "./components/AtencionCliente";
import ClienteForm from "./components/ClienteForm";

function App() {
    return (
        <Router>
            <div className="App">
                <header>
                    <h1 className="geeks">BOTICA</h1>
                    <h3>NOVA SALUD</h3>
                    <nav style={{ margin: "1rem 0" }}>
                        <Link className="button-blue link-button" to="/">Clientes</Link>
                        <Link className="button-blue link-button" to="/productos">Productos</Link>
                        <Link className="button-blue link-button" to="/ventas">Ventas</Link>
                        <Link className="button-blue link-button" to="/atencion">Atención Cliente</Link>
                        <Link className="button-blue link-button" to="/cliente-form">+ Cliente</Link>
                    </nav>
                </header>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/edit/:id" element={<Edit />} />

                    {/* Nuevas rutas */}
                    <Route path="/productos" element={<Productos />} />
                    <Route path="/ventas" element={<Ventas />} />
                    <Route path="/atencion" element={<AtencionCliente />} />
                    <Route path="/cliente-form" element={<ClienteForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
