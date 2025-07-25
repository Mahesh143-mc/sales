import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Buynow from "../../components/Buynow/Buynow";
import { Col, Container, Row } from "react-bootstrap";

import './Contact.css'

function Contact() {
  return (
    <>
      <Header />

      <section className="background-image-section">
        <div className="bg-image-2">
          <h1>Safety Tips</h1>
        </div>
      </section>

      <section className="contact-us-section">
        <Container>
          <Row>
            <Col>
              <h2>Contact Us</h2>
              <hr />
              <h1>Whatsapp</h1>
              <p>9943852902</p>
              <p>9943884003</p>
              <hr />

              <h1>Email</h1>
              <p>onlinecrackers@gmail.com</p>
              <hr />
            </Col>
            <Col>
              <h1>Our Location</h1>
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019927484646!2d-122.4194150846813!3d37.77492977975944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085809c5b1a1a1b%3A0x4a1a1a1a1a1a1a1a!2sSan+Francisco%2C+CA!5e0!3m2!1sen!2sus!4v1610000000000!5m2!1sen!2sus"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </Col>
          </Row>
        </Container>
      </section>

      <Buynow />
      <Footer />
    </>
  );
}

export default Contact;
