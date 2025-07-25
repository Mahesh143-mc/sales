import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import './Footer.css'
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate("/")
  }
  const navigateProduct = () => {
    navigate("/product");
  }
  const navigateAbout = () => {
    navigate("/about-us");
  }

  const navigateContact = () => {
    navigate("/contact");
  }
  return (
    <>
      <section className="footer-section">
        <Container>
          <Row>
            <Col>
              <h1>Sivakasi Online Crackers</h1>
              <p>
                Celebrate with confidence! Get premium Sivakasi fireworks
                directly from the source — now at special discounted prices.
              </p>
            </Col>
            <Col>
                <h1>Quick Links</h1>
                <ul>
                    <li onClick={navigateHome}>Home</li>
                    <li onClick={navigateAbout}>About</li>
                    <li onClick={navigateProduct}>Product</li>
                    <li onClick={navigateContact}>Contact</li>
                </ul>
            </Col>

            <Col>
              <h1>Whatsapp</h1>
              <p>
                <a href="tel:+919943852902">9943852902</a>
              </p>
              <p>
                <a href="tel:+919944884003">9944884003</a>
              </p>

              <h1>Email </h1>
              <p><a href="mailto:onlinecrackers@gmail.com">onlinecrackers@gmail.com</a></p>
              <h1><a href="/login">Login</a></h1>
            </Col>
            <Col>
              <h1>Location</h1>
              <iframe
                title="Sivakasi Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.927927927927!2d77.7965!3d9.4511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b041f3a0a1a1a1a%3A0x123456789abcdef!2sSivakasi%2C%20Tamil%20Nadu%2C%20India!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </Col>
            
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Footer;
