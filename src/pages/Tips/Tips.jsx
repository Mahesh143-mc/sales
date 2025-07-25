import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Buynow from "../../components/Buynow/Buynow";

import "./Tips.css";
import { Col, Container, Row } from "react-bootstrap";

function Tips() {
  return (
    <>
      <Header />

      <section className="background-image-section">
        <div className="bg-image-4">
          <h1>Safety Tips</h1>
        </div>
      </section>


      <section className="tips-section">
        <Container>
          <Row className="r-1"> 
            <h1>🔒Firecracker Safety Tips</h1>
            <p>Celebrate with joy, not with risk! Follow these simple safety rules to enjoy a safe and happy Diwali.</p>
          </Row>
          <Row className="r-2">
            <Col className="c-1">
              <h1>✅How to Handle Crackers Safely: </h1>
              <hr />
              <ul>
                <li>🏞️ Always burst crackers in open spaces like grounds or wide streets — never indoors.</li>
                <li>🕯️ Use a long incense stick (agarbatti) to light crackers from a safe distance.</li>
                <li>🚶‍♂️ Step back quickly after lighting — never lean over the cracker.</li>
                <li>🎆 Light only one cracker at a time to stay focused and avoid accidents.</li>
                <li>🚀 Place rockets securely in bottles or tubes, pointing straight upward.</li>
                <li>🪵 Use a flat, stable surface for crackers like flower pots and chakras.</li>
                <li>💧 If a cracker doesn’t burst, don’t relight it — pour water on it after some time.</li>
              </ul>
            </Col>
            <Col className="c-2">
              <h1>❌ What Not to Do </h1>
              <hr />
              <ul>
                <li>🏠 Don’t burst crackers indoors, on balconies, or near vehicles.</li>
                <li>🔥 Never lean over crackers when lighting with a candle or matchstick.</li>
                <li>💣 Avoid lighting multiple crackers at once — it increases risk and confusion.</li>
                <li>🚫 Don’t throw crackers at people, animals, or vehicles — it’s unsafe and illegal.</li>
                <li>👶 Never let children burst crackers alone — adult supervision is a must.</li>
                <li>👗 Avoid wearing synthetic clothes — choose cotton to prevent fire accidents.</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </section>

      <Buynow />

      <Footer />
    </>
  );
}

export default Tips;
