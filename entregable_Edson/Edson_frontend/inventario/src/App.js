// Filename - App.js

import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
} from "react-router-dom";
import "./App.css";
import Create from "./components/Create";
import Edit from "./components/Edit";
import Home from "./components/Home";

function App() {
    return (
        <div className="App">
            <h1 className="geeks">NOVA SALUD </h1>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/create"
                        element={<Create />}
                    />
                    <Route path="/edit/:id" element={<Edit />} /> {/* <<< ESSA É A LINHA IMPORTANTE */}
          {/* O ':id' indica que a rota espera um parâmetro chamado 'id' */}
                </Routes>
            </Router>
        </div>
    );
}

export default App;