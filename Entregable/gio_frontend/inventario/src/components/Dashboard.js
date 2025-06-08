// src/components/Dashboard.js
import React from "react";
import { Card, Row, Col, Container } from "react-bootstrap";

function Dashboard() {
    const dataResumen = [
        {
            title: "Total de Clientes",
            value: 20,
            bg: "primary",
            textColor: "white",
        },
        {
            title: "Productos en Stock",
            value: 58,
            bg: "success",
            textColor: "white",
        },
        {
            title: "Ventas Totales",
            value: "S/. 1,560.00",
            bg: "warning",
            textColor: "dark",
        },
    ];

    return (
        <Container className="mt-4">
            <h2 className="mb-4">Panel de Control</h2>
            <Row className="g-4">
                {dataResumen.map((item, idx) => (
                    <Col md={4} key={idx}>
                        <Card bg={item.bg} text={item.textColor} className="text-center shadow">
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Text>{item.value}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Dashboard;
