// src/components/Dashboard.js
import React from "react";
import { Card, Row, Col, Container } from "react-bootstrap";

function Dashboard() {
    return (
        <Container className="mt-4">
            <h2 className="mb-4">Panel de Control</h2>
            <Row className="g-4">
                <Col md={4}>
                    <Card bg="primary" text="white" className="text-center">
                        <Card.Body>
                            <Card.Title>Total de Clientes</Card.Title>
                            <Card.Text>20</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card bg="success" text="white" className="text-center">
                        <Card.Body>
                            <Card.Title>Productos en Stock</Card.Title>
                            <Card.Text>58</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card bg="warning" text="dark" className="text-center">
                        <Card.Body>
                            <Card.Title>Ventas Totales</Card.Title>
                            <Card.Text>S/. 1,560.00</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Dashboard;