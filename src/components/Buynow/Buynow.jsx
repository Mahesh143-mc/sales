import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import './Buynow.css'
import { useNavigate } from "react-router-dom";

function Buynow() {
  const navigate = useNavigate();
  const navigateProduct = () => {
    navigate("/product");
  }
  
  return (
    <>
      <section className="buy-now-section">
        <Container>
          <Row>
            <Col className="c-1">
              <h1>Sivakasi Online Crackers </h1>
              <p>
                ✨ Celebrate this Diwali with joy, safety, and savings — shop
                your favorite crackers from Sivakasi's trusted source!
              </p>
              <p>💥 Quality Assured | Best Prices | Home Delivery Available</p>
            </Col>
            <Col className="c-2">
              <Button variant="primary" onClick={navigateProduct}>Shop Now</Button>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Buynow;
