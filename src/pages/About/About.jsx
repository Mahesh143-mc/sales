import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Buynow from "../../components/Buynow/Buynow";
import BGImage1 from "../../assets/Bg-3.jpg";
import Banner from "../../assets/banner.jpg";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import './About.css'

function About() {
  return (
    <>
      <Header />
      
      <section className="background-image-section">
        <div className="bg-image"></div>
      </section>

      <section className="home-section">
        <Container>
          <Row className="align-items-center">
            <Col className="c-1">
              <h1>
                Welcome to Your Trusted Crackers Shope In Online – Sivakasi,
                Tamil Nadu, India
              </h1>
              <p>
                We are dedicated to making your festive celebrations bright,
                joyful, and stress-free. As a reliable supplier of Sivakasi
                crackers, our mission is to fulfill your needs and deliver
                complete satisfaction.
              </p>
              <h5>
                We offer a wide range of premium-quality fireworks, including:
              </h5>
              <ul>
                <li>🎁 Cracker Gift Boxes</li>
                <li>🎇 Sky Shots</li>
                <li>🔥 Rockets</li>
                <li>🌪️ Ground Chakkars</li>
                <li>🌸 Flower Pots</li>
                <li>✨ Sparklers</li>
                <li>🎆 Fancy and Novelty Crackers</li>
              </ul>
              <h6>
                Understanding the difficulties in buying quality crackers during
                the Diwali season, we’ve made it easy for you to order crackers
                online and have them delivered right to your doorstep.
              </h6>
              <ul>
                <li>✅ High-quality, safety-tested products</li>
                <li>✅ Trusted by thousands of customers</li>
                <li>✅ Competitive prices with festive discounts</li>
                <li>✅ Fast and secure delivery across India</li>
              </ul>
              <h5>
                Celebrate safely. Celebrate joyfully. Celebrate with the best of
                Sivakasi crackers.
              </h5>
            </Col>
          </Row>
        </Container>
      </section>   

      <Buynow />   
      <Footer />
    </>
  );
}

export default About;
