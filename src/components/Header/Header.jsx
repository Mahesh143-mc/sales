import React from "react";
import { Button, Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";

import "./Header.css";

function Header() {
  const location = useLocation();

  const navItems = [
    { to: "/", label: "Home", end: true },
    { to: "/about-us", label: "About Us" },
    { to: "/product", label: "Product" },
    { to: "/tips", label: "Safety Tips" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      <section className="header-section">
        <Row className="header-row-1">
          <Col>
            <h1 className="heading">Online Crackers Web Store</h1>
          </Col>
          <Col className="c-2">
            <div className="icons icon-details">
              <i className="bi bi-telephone"></i>
              <p>+91 9943852902 </p>
              <p>+91 9943852902</p>
            </div>
          </Col>
          <Col className="c-3">
            <div className="icons icon-details">
              <i className="bi bi-compass"></i>
              <h1>Sivakasi Best Quality Crackers</h1>
              <h1>Low Prices And Best Quality </h1>
            </div>
          </Col>
        </Row>
      </section>
      <section className="nav-section">
        <Row className="header-row-1">
          <Navbar expand="lg">
            <Navbar.Toggle>
              <i className="bi bi-list"></i>
            </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {navItems.map(({ to, label, end }) => (
                  <Nav.Item
                    key={to}
                    className={location.pathname === to ? "active" : ""}
                  >
                    <Nav.Link as={NavLink} to={to} end={end}>
                      {label}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Row>
      </section>
    </>
  );
}

export default Header;
