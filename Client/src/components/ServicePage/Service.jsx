import React from 'react'
import { Container, Row, Col, Card } from "react-bootstrap";
import img1 from "../../assets/abe/240-g.jpg";		
import img2 from "../../assets/abe/240-g.jpg";	
import img3 from "../../assets/abe/240-g.jpg";	
import img4 from "../../assets/abe/240-g.jpg";
import img5 from "../../assets/abe/240-g.jpg";
import img6 from "../../assets/abe/240-g.jpg";
import './service.css';

function Service() {
	const services = [
    { id: 1, title: "Opti Coat", img: img1 },
    { id: 2, title: "Car Detailing", img: img2 },
    { id: 3, title: "Car Polish", img: img3 },
    { id: 4, title: "Car Washing", img: img4 },
    { id: 5, title: "Eco Friendly", img: img5 },
    { id: 6, title: "Exterior Cleaning", img: img6 },
  ];
	return (
		<div className="section-full bg-white content-inner">
      <Container>
        <div className="section-head text-center mb-5">
          <h2 className="text-uppercase">
            Our Best <span className="text-primary">Services</span>
          </h2>
          <p>
            There are many variations of passages of Lorem Ipsum typesetting
            industry has been the industry's standard dummy text ever since the
            been when an unknown printer.
          </p>
        </div>
        <Row>
          {services.map((service) => (
            <Col lg={4} md={6} sm={12} className="mb-4" key={service.id}>
              <Card className="h-100 shadow-sm border-0 service-card">
                <div className="img-container">
                  <Card.Img
                    variant="top"
                    src={service.img}
                    className="service-img"
                  />
                </div>
                <Card.Body className="text-center bg-light">
                  <Card.Title className="text-white bg-primary p-2">
                    {service.title}
                  </Card.Title>
                  <Card.Text>
                    There are many variations of passages of Lorem Ipsum
                    typesetting industry. Lorem Ipsum has been the
                    industry..Lorem Ipsum is simply Ipsum is simply dummy text
                    of the..
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
	)
}

export default Service