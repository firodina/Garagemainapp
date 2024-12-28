// src/components/StatsDashboard.jsx
// import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import CustomerStatusChart from "../CustomerStatusChart/CustomerStatusChart";
import "./statusDashboard.css"; // For custom layout styling
import EmployeeStatusChart from "../EmployeeStatusChart/EmployeeStatusChart";

const StatusDashboard = () => {
  return (
    <div className="stats-dashboard">
      {/* Top Row for Summary Boxes */}
      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-white bg-primary">
            <Card.Body>
              <Card.Title>Total Orders</Card.Title>
              <Card.Text>37</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-white bg-success">
            <Card.Body>
              <Card.Title>Total services</Card.Title>
              <Card.Text>49</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-white bg-info">
            <Card.Body>
              <Card.Title>Active Employees</Card.Title>
              <Card.Text>48</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Stats Charts */}
      <Row>
        <Col md={6}>
          <EmployeeStatusChart/>
        </Col>
        <Col md={6}>
          <CustomerStatusChart />
        </Col>
      </Row>
    </div>
  );
};

export default StatusDashboard;
