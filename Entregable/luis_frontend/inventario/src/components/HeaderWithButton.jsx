// src/components/HeaderWithButton.jsx
import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const HeaderWithButton = ({ title, buttonText, buttonLink }) => {
    return (
        <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="mb-0">{title}</h2>
            <Link to={buttonLink}>
                <Button variant="primary">{buttonText}</Button>
            </Link>
        </div>
    );
};

export default HeaderWithButton;
