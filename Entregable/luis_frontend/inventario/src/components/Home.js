import React from "react";
import { Link } from "react-router-dom";
import ClienteList from "./ClienteList";
import ProductoList from "./ProductoList";
import VentaList from "./VentaList";
import bannerImage from "../assets/botica-banner.jpg";
function Home() {
    return (
        <div className="container mt-4 text-center">
            <h2 className="mb-3">Panel Principal</h2>
            <div className="mb-4">
                <img
                    src={bannerImage}
                    alt="Banner Botica"
                    className="img-fluid rounded shadow"
                    style={{ height: "350px", width: "100%", objectFit: "cover" }}
                />
            </div>
            <div className="mb-4">
                <Link to="/ventas/create" className="btn btn-success">
                    Registrar Nueva Venta
                </Link>
            </div>
            <div className="mb-5 text-start">
                <ClienteList />
            </div>
            <div className="mb-5 text-start">
                <ProductoList />
            </div>
            <div className="mb-5 text-start">
                <VentaList />
            </div>
        </div>
    );
}
export default Home;
