import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import F1 from "../../assets/Features/f-1.png";
import F2 from "../../assets/Features/f-2.png";
import F4 from "../../assets/Features/f-3.png";
import F3 from "../../assets/Features/f-4.png";
import F5 from "../../assets/Features/f-5.png";

import P1 from "../../assets/p-1.webp"
import P2 from "../../assets/p-2.webp"
import P3 from "../../assets/p-3.jpg"
import P4 from "../../assets/p-4.jpg"
import P5 from "../../assets/p-4.jpg"

import "./Home.css";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

import Logo from "../../assets/LOGO_PROJECT.png";
import { Helmet } from "react-helmet-async";


function Home() {
  var settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          autoplay: true,
          prevArrow: false,
          nextArrow: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          prevArrow: false,
          nextArrow: false,
        },
      },
    ],
  };
  const features = [
    {
      id: 1,
      title: "Festival Discounts",
      description:
        "Special Diwali offers and discount packs to help you save more",
      image: F1,
    },
    {
      id: 2,
      title: "Fast & Safe Delivery",
      description: "Safe and timely home delivery with secure packaging.",
      image: F2,
    },
    {
      id: 3,
      title: "WhatsApp Support",
      description: "Quick support and easy ordering through WhatsApp.",
      image: F3,
    },
    {
      id: 4,
      title: "Easy Online Ordering",
      description: "Easy-to-use website for browsing and ordering from home.",
      image: F4,
    },
    {
      id: 5,
      title: "24/7 Order Tracking",
      description: "Track your order status online anytime, anywhere.",
      image: F5,
    },
  ];

  const product = [
    {
      id: 1,
      image: P1,
      name: "Flower Pots",
    },
    {
      id: 2,
      image: P2,
      name: "Chakras",
    },
    {
      id: 3,
      image: P3,
      name: "Fancy",
    },
    {
      id: 4,
      image: P4,
      name: "Atom Bomb",
    },
    {
      id: 5,
      image: P5,
      name: "Electric Sparklers",
    },
  ];
  const navigate = useNavigate();
  const navigateProduct = () => {
    navigate("/product");
  }
 
  return (
    <>
      
      <Helmet>
        <title>Sivakasi Crackers Online </title>
        <link rel="icon" type="image/png" href={Logo} />
        <meta
          name="description"
          content="Get best quality Diwali crackers online in sivakasi. Fast delivery across Tamilnadu and other states in India."
        />
        <meta
          name="keywords"
          content="diwali crackers, fireworks, online crackers shopping, buy crackers online tamilnadu, sivakasi crackers, low price crackers, best quality crackers"
        />
        <meta name="author" content="Sivakasi Crackers Shop" />
      </Helmet>

      <Header />

      <section className="background-image-section">
        <div className="bg-image-1"></div>
      </section>

      <section className="features-section">
        <Container>
          <Row>
            {features.map((feature) => (
              <Col key={feature.id}>
                <Card>
                  <Card.Img
                    variant="top"
                    src={feature.image}
                    alt={feature.title}
                  />
                  <Card.Body>
                    <Card.Title>{feature.title}</Card.Title>
                    <Card.Text>{feature.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className="imp-section">
        <Container>
          <Row>
            <Col>
              <h1>🎉 Welcome to Sivakasi Crackers Online</h1>
              <p>🎇Celebrate this Diwali with joy, sparkle, and safety!</p>
              <p>
                🎇We are your trusted online destination for 100% original
                Sivakasi fireworks, delivered straight to your doorstep. With a
                wide range of quality crackers, unbeatable prices, and reliable
                service, we make your festival brighter and stress-free.
              </p>
              <p>
                🎇Whether you're looking for sparklers for kids, dazzling fancy
                items, or combo packs for the whole family, we’ve got everything
                you need to light up the season.
              </p>
              <p>
                🎇Our crackers are safe, certified, and packed with care to
                ensure you enjoy a safe and colorful celebration. Enjoy special
                Diwali offers, early bird discounts, and exclusive deals — all
                from the comfort of your home.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="fixed-bg">
        <Container>
          <h1>
            Celebrate This Diwali with the Brightest Crackers from Sivakasi –
            Safe, Affordable & Delivered to Your Doorstep!
          </h1>
          <Button onClick={navigateProduct}>Order Now </Button>
        </Container>
      </section>

      <section className="home-pro-section">
        <Container>
          <Row>
            <Col className="c-1">
              <h1>A Large Collection of Crackers for Every Celebration</h1>
              <p>
                We’re now open for Diwali order bookings! Contact us today to
                place your cracker orders.
              </p>
              <Button onClick={navigateProduct}>View All Product</Button>
            </Col>
            <Col className="c-2">
              <Row>
                <Slider {...settings}>
                  {product.map((prod) => (
                    <Col key={prod.id}>
                      <Card>
                        <Card.Img
                          variant="top"
                          src={prod.image}
                          alt={prod.name}
                        />
                        <Card.Title>{prod.name}</Card.Title>
                      </Card>
                    </Col>
                  ))}
                </Slider>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
}

export default Home;
