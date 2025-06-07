import React from "react";
import ReactDOM from "react-dom/client"; // Usar "react-dom/client" para React 18 y superior
import App from "./components/App"; // Cambia a la ruta correcta: ./components/App
import "./index.css"; // Estilos globales


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
